import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-switcher',
  templateUrl: './color-switcher.component.html',
  styleUrls: ['./color-switcher.component.scss']
})
export class ColorSwitcherComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(".switcher-btn-p").on("click", function() {
      $(".switcher-wrapper-p").toggleClass("switcher-toggled")
    }), $(".close-switcher-p").on("click", function() {
      $(".switcher-wrapper-p").removeClass("switcher-toggled")
    }) 

  }

}
