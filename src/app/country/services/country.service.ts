import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private baseUrl: string = 'https://restcountries.com/v3.1';

  private http = inject(HttpClient);

  private _regions: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    console.log({ region });

    const url = `${this.baseUrl}/region/${region}?fields=name,cca3,borders`;
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    if (!alphaCode) return of();

    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=name,cca3,borders`;
    return this.http.get<Country>(url);
  }

  getCountryBordersByCodes(borders: string[]) {
    // TODO: validar que no venga vacío

  }


}
