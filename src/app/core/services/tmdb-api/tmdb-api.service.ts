import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  baseUrl = 'https://api.themoviedb.org/3/';

  options = {
    api_key: 'ef1b01344ec9249024a006c8808cc8c1',
    language: 'pt-BR'
  }

  constructor() {}
}
