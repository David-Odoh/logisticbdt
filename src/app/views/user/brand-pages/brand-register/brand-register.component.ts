import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-register',
  templateUrl: './brand-register.component.html',
  styleUrls: ['./brand-register.component.scss']
})
export class BrandRegisterComponent implements OnInit {
  accountName = 'Register Brand';

  constructor(private loc: Location, private router: Router) { }

  ngOnInit(): void {
  }

  verify() {
    this.router.navigate(['/verify-brand']);
  }

  goBack() {
    this.loc.back();
  }
}
