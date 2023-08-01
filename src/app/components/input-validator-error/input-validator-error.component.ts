import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-validator-error',
  templateUrl: './input-validator-error.component.html',
  styleUrls: ['./input-validator-error.component.scss']
})
export class InputValidatorErrorComponent implements OnInit {
  @Input()
  public control: any;
  @Input()
  public controlName: string;

  constructor() { }

  ngOnInit(): void {
    console.log('control', this.control);
  }

}
