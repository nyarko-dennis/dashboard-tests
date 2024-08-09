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

@Injectable({
  providedIn: 'root'
})
export class MarketPriceService {
  private eventSource: EventSource | undefined;
  private exchangeOneSubject = new BehaviorSubject<TickerWithExchange[]>([]);
  private exchangeTwoSubject = new BehaviorSubject<TickerWithExchange[]>([]);

  constructor(private zone: NgZone) {
    this.setupEventSource();
  }

  private setupEventSource() {
    this.eventSource = new EventSource('http://localhost/market/product-stream');

    this.eventSource.onmessage = event => {
      this.zone.run(() => {
        const newTicker: TickerWithExchange = JSON.parse(event.data);

        if (newTicker.exchange === 1) {
          this.updateExchangeData(this.exchangeOneSubject, newTicker);
        } else if (newTicker.exchange === 2) {
          this.updateExchangeData(this.exchangeTwoSubject, newTicker);
        }
      });
    };

    this.eventSource.onerror = error => {
      console.error('EventSource failed:', error);
      this.eventSource?.close();
      // Reconnect logic could be added here
    };
  }

  private updateExchangeData(subject: BehaviorSubject<TickerWithExchange[]>, newTicker: TickerWithExchange) {
    const currentTickers = subject.value;
    const existingTickerIndex = currentTickers.findIndex(t => t.product.TICKER === newTicker.product.TICKER);

    if (existingTickerIndex !== -1) {
      currentTickers[existingTickerIndex] = newTicker;
    } else {
      currentTickers.push(newTicker);
    }

    subject.next(currentTickers.sort((a, b) => a.product.TICKER.localeCompare(b.product.TICKER)));
  }

  getExchangeOneUpdates(): Observable<TickerWithExchange[]> {
    return this.exchangeOneSubject.asObservable();
  }

  getExchangeTwoUpdates(): Observable<TickerWithExchange[]> {
    return this.exchangeTwoSubject.asObservable();
  }
}
