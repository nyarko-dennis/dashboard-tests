export interface Order {
  order_id?: number;
  price?: number;
  quantity?: number;
  side?: 'BUY' | 'SELL';
  type?: 'LIMIT' | 'MARKET';
  status?: 'OPEN' | 'CANCELLED' | 'FAILED' | 'FILLED';
  ticker?: string;
  created?: Date;
}

export const SAMPLES : Order[] = [
  {ticker: 'TSLA', order_id: 23341, price: 10, quantity: 5, side: 'SELL', type: 'MARKET', status: 'FILLED', created: new Date()},
  {ticker: 'AAPL', order_id: 11251, price: 30, quantity: 10, side: 'BUY', type: 'LIMIT', status: 'OPEN', created: new Date()},
];
