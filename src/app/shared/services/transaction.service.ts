import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  BASE_URL;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private $url: BaseUrlService
    ) { 
    this.BASE_URL = this.$url.getURL();
  }

  // Create Transactions
  getTransactionsByPID(PID: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/v1/transaction/${PID}/pid_exit`)
      .pipe(map(res => { return res }),
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
      return throwError('Transactions Not Found!');
    }
    return throwError('Oops, unable to complete! please try again later.');
  }
}
