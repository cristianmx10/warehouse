import { Injectable } from '@angular/core';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sidebar: Menu[] = [
    {
      order: 0,
      title: 'Almacen',
      icon: 'nav-icon fas fa-tachometer-alt',
      subMenu: [
        {
          title: 'Productos',
          url: '/product',
          icon: 'nav-icon fas fa-boxes'
        },
        {
          title: 'Categorias',
          url: '/category',
          icon: 'nav-icon fas fa-file-invoice'
        },
        {
          title: 'Entradas',
          url: '/dashboard',
          icon: 'nav-icon fas fa-clipboard-check'
        },
        {
          title: 'Salida',
          url: '/dashboard',
          icon: 'nav-icon fas fa-clipboard-check'
        }
      ]
    },
    {
      order: 1,
      title: 'Personal',
      icon: 'nav-icon fas fa-clipboard-list',
      subMenu: [
        {
          title: 'Empleados',
          url: '/employe',
          icon: 'nav-icon fas fa-users'
        },
        {
          title: 'Rol',
          url: '/rol',
          icon: 'nav-icon fas fa-user-tag'
        },
        {
          title: 'Usuarios',
          url: '/user',
          icon: 'nav-icon fas fa-address-book'
        }
      ]
    },
    {
      order: 2,
      title: 'Caja',
      icon: 'nav-icon fas fa-cash-register',
      subMenu: [
        {
          title: 'Ventas',
          url: '/sale',
          icon: 'nav-icon fas fa-cart-plus'
        },
        {
          title: 'Cajas',
          url: '/micaja',
          icon: 'nav-icon fas fa-cash-register'
        },
        {
          title: 'Reporte de ventas',
          url: '/micaja',
          icon: 'nav-icon fas fa-chart-bar'
        }
      ]
    },
    {
      order: 3,
      title: 'Sistem',
      icon: 'nav-icon fas fa-cogs',
      subMenu: [
        {
          title: 'Almacenes',
          url: '/warehouse',
          icon: 'nav-icon fas fa-warehouse'
        },
        {
          title: 'Locales',
          url: '/local',
          icon: 'nav-icon fas fa-store-alt'
        },
      ]
    }
  ];
  constructor() { }
}
