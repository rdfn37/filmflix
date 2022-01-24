import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, Observable, tap } from 'rxjs';

import { MovieTvBase } from './../core/models/movie-tv-base';
import { TmdbApiService } from './../core/services/tmdb-api/tmdb-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  trending$!: Observable<MovieTvBase[]>;
  results$?: Observable<MovieTvBase[]>;
  readonly placeHolder = "http://www.mdtop.com.br/wp-content/uploads/2021/01/placeholder-images-image_large.png"

  createImageLink(poster: string) {
    if(poster) {
      return `https://image.tmdb.org/t/p/w300/${poster}`
    }

    return this.placeHolder
  }

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private tmdbApiService: TmdbApiService) {}

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      filter(Boolean),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        const query = this.searchInput.nativeElement.value;
        console.log(query)
        if(query) {
          this.results$ = this.tmdbApiService.search(query)
        }else{
          this.results$ = undefined;
        }
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.trending$ = this.tmdbApiService.trending();
  }
}
