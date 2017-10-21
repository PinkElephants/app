import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  public fetchUser(id: number) {
    return this.http.get('/').subscribe((response) => {
      return response;
    });
  }
}
