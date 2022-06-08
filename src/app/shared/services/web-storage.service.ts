import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  constructor(private $security: SecurityService) { }

  setItem(key: string, value: string) {
    let encypted = this.$security.encryptUsingAES256(value).toString();
    console.log(encypted)
    if (encypted) localStorage.setItem(key, encypted);
  }

  getItem(key: string) {
    let encrypted = localStorage.getItem(key);
    if (encrypted) {
      let decrypted = this.$security.decryptUsingAES256(encrypted);
      console.log(decrypted)
      return decrypted;
    }
  }

}
