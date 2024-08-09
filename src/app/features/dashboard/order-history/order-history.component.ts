import { Component } from '@angular/core';
import {DesktopSidebarComponentComponent} from "../desktop-sidebar-component/desktop-sidebar-component.component";
import {ProfileDropdownComponent} from "../profile-dropdown/profile-dropdown.component";
import {SidebarComponentComponent} from "../sidebar-component/sidebar-component.component";

@Component({
  selector: 'app-order-history',
  standalone: true,
    imports: [
        DesktopSidebarComponentComponent,
        ProfileDropdownComponent,
        SidebarComponentComponent
    ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

}
