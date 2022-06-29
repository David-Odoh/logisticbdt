import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  activeNavLink;
  accountMenu = false;
  accountMenu2 = false;
  extraPageMenu = false;

  terms_from_dic = new Dictionary().terms;

  navLinks = [
    { name: 'dashboard', url: '/user/home', toolTip: 'Home', iconClasses: 'remix ri-home-2-line' },
    { name: 'profile', url: '/user/account', toolTip: 'Profile', iconClasses: 'remix ri-wallet-3-line' },
    // { name: 'market', url: '/user/market', toolTip: 'Market', iconClasses: 'remix ri-shopping-cart-line' },
    // { name: 'search', url: '/user/search', toolTip: 'Search', iconClasses: 'remix ri-search-2-line' },
  ];

  accountLinks: any = [
    { url: '/sessions/account', name: 'Profile', iconClasses: 'ri-user-2-line' },
    { url: '/sessions/account', name: 'Settings', iconClasses: 'ri-settings-line' },
  ];

  extraPagesLinks: any = [
    { url: '/sessions/account', name: 'About LBDT', iconClasses: '' },
    { url: '/sessions/account', name: 'Sign Up', iconClasses: '' },
  ];

  constructor() {
    this.activeNavLink = this.navLinks[0];
  }

  ngOnInit(): void {
  }

  selectNavLink(link: any) {
    this.activeNavLink = link;
  }

  toggleMenu(trigger: string) {
    if (trigger == 'extra')
      this.extraPageMenu = !this.extraPageMenu;

    if (trigger == 'account')
      this.accountMenu = !this.accountMenu;

    if (trigger == 'account2')
      this.accountMenu2 = !this.accountMenu2;
  }

  close(trigger: string) {
    if (trigger == 'extra')
      this.extraPageMenu = false;

    if (trigger == 'account')
      this.accountMenu = false;

    if (trigger == 'account2')
      this.accountMenu2 = false;
  }

}
