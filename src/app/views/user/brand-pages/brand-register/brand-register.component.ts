import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-register',
  templateUrl: './brand-register.component.html',
  styleUrls: ['./brand-register.component.scss']
})
export class BrandRegisterComponent implements OnInit {
  accountName = 'Register Brand';

  constructor(private loc: Location) { }

  ngOnInit(): void {
  }

  goBack() {
    this.loc.back();
  }
}
