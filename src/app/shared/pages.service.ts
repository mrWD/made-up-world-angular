import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { TOKEN } from 'src/app/constants/token';

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
      this.http.post<Page>(`${environment.API_URL}/editing/edit`, body, {
        headers: { Authorization: localStorage.getItem(TOKEN) },
      })
        .pipe(tap(response => this.currentPage = response))
        .subscribe(callback);
    } catch (err) {
      console.error(err);
    }
  }

  savePage(body, callback): void {
    try {
      this.http.post<SaveResponse>(`${environment.API_URL}/editing/save`, body, {
        headers: { Authorization: localStorage.getItem(TOKEN) },
      })
        .pipe(tap(callback))
        .subscribe();
    } catch (err) {
      console.error(err);
    }
  }

  removePage(storyURL: string): void {
    try {
      this.http.post<Page>(`${environment.API_URL}/editing/remove-page`, { storyURL }, {
        headers: { Authorization: localStorage.getItem(TOKEN) },
      })
        .pipe(tap(response => this.currentPage = response))
        .subscribe();
    } catch (err) {
      console.error(err);
    }
  }
}
