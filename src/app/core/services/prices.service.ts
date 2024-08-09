import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ProductDto {
  TICKER: string;
  SELL_LIMIT: number;
  LAST_TRADED_PRICE: number;
  MAX_PRICE_SHIFT: number;
  ASK_PRICE: number;
  BID_PRICE: number;
  BUY_LIMIT: number;
}

export interface TickerWithExchange {
  product: ProductDto;
  exchange: number;
}

export interface ProcessedTicker {
  ticker: string;
  exchange: number;
  currentPrice: number;
  priceChange: number;
  priceChangePercentage: number;
  bidAskSpreadPercentage: number;
  bid:number;
  ask:number;
}


@Injectable({
  providedIn: 'root'
})
export class PricesService {

  private eventSource: EventSource | undefined;
  private exchangeOneSubject = new BehaviorSubject<ProcessedTicker[]>([]);
  private exchangeTwoSubject = new BehaviorSubject<ProcessedTicker[]>([]);

  private initialPrices: { [key: string]: { [exchange: number]: number } } = {};

  constructor(private ngZone: NgZone) {
    this.setupEventSource();
  }

  private setupEventSource() {
    this.eventSource = new EventSource('http://localhost:8082/market/product-stream');

    this.eventSource.onmessage = event => {
      this.ngZone.run(() => {
        console.log(event.data);
        const newTicker: TickerWithExchange = JSON.parse(event.data);
        const tickerSymbol = newTicker.product.TICKER;
        const exchangeId = newTicker.exchange;

        // Save initial price if not already saved
        if (!this.initialPrices[tickerSymbol]) {
          this.initialPrices[tickerSymbol] = {};
        }

        if (!this.initialPrices[tickerSymbol][exchangeId]) {
          this.initialPrices[tickerSymbol][exchangeId] = newTicker.product.LAST_TRADED_PRICE;
          localStorage.setItem(`initialPrice_${tickerSymbol}_${exchangeId}`, newTicker.product.LAST_TRADED_PRICE.toString());
        }

        const initialPrice = this.initialPrices[tickerSymbol][exchangeId];
        const currentPrice = newTicker.product.LAST_TRADED_PRICE;

        // Calculate price change and percentage
        let priceChange = currentPrice - initialPrice;
        let priceChangePercentage = initialPrice ? (priceChange / initialPrice) * 100 : 0;

        // Calculate bid-ask spread percentage
        const bidAskSpread = newTicker.product.ASK_PRICE - newTicker.product.BID_PRICE;
        let bidAskSpreadPercentage = currentPrice ? (bidAskSpread / currentPrice) * 100 : 0;

        // Handle potential Infinity, NaN, and -0 issues
        priceChange = this.sanitizeNumber(priceChange);
        priceChangePercentage = this.sanitizeNumber(priceChangePercentage);
        bidAskSpreadPercentage = this.sanitizeNumber(bidAskSpreadPercentage);

        const processedTicker: ProcessedTicker = {
          ticker: tickerSymbol,
          exchange: exchangeId,
          currentPrice,
          priceChange,
          priceChangePercentage,
          bidAskSpreadPercentage,
          bid: newTicker.product.BID_PRICE,
          ask: newTicker.product.ASK_PRICE

        };

        if (exchangeId === 1) {
          this.updateExchangeData(this.exchangeOneSubject, processedTicker);
        } else if (exchangeId === 2) {
          this.updateExchangeData(this.exchangeTwoSubject, processedTicker);
        }
      });
    };

    this.eventSource.onerror = error => {
      console.error('EventSource failed:', error);
      this.eventSource?.close();
      // Reconnect logic could be added here
    };
  }



  private updateExchangeData(subject: BehaviorSubject<ProcessedTicker[]>, newTicker: ProcessedTicker) {
    const currentTickers = subject.value;
    const existingTickerIndex = currentTickers.findIndex(t => t.ticker === newTicker.ticker);

    if (existingTickerIndex !== -1) {
      currentTickers[existingTickerIndex] = newTicker;
    } else {
      currentTickers.push(newTicker);
    }

    subject.next(currentTickers.sort((a, b) => a.ticker.localeCompare(b.ticker)));
  }

  getExchangeOneUpdates(): Observable<ProcessedTicker[]> {
    return this.exchangeOneSubject.asObservable();
  }

  getExchangeTwoUpdates(): Observable<ProcessedTicker[]> {
    return this.exchangeTwoSubject.asObservable();
  }

  private sanitizeNumber(value: number): number {
    if (isNaN(value) || !isFinite(value)) {
      return 0;
    }
    // Convert -0 to 0
    return value === 0 ? 0 : value;
  }
}
