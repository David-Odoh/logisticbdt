import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class NftService {
  BASE_URL;

  scannedCode = new BehaviorSubject<any>(null);
  $qrCode = this.scannedCode.asObservable();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private $url: BaseUrlService
    ) { 
    this.BASE_URL = this.$url.getURL();
  }

  updateQrCode(code: any) {
    this.scannedCode.next(code);
    localStorage.setItem('PID', code);
  }

  // Create NFTs
  saveNFT(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/v1/ipfs/save-item`, data)
      .pipe(map(res => { return res }),
        catchError(this.handleError)
      );
  }

  // View all my NFTs
  myNFTs(PK2: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/v1/transaction/pk2`, {params: {pk2: PK2}})
      .pipe(map(res => { return res }),
        catchError(this.handleError)
      );
  }
 
  // HANDLE ALL ERRORS
  private handleError(error: HttpErrorResponse) {
    // console.error('An error occurred:', error);
    // console.error(
    //   `Server returned code ${error.status}, ` +
    //   `body was: ${error.message}`);
    if (error.status == 404) {
      this.toastr.error('Unauthorized', 'An Issue Occurred!');
      return throwError('NFTs Not Found!');
    }
    return throwError('Oops, unable to complete! please try again later.');
  }
}
