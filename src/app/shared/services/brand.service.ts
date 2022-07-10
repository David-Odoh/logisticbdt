import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map, catchError, throwError } from 'rxjs';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  BASE_URL;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private $url: BaseUrlService
    ) { 
    this.BASE_URL = this.$url.getURL();
  }

  // Create Brands
  saveBrand(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/v1/brand/new`, data)
      .pipe(map(res => { return res }),
        catchError(this.handleError)
      );
  }

  // Send User Verification Email
  sendVerificationEmail(data: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/v1/brand/send_email`, { params: {
      host_email: data.host_email,
      brand_id: data.brand_id
    }
  }).pipe(map(res => { return res }),
        catchError(this.handleError)
      );
  }

  // Create Brands
  verifyBrand(data: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/v1/brand/verify_secret`, { params: {
      secrets_id: data.secrets_id
    }
  }).pipe(map(res => { return res }),
        catchError(this.handleError)
      );
  }
 
  // HANDLE ALL ERRORS
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    // console.error(
    //   `Server returned code ${error.status}, ` +
    //   `body was: ${error.message}`);
    if (error.status == 404) {
      this.toastr.error('Unauthorized', 'An Issue Occurred!');
      return throwError('Brands Not Found!');
    } 
    if (error.status == 409) {return throwError('409')};
    return throwError('Oops, unable to complete! please try again later.');
  }
}
