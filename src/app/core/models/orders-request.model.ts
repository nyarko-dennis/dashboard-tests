export interface OrderRequest {
  portfolioId: number;
  price: number;
  qty: number;
  side: 'BUY' | 'SELL';
  type: 'LIMIT' | 'MARKET';
  ticker: string;
  exchangeId: number;
}
