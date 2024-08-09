import {Component} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.css'
})
export class ProfileDropdownComponent {
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

}
