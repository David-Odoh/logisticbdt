import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  BASE_URL;

  constructor( 
    private http: HttpClient,
    private toastr: ToastrService,
    private $url: BaseUrlService
    ) { 
      this.BASE_URL = this.$url.getURL();
    }

    // Create Images
    saveImage(data: any): Observable<any> {
      return this.http.post(`${this.BASE_URL}/v1/ipfs/add_image_to_ipfs`, data)
        .pipe(map(res => { return res }),
          catchError(this.handleError)
        );
    }
    
    // Get One
    getSingleImage(id: any): Observable<any> {
      return this.http.get(`${this.BASE_URL}/v1/ipfs/get_ipfs/${id}`)
        .pipe(map(res => { return res }),
          catchError(this.handleError)
        );
    }
  
    // Get All Images from API
    getAllImages(page: any): Observable<any> {
      return this.http.get(`${this.BASE_URL}/permissions`, page)
        .pipe(map(res => { return res }),
          catchError(this.handleError)
        );
    }
  
    // Update Images
    updateImage(data: any, id: any): Observable<any> {
      return this.http.put(`${this.BASE_URL}/permissions/${id}`, data)
        .pipe(map(res => { return res }),
          catchError(this.handleError)
        );
    }
  
    // Delete Images
    deleteImage(id: any): Observable<any> {
      return this.http.delete(`${this.BASE_URL}/permissions/${id}`)
        .pipe(map(res => { return res }),
          catchError(this.handleError)
        );
    }
  
    // Process Get-Current-Images Images
    getUserImages() {
  
    }
  
    // HANDLE ALL ERRORS
    private handleError(error: HttpErrorResponse) {
      // console.error('An error occurred:', error);
      // console.error(
      //   `Server returned code ${error.status}, ` +
      //   `body was: ${error.message}`);
      if (error.status == 404) {
        this.toastr.error('Unauthorized', 'An Issue Occurred!');
        return throwError('Images Not Found!');
      }
      return throwError('Oops, unable to complete! please try again later.');
    }
}
