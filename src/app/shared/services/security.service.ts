import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() {
  }

  encryptUsingAES256(rawData: string) {
    let _key = CryptoJS.enc.Utf8.parse(environment.secretKey);
    let _iv = CryptoJS.enc.Utf8.parse(environment.secretIV);

    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(rawData), _key, {
      iv: _iv,
      mode: CryptoJS.mode.CBC,
    }); 
    return encrypted;
  }

  decryptUsingAES256(encrypted: string) {
    let _key = CryptoJS.enc.Utf8.parse(environment.secretKey);
    let _iv = CryptoJS.enc.Utf8.parse(environment.secretIV);

    let decrypted = CryptoJS.AES.decrypt(
      encrypted, _key, {
      iv: _iv,
      mode: CryptoJS.mode.CBC,
    }).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }

  // encryptUsingAES256(rawData: string) {
  //   let _key = CryptoJS.enc.Utf8.parse(environment.secretKey);
  //   let _iv = CryptoJS.enc.Utf8.parse(environment.secretIV);

  //   let encrypted = CryptoJS.AES.encrypt(
  //     JSON.stringify(rawData), _key, {
  //     keySize: 16,
  //     iv: _iv,
  //     mode: CryptoJS.mode.ECB,
  //     padding: CryptoJS.pad.Pkcs7
  //   });
  //   return encrypted;
  // }

  // decryptUsingAES256(encrypted: string) {
  //   let _key = CryptoJS.enc.Utf8.parse(environment.secretKey);
  //   let _iv = CryptoJS.enc.Utf8.parse(environment.secretIV);

  //   let decrypted = CryptoJS.AES.decrypt(
  //     encrypted, _key, {
  //     keySize: 16,
  //     iv: _iv,
  //     mode: CryptoJS.mode.ECB,
  //     padding: CryptoJS.pad.Pkcs7
  //   }).toString(CryptoJS.enc.Utf8);
  //   return JSON.parse(decrypted);
  // }
}
