import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mortgage } from '../model/Mortgage.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MortgageApiService {

  private numRetries = 0;

  // Define API
  apiURL = 'https://14c5jip7sg.execute-api.eu-west-1.amazonaws.com/Prod';

  constructor(private http: HttpClient) { }

  /*========================================

    CRUD Methods for consuming RESTful API

  =========================================*/

  // Http Options

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 

  // HttpClient API get() method
  getMortgages(): Observable<Mortgage[]> {
    return this.http.get<Mortgage[]>(this.apiURL + '/mortgage')
    .pipe(
      retry(this.numRetries),
      catchError(this.handleError)
    )
  }

  getMortgagesByStatus(statusCode): Observable<Mortgage[]> {
    return this.http.get<Mortgage[]>(this.apiURL + '/mortgage?status=' + statusCode)
    .pipe(
      retry(this.numRetries),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method
  getMortgage(id): Observable<Mortgage> {
    return this.http.get<Mortgage>(this.apiURL + '/mortgage/' + id)
    .pipe(
      retry(this.numRetries),
      catchError(this.handleError)
    )
  } 

  // HttpClient API post() method
  createMortgage(mortgage): Observable<Mortgage> {
    return this.http.put<Mortgage>(this.apiURL + '/mortgage', JSON.stringify(mortgage), this.httpOptions)
    .pipe(
      retry(this.numRetries),
      catchError(this.handleError)
    )
  } 

  // HttpClient API put() method
  updateMortgage(id, mortgage): Observable<Mortgage> {
    return this.http.post<Mortgage>(this.apiURL + '/mortgage/' + id, JSON.stringify(mortgage), this.httpOptions)
    .pipe(
      retry(this.numRetries),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method
  deleteMortgage(id){
    return this.http.delete<Mortgage>(this.apiURL + '/mortgage/' + id, this.httpOptions)
    .pipe(
      retry(this.numRetries),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}