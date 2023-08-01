import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() srcUrl;
  url = environment.imgUrl;
  constructor() { }

  ngOnInit(): void {
  }

}
