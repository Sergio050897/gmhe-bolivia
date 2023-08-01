import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent implements OnInit {
  @Input() title: string;
  @Input() pdfRuta: string;

  modalOptions: NgbModalOptions = {};
  urlSafe: SafeResourceUrl;

  constructor(
    public activeModal: NgbActiveModal,
    public sanitizer: DomSanitizer
  ) {
    this.modalOptions = {
      size: 'lg',
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
   }

  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfRuta);

  }
}
