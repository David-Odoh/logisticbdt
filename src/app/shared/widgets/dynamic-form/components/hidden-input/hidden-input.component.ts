import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config';

@Component({
  selector: 'app-hidden-input',
  templateUrl: './hidden-input.component.html',
  styleUrls: ['./hidden-input.component.css']
})
export class HiddenInputComponent implements OnInit {
  //@ts-ignore
  config: FieldConfig;
  //@ts-ignore
  group: FormGroup;
  //@ts-ignore
  isEven: Boolean;

  constructor() { }

  ngOnInit() {
  }

}
