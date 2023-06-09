import { Component } from '@angular/core';
import {MENU_ITEMS} from "../../../../pages/pages-menu";
import {Menu} from "../../../../shared/menu";

@Component({
  selector: 'sg-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent {
  menuList: Menu[] = [];
  constructor() { }

  ngOnInit() {
    this.menuList = MENU_ITEMS;
  }

}
