import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientHttpServiceService {

  constructor(private http: HttpClient) { }

 
  public async httpClientPost(url:any,model:any){
    let options = {
      method: "POST",
      body: JSON.stringify(model),
      headers: {
        'Content-Type': 'Application/Json'
      }
    };
    return await  (await (fetch(`${environment.server}${url}`, options))).json();
  }

  public async httpClientGet(url:any){
    let options = {
      method: "GET",
      headers: {
        'Content-Type': 'Application/Json'
      }
    };
    return await  (await (fetch(`${environment.server}${url}`, options))).json();
  }




}
