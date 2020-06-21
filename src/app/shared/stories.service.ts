import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface Story {
  storyURL: string;
  title: string;
  body: string;
  createdAt: Date;
  owner: {
    login: string;
  };
  options: string[];
  nextPages: string[];
  isFirst: boolean;
  isPublished?: boolean;
}

export interface GetStoryListResponse {
  storyList: Story[];
  page: number;
  pages: number;
}

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  pageList = null;
  pageNumber = 10;
  pageCount = 20;
  newPublishings = [];
  newUnpublishings = [];
  currentStory: Story | null = null;
  storyList: Story[] = [];

  constructor(private http: HttpClient) {}

  getStoryList(body = {}) {
    const token = localStorage.getItem('TOKEN');

    try {
      this.http.post<GetStoryListResponse>('https://made-up-world-nodejs.herokuapp.com/api/reading/all', body, {
        headers: { ...(token && { Authorization: token }) },
      })
        .pipe(tap(response => {
          this.storyList = response.storyList;
          this.pageNumber = response.page;
          this.pageCount = response.pages;
        }))
        .subscribe();
    } catch (err) {
      console.error(err);
    }
  }

  getStory(body) {
    try {
      this.http.post<Story>('https://made-up-world-nodejs.herokuapp.com/api/reading/page', body)
        .pipe(tap(response => {
          this.currentStory = response;
        }))
        .subscribe();
    } catch (err) {
      console.error(err);
    }
  }

  getAllPages(storyURL) {
    try {
      this.http.post<Story>('https://made-up-world-nodejs.herokuapp.com/api/editing/all', { storyURL }, {
        headers: { Authorization: localStorage.getItem('TOKEN') },
      })
        .pipe(tap(response => {
          this.pageList = response;
        }))
        .subscribe();
    } catch (err) {
      console.error(err);
    }
  }

  saveStory(body) {
    try {
      this.http.post<Story>('https://made-up-world-nodejs.herokuapp.com/api/editing/save-story', body, {
        headers: { Authorization: localStorage.getItem('TOKEN') },
      })
        .pipe(tap(response => {
          this.pageList = response;
        }))
        .subscribe();
    } catch (err) {
      console.error(err);
    }
  }

  removeStory(storyURL) {
    try {
      this.http.post<Story>('https://made-up-world-nodejs.herokuapp.com/api/editing/remove-story', storyURL, {
        headers: { Authorization: localStorage.getItem('TOKEN') },
      })
        .pipe(tap(response => {
          this.pageList = response;
        }))
        .subscribe();
    } catch (err) {
      console.error(err);
    }
  }

  publishStory(storyURL) {
    try {
      this.http.post<Story>('https://made-up-world-nodejs.herokuapp.com/api/editing/publish', { storyURL }, {
        headers: { Authorization: localStorage.getItem('TOKEN') },
      })
        .pipe(tap())
        .subscribe();
    } catch (err) {
      console.error(err);
    }
  }

  unpublishStory(storyURL) {
    try {
      this.http.post<Story>('https://made-up-world-nodejs.herokuapp.com/api/editing/unpublish', { storyURL }, {
        headers: { Authorization: localStorage.getItem('TOKEN') },
      })
        .pipe(tap())
        .subscribe();
    } catch (err) {
      console.error(err);
    }
  }

  clearList() {
    this.pageList = [];
  }
}
