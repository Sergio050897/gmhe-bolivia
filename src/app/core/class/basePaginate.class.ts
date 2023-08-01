import { Injectable } from '@angular/core';
import { BaseAPIClass } from '.';
import { Paginated } from '../model/paginated.model';
// import { Paginated } from '@core/model/paginated.model';
// import { BaseAPIClass } from '@app/core';

interface IBaseApiClass {
  onScroll(): void;

  loadNext(): void;

  onUp(): void;
}

@Injectable()
export abstract class BasePaginateClass implements IBaseApiClass {
  disableScroll = false;
  public paginate: Paginated;
  loadingScroll = false;
  public dataPaginate: any[] = [];

  protected constructor(protected service: BaseAPIClass) {}

  set setdataPaginate(paginate: any) {
    this.dataPaginate = paginate.data;
    this.paginate = paginate;
  }

  onScroll() {
    console.log('page-scroll:');
    // console.log('loading :', this.loadingScroll);
    this.loadingScroll = true;
    if (this.loadingScroll) {
      this.loadNext();
      this.disableScroll = true;
    }
  }

  loadNext() {
    // console.log(page, last_page);
    if (this.paginate.next_page_url !== undefined) {
      this.service
        .nextPage(this.paginate.next_page_url)
        .subscribe((data: any) => {
          // console.log('newData', data);
          this.paginate = data; // formateamos con nuevo paginnate
          if (data.next_page_url) {
            this.disableScroll = false; // desbroqueamos el scrool
          }
          this.dataPaginate = this.dataPaginate.concat(data.data); // concatena dos array iguales
          this.loadingScroll = false;
        });
    } else {
      this.loadingScroll = false;
    }
  }

  onUp() {}
}
