import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-desktop-sidebar-component',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './desktop-sidebar-component.component.html',
  styleUrl: './desktop-sidebar-component.component.css'
})
export class DesktopSidebarComponentComponent {

}
