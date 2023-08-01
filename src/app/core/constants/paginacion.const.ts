import { HttpParams } from '@angular/common/http';

export const confPaginated = {
  paginacion: 'paginacion',
  quantity: 17
};
export const paramsDefaults = new HttpParams().set(
  confPaginated.paginacion,
  String(confPaginated.quantity)
);

export const paramsNext = new HttpParams().set(
  confPaginated.paginacion,
  String('17')
);
