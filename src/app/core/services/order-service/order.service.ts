import { Injectable } from '@angular/core';
import { Order, SAMPLES } from '../../models/orders.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrderRequest } from '../../models/orders-request.model';
import { OrderResponse } from '../../models/orders-response.model';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private static readonly ORDERS_PATH = '/orders';

  constructor(private http: HttpClient) {}
  getOrders(): Observable<Order[]> {
    const orders = this.http.get<Order[]>(
      this.buildUrl(OrderService.ORDERS_PATH),
      {
        headers: {
          Authorization: 'Bearer 2f7a53a3-1aaa-4339-bb59-bb243a664e05',
        },
      },
    );
    // const orders = of(SAMPLES);
    return orders;
  }

  startOrders(request: OrderRequest): Observable<OrderResponse> {
    const response = this.http.post<OrderResponse>(
      this.buildUrl(OrderService.ORDERS_PATH),
      request,
      {
        headers: {
          Authorization: 'Bearer 2f7a53a3-1aaa-4339-bb59-bb243a664e05',
        },
      },
    );
    return response;
  }

  private buildUrl(path: string): string {
    return `${environment.baseUrl}${path}`;
  }
}
