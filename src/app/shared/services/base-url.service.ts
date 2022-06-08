import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  // BASE_URL = '/api';
  BASE_URL = 'https://logistics-bdt-api.herokuapp.com/api';

  constructor() { }

  getURL() {
    return this.BASE_URL;
  }
}
