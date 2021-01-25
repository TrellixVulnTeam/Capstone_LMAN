import { Injectable } from '@angular/core';
import { Static } from '../Common/static';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService) { }

  login(username: string, password: string){

    let formdata: FormData = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    return this.apiService.post(Static.LOGIN_URL, formdata)
  }

}
