import { Routes } from '@angular/router';
import {LoginComponent} from "./features/auth/login/login.component";
import {RegisterComponent} from "./features/auth/register/register.component";
import {AppRoutes} from "./app-routing.constants";
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {MarketDataComponent} from "./features/dashboard/market-data/market-data.component";
import {OrderHistoryComponent} from "./features/dashboard/order-history/order-history.component";
import {WalletComponent} from "./features/dashboard/wallet/wallet.component";
import {OrderPlacementComponent} from "./features/dashboard/order-placement/order-placement.component";

export const routes: Routes = [
  { path: AppRoutes.LOGIN, component: LoginComponent },
  { path: AppRoutes.REGISTER, component: RegisterComponent },
  { path: AppRoutes.DASHBOARD, component: DashboardComponent },
  { path: AppRoutes.MARKETDATA, component: MarketDataComponent },
  { path: AppRoutes.ORDERHISTORY, component: OrderHistoryComponent },
  { path: AppRoutes.WALLET, component: WalletComponent },
  {path: AppRoutes.PLACEORDERS, component: OrderPlacementComponent}
];
