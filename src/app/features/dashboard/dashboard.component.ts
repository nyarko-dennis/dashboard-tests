import {Component, OnInit} from '@angular/core';
import {SidebarComponentComponent} from "./sidebar-component/sidebar-component.component";
import {ProfileDropdownComponent} from "./profile-dropdown/profile-dropdown.component";
import {DesktopSidebarComponentComponent} from "./desktop-sidebar-component/desktop-sidebar-component.component";
import {PricesService, ProcessedTicker} from "../../core/services/prices.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponentComponent,
    ProfileDropdownComponent,
    DesktopSidebarComponentComponent,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  bodyClass = 'h-full bg-white';
  exchangeOneData: ProcessedTicker[] = [];
  exchangeTwoData: ProcessedTicker[] = [];

  constructor(private pricesService: PricesService) {
  }

  ngOnInit(): void {
    this.pricesService.getExchangeOneUpdates().subscribe(data => {
      this.exchangeOneData = data;
    });

    this.pricesService.getExchangeTwoUpdates().subscribe(data => {
      this.exchangeTwoData = data;
    });
  }

  protected readonly Math = Math;
}
