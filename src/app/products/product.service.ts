import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHandler, HttpErrorResponse} from '@angular/common/http';
import {catchError,tap} from 'rxjs/operators'
import { errorHandler } from "@angular/platform-browser/src/browser";
@Injectable({
    providedIn: 'root'
})
export class ProductService{

private productUtl = 'api/products/products.json';

    constructor(private http:HttpClient){

    }
        getProducts(): Observable<IProduct[]>{
            return this.http.get<IProduct[]>(this.productUtl).pipe(
                tap(data=> console.log('All: ' +JSON.stringify(data))),
                catchError(this.handleError)
            );
        } 

        private handleError(err:HttpErrorResponse){
            let errorMessage = "there was an error";    
            return throwError(errorMessage);
        }
}