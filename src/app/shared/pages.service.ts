import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface Page {
  id: string;
  pageId: string;
  title: string;
  body: string;
  isPublished: boolean;
  isFirst?: boolean;
  storyURL?: string;
  options?: string[];
  nextPages?: string[];
}

export interface SaveResponse {
  pageId: string;
  storyURL: string;
}

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  pageList: Page[] = [];
  currentPage: Page = null;

  constructor(private http: HttpClient) {}

  getPage(body, callback): void {
    try {
      this.http.post<Page>('https://made-up-world-nodejs.herokuapp.com/api/editing/edit', body, {
        headers: { Authorization: localStorage.getItem('TOKEN') },
      })
        .pipe(tap(response => this.currentPage = response))
        .subscribe(callback);
    } catch (err) {
      console.error(err);
    }
  }

  savePage(body, callback): void {
    try {
      this.http.post<SaveResponse>('https://made-up-world-nodejs.herokuapp.com/api/editing/save', body, {
        headers: { Authorization: localStorage.getItem('TOKEN') },
      })
        .pipe(tap(callback))
        .subscribe();
    } catch (err) {
      console.error(err);
    }
  }

  removePage(storyURL: string): void {
    try {
      this.http.post<Page>('https://made-up-world-nodejs.herokuapp.com/api/editing/remove-page', { storyURL }, {
        headers: { Authorization: localStorage.getItem('TOKEN') },
      })
        .pipe(tap(response => this.currentPage = response))
        .subscribe();
    } catch (err) {
      console.error(err);
    }
  }
}
