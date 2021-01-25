import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  post(url: string, body: object){
    return this.http.post(url, body);
  }

  get(url: string){
    return this.http.get(url);
  }

}
