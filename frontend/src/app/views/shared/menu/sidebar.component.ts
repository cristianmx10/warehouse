import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  menus: Menu[] = [];
  orderMenu: number;
  constructor(private sidebarService: SidebarService) {
    this.menus = this.sidebarService.sidebar;
  }

  ngOnInit() {
  }

  selectSubMenu(order) {
    this.orderMenu = order;
  }

}
