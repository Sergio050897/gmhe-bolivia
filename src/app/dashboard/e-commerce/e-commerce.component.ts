import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginated } from 'src/app/core/model/paginated.model';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent implements OnInit {
  // form: FormGroup;
  categorias: any[];
  modalOptions: NgbModalOptions = {
    // size: 'lg'
  };

  // paginate
  paginate: Paginated;
  loadingScroll: boolean;
  disableScroll = false;

  constructor(
    // private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  l
  onUp() {
    console.log('on up');
  }
}
