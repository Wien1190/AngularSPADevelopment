import { HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Currency } from "./model/currency.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class FixerService {
  constructor(private http: HttpClient) {}

  getRates(): Observable<Currency[]> {
    let url: string = `http://data.fixer.io/api/latest?access_key=${
      environment.fixerAPIKey
    }`;
    return this.http.get<any>(url).pipe(
      map(result => {
        return Object.keys(result.rates).map((key, index) => {
          return { code: key, value: result.rates[key] };
        });
      })
    );
  }
}
