import { Component } from '@angular/core';
import {DesktopSidebarComponentComponent} from "../desktop-sidebar-component/desktop-sidebar-component.component";
import {ProfileDropdownComponent} from "../profile-dropdown/profile-dropdown.component";
import {SidebarComponentComponent} from "../sidebar-component/sidebar-component.component";
import {OrderRequest} from "../../../core/models/orders-request.model";
import {FormsModule} from "@angular/forms";
import {OrderService} from "../../../core/services/order-service/order.service";

@Component({
  selector: 'app-order-placement',
  standalone: true,
  imports: [
    DesktopSidebarComponentComponent,
    ProfileDropdownComponent,
    SidebarComponentComponent,
    FormsModule
  ],
  templateUrl: './order-placement.component.html',
  styleUrl: './order-placement.component.css'
})
export class OrderPlacementComponent {

  constructor(private apiOrder: OrderService) {
  }

  ticker: string = 'MSFT';
  portfolioId: number = 1;
  price: number = 0;
  qty: number = 0;
  orderType: string = 'LIMIT';
  side: 'BUY' | 'SELL' = 'BUY';
  errorMsgs: { [key: string]: string } = {};

  createOrder(exchangeId: number): void {
    const request: OrderRequest = {
      ticker: this.ticker,
      side: this.side,
      qty: this.qty,
      price: this.price,
      type: 'LIMIT',
      portfolioId: 1,
      exchangeId: exchangeId,
    };

    console.log('ready ' + JSON.stringify(request));
    this.errorMsgs = {};
    this.apiOrder.startOrders(request).subscribe({
      next: (res) => {
        console.log('successful order placed' + res.orderId);

        alert(res.orderId)
      },
      error: (err): void => {
        if (err.error.validationErrors) {
          this.errorMsgs = err.error.validationErrors;
        } else {
          this.errorMsgs['error'] = err.error.error;
        }
      },
    });
  }

}
