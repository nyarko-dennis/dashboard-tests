import { Component } from '@angular/core';
import {DesktopSidebarComponentComponent} from "../desktop-sidebar-component/desktop-sidebar-component.component";
import {ProfileDropdownComponent} from "../profile-dropdown/profile-dropdown.component";
import {SidebarComponentComponent} from "../sidebar-component/sidebar-component.component";

@Component({
  selector: 'app-wallet',
  standalone: true,
    imports: [
        DesktopSidebarComponentComponent,
        ProfileDropdownComponent,
        SidebarComponentComponent
    ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {

}
