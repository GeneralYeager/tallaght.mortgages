import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mortgage } from '../model/Mortgage.model';
import { Clarification } from '../model/clarification.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, mergeMap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MortgageApiService {

  private numRetries = 0;

  // Define API
  apiURL = 'https://t6hcs10sv6.execute-api.eu-west-1.amazonaws.com/Prod';

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

   // HttpClient API delete() method
   submitMortgage(id) {
    const workflowInput = {
      mortgageId: id
    };

    return this.http.put<String>(this.apiURL + '/workflow/execution/', JSON.stringify(workflowInput), this.httpOptions)
    .pipe(
      retry(this.numRetries),
      catchError(this.handleError)
    )
  }

  approveMortgage(id) {
    const approvalDecision = {
      mortgageId: id,
      action: "approve"
    };
  
    return this.http.post<String>(this.apiURL + '/workflow/execution/', JSON.stringify(approvalDecision), this.httpOptions)
      .pipe(
        retry(this.numRetries),
        catchError(this.handleError)
    )
  }

  declineMortgage(id) {
    const rejectionDecision = {
      mortgageId: id,
      action: "reject"
    };
  
    return this.http.post<String>(this.apiURL + '/workflow/execution/', JSON.stringify(rejectionDecision), this.httpOptions)
      .pipe(
        retry(this.numRetries),
        catchError(this.handleError)
    )
  }

  clarifyMortgage(id) {
    const clarifyDecision = {
      mortgageId: id,
      action: "clarify"
    };
  
    return this.http.post<String>(this.apiURL + '/workflow/execution/', JSON.stringify(clarifyDecision), this.httpOptions)
      .pipe(
        retry(this.numRetries),
        catchError(this.handleError)
    )
  }

  brokerClarifyMortgage(id) {
    const clarifyDecision = {
      mortgageId: id
    };
  
    return this.http.post<String>(this.apiURL + '/broker/clarification/', JSON.stringify(clarifyDecision), this.httpOptions)
      .pipe(
        retry(this.numRetries),
        catchError(this.handleError)
    )
  }
  
  submitClarification(id, txt): Observable<String> {
    const clarificationDecision = {
      mortgageId: id,
      text: txt
    };
  
    return this.http.post<String>(this.apiURL + '/clarifications/', JSON.stringify(clarificationDecision), this.httpOptions)
      .pipe(
        retry(this.numRetries),
        catchError(this.handleError)
    )
  }


  getClarifications(mortgageId) {
  
    return this.http.get<Clarification[]>(this.apiURL + '/clarifications/' + mortgageId)
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