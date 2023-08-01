import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.scss']
})
export class DetalleVentasComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(".switcher-btn-p").on("click", function() {
      $(".switcher-wrapper-p").toggleClass("switcher-toggled")
    }), $(".close-switcher-p").on("click", function() {
      $(".switcher-wrapper-p").removeClass("switcher-toggled")
    }) 

  }

}
