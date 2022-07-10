import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-verify',
  templateUrl: './brand-verify.component.html',
  styleUrls: ['./brand-verify.component.scss']
})
export class BrandVerifyComponent implements OnInit {
  accountName = 'Verify Brand';

  constructor(private loc: Location) { }

  ngOnInit(): void {
  }

  goBack() {
    this.loc.back();
  }
}
