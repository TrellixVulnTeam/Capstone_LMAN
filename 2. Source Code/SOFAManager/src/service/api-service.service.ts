import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from '../config/config'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  post(url: string, body: FormData){
    let fullUrl = URL_BASE + url;
    return this.http.post(fullUrl, body);
  }

  get(url: string){
    let fullUrl = URL_BASE + url;
    return this.http.get(fullUrl);
  }

  postWithHeader(url: string, body: FormData, header: any ){
    let fullUrl = URL_BASE + url;
    return this.http.post(fullUrl, body, header);
  }

  getWithHeader(url: string, header: any ){
    let fullUrl = URL_BASE + url;
    return this.http.get(fullUrl, header);
  }
}
