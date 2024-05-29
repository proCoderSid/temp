import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions: {};

  constructor(private http: HttpClient) {
    const authToken = '';
    this.httpOptions = new HttpHeaders({
      // Authorization: `${'Bearer ' + authToken}`,
      //clID: `${BASE.HEADER_ARRAY[0].clID}`,
      // userID: `${BASE.HEADER_ARRAY[1].userID}`,
      // brID: `${BASE.HEADER_ARRAY[2].brID}`,
      // year: `${BASE.HEADER_ARRAY[3].year}`
      Authorization: `${'Bearer ' + authToken}`,
      clID: `1`,
      userID: `1`,
      brID: `1`,
      year: `22  `
    });
  }

  get(path: string, params: any, searchId?: number, searchParams?: any): Observable<any> {
    if (searchId) {
      return this.http.get(`${environment.API_URL}${path}` + '/' + searchId, { params, headers: this.httpOptions });
    } else if (searchParams) {
      return this.http.get(`${environment.API_URL}${this.prepareserviceName(path, params, searchParams)}`, { headers: this.httpOptions });
    } else {
      return this.http.get(`${environment.API_URL}${path}`, { params, headers: this.httpOptions });
    }
  }

  getResponseText(path: string, params: any): Observable<any> {
    return this.http.get(`${environment.API_URL}${path}`, { params, responseType: 'text' });
  }

  getArrayBuffer(path: string, params: any): Observable<any> {
    return this.http.get(`${environment.API_URL}${path}`, { params, responseType: 'arraybuffer' });
  }

  getAssetJsonFile(path: string, params: any): Observable<any> {
    return this.http.get(`${path}`, { params });
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post(`${environment.API_URL}${path}`, body, { headers: this.httpOptions });
  }

  postResponseText(path: string, body: any): Observable<any> {
    return this.http.post(`${environment.API_URL}${path}`, body, { responseType: 'text' });
  }

  postProgress(path: string, body: any): Observable<any> {
    return this.http.post(`${environment.API_URL}${path}`, body, {
      reportProgress: true,
      observe: 'events'
    });
  }

  put(path: string, Id: number, body: any = {}): Observable<any> {
    console.log(this.httpOptions);

    return this.http.put(`${environment.API_URL}${path}` + '/' + Id, body, { headers: this.httpOptions });
  }

  putResponseText(path: string, body: any): Observable<any> {
    return this.http.put(`${environment.API_URL}${path}`, body, { responseType: 'text' });
  }

  delete(path: string, Id: number, body: any = {}): Observable<any> {
    return this.http.delete(`${environment.API_URL}${path}` + '/' + Id, body);
  }
  private prepareserviceName(serviceName: string, params: any, searchParams?: any) {
    !this.isEmpty(searchParams) ? (params['search'] = JSON.stringify(searchParams)) : '';
    if (Object.keys(params).length) {
      let queryString = params ? '?' : '';
      let count = 0;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          queryString += count > 0 ? '&' + key + '=' + params[key] : key + '=' + params[key];
          count++;
        }
      }
      return serviceName + queryString;
    }
    return serviceName;
  }

  isEmpty(obj: any[] | undefined | any): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  getJson(url: any): Observable<any> {
    return this.http.get(url);
  }
}
