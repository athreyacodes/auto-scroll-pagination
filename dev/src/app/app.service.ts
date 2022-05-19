import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, concatMap, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  pathname;

  constructor(private http: HttpClient) {
    this.pathname = environment.production ?
      window.location.pathname :
      "../";
  }

  private getJSON(): Observable<any> {
    return this.http.get(this.pathname + "assets/list.json");
  }

  public GetList(start: number, pagesize: number): Observable<any> {
    return this.getJSON()
      .pipe(concatMap(response => of(response).pipe(delay(1000))))
      .pipe(map((response: any) => {
        return {
          total: response.total,
          items: response.items.splice(start, pagesize)
        };
      }));
  }
}
