import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import * as moment from "moment";
import { Observable, Observer, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Movie } from "../movie";
import { MovieService } from "../movie.service";

enum CurrentView {
  SingletonObservable,
  Array,
  Filter,
  ES6Filter,
  Dashboard
}

@Component({
  selector: "app-observables",
  templateUrl: "./observable-stream.component.html",
  styleUrls: ["./observable-stream.component.scss"]
})
export class ObservableStreamComponent implements OnInit, OnDestroy {
  currentView: CurrentView;
  view = CurrentView;

  addMovieVisible = false;

  stop: boolean = false;
  MovieSubscription: Subscription;
  MovieSingleton: Observable<Movie>;

  movieObs: Observable<Movie[]>;

  playing: Observable<Movie[]>;
  upcoming: Observable<Movie[]>;

  playingArray: Movie[];
  upcomingArray: Movie[];

  movies: Movie[];

  constructor(private ms: MovieService) {}
  //
  ngOnInit() {
    this.currentView = CurrentView.SingletonObservable;
  }

  ngOnDestroy(): void {}

  createSingletonObservable() {
    this.currentView = CurrentView.SingletonObservable;
    let label = "Current Movie created at:";

    this.MovieSingleton = new Observable((observer: Observer<Movie>) => {
      let interval = setInterval(() => {
        if (this.stop) {
          clearInterval(interval);
        }
        observer.next(<Movie>{
          title: `${label} ${moment().format("h:mm:ss a")}`
        });
      }, 1000);
    });

    this.MovieSubscription = this.MovieSingleton.subscribe(
      (data: Movie) => {
        console.log("Movie created: ", data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log("completed");
      }
    );
  }

  unsubscribeSingletonObservable() {
    //think about why we have to implement stop
    this.stop = true;
    this.MovieSubscription.unsubscribe();
    console.log("unsbscribed MovieSubscription");
  }

  createArrayObservable() {
    this.currentView = CurrentView.Array;
    let label = "Movie ";
    this.movies = [];

    this.movieObs = new Observable((observer: Observer<Movie[]>) => {
      setTimeout(() => {
        this.movies.push(<Movie>{ title: `${label} 1`, startTime: new Date() });
        observer.next(this.movies);
      }, 0);
      setTimeout(() => {
        this.movies.push(<Movie>{ title: `${label} 2`, startTime: new Date() });
        observer.next(this.movies);
      }, 1000);
      setTimeout(() => {
        this.movies.push(<Movie>{ title: `${label} 3`, startTime: new Date() });
        observer.next(this.movies);
      }, 2000);
      setTimeout(() => {
        // observer.error('this does not work');
        observer.complete();
      }, 3000);
      setTimeout(() => {
        this.movies.push(<Movie>{ title: `${label} 4`, startTime: new Date() });
        observer.next(this.movies);
      }, 4000);
    });

    this.movieObs.subscribe(data => {
      this.movies = data;
    });
  }

  getArrayObservableFromService() {
    this.movies = [];
    this.currentView = CurrentView.Array;
    this.ms.getMovieStream(10, 1).subscribe(data => {
      (this.movies = data), console.log(data);
    });
  }
}
