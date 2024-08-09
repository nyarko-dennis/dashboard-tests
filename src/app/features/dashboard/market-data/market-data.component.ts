import { Component } from '@angular/core';
import {DesktopSidebarComponentComponent} from "../desktop-sidebar-component/desktop-sidebar-component.component";
import {ProfileDropdownComponent} from "../profile-dropdown/profile-dropdown.component";
import {SidebarComponentComponent} from "../sidebar-component/sidebar-component.component";

@Component({
  selector: 'app-market-data',
  standalone: true,
  imports: [
    DesktopSidebarComponentComponent,
    ProfileDropdownComponent,
    SidebarComponentComponent
  ],
  templateUrl: './market-data.component.html',
  styleUrl: './market-data.component.css'
})
export class MarketDataComponent {

}
