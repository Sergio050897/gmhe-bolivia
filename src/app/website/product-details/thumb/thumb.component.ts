import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.scss']
})
export class ThumbComponent implements OnInit {
  @Input() srcUrl;
  url = environment.imgUrl;
  constructor() { }

  ngOnInit(): void {
  }

}
