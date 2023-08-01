import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard/e-commerce', title: 'Inicio', icon: 'bx bx-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], roles: ['administrador','director'] },
  { path: '/dashboard/usuario/list-usuario', title: 'Usuarios', icon: 'bx bx-group', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], roles: ['administrador'] },
  // { path: '/dashboard/configuraciones/configuraciones', title: 'Configuraciones', icon: 'bx bx-slider', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], roles: ['administrador','director'] },

  {
    path: '', title: 'Almacen', icon: 'bx bx-store', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,roles: ['administrador','encargado'], submenu: [
      { path: '/dashboard/proveedores/lista-proveedores', title: 'Proveedores', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/categoria/lista-categoria', title: 'Categorias', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      //{ path: '/dashboard/unidades', title: 'Unidades', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/marcas/lista-marcas', title: 'Marcas', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/productos/lista-productos', title: 'Productos', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/pedidos/list-pedidos', title: 'Pedidos', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/almacen/list-almacen', title: 'Ingresos', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

    ]
  },

  {
    path: '', title: 'Ventas', icon: 'bx bx-home-circle', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      { path: '/dashboard/clientes/lista-clientes', title: 'Clientes', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/proformas/list-proformas', title: 'Proformas', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/ventas/ventas', title: 'Ventas', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

      // { path: '/dashboard/series/lista-series', title: 'Series', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      // { path: '/dashboard/sucursales/lista-sucursales', title: 'Sucursales', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      // { path: '/dashboard/envios/envios', title: 'Movimientos', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      // { path: '/dashboard/sueldos/lista-sueldos', title: 'Sueldos', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  /*{
    path: '', title: 'Reportes', icon: 'bx bx-notepad', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      { path: '/dashboard/reportes/stock', title: 'Stock', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      // { path: '/dashboard/reportes/proforma', title: 'Proforma', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      // { path: '/dashboard/reportes/clientes', title: 'Clientes Deudores', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/reportes/ventas/productos', title: 'Ventas', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/reportes/ventas/vendedor', title: 'Ventas por Vendedor', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/reportes/reportes/ingresos', title: 'Ingresos', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

    ], roles:['administrador']
  }*/

];
