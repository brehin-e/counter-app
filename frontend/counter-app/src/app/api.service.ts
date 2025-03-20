import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

export function getLocalStorageName(storageName: string): string {
  return environment.storageHeader + '-' + storageName;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API: string;

  constructor(
    private http: HttpClient
  ) {
    this.API = '';
    if (environment.backendUrl.length > 0) {
      this.API = `${environment.backendUrl}/api/`
    }
  }

  get(path: string, params: Record<string, any> = {}): Observable<any> {
    let httpParams = new HttpParams();
    for (const key in params) {
      const param = params[key];

      if (Array.isArray(param)) {
        httpParams = httpParams.append(key, param.join(','));
      } else {
        httpParams = httpParams.append(key, params[key]);
      }
    }

    return this.http.get(`${this.API}${path}`, {
      params: httpParams,
    });
  }

}
