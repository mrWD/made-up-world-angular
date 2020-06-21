import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PagesService, SaveResponse } from 'src/app/shared/pages.service';
import { StoriesService } from 'src/app/shared/stories.service';

export interface Form {
  title: string | null;
  body: string | null;
  options: string[];
}

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass'],
})
export class EditPageComponent implements OnInit {
  private OPTIONS_LIST = 4;

  pageId: string;
  show = false;
  showItem = false;
  form: Form = {
    title: null,
    body: null,
    options: [],
  };

  constructor(
    public pagesService: PagesService,
    public storiesService: StoriesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.pageId = route.snapshot.params.id;
  }

  get hasTitle() {
    return this.pagesService.currentPage && this.pagesService.currentPage.title;
  }

  removeOption(index: number): void {
    this.form.options[index] = null;
  }

  clearOptions(): void {
    this.form.options = [];
  }

  getOptions() {
    return [...Array(this.OPTIONS_LIST).keys()];
  }

  handleSave() {
    const body = {
      ...this.form,
      pageId: this.pageId,
      storyURL: this.storiesService.pageList[0]?.storyURL,
    };

    const callback = (response: SaveResponse) => {
      this.router.navigate(['edit-story', response.storyURL]);
    };

    this.pagesService.savePage(body, callback);
  }

  ngOnInit() {
    if (this.pageId || this.storiesService.pageList) {
      const body = {
        pageId: this.pageId,
        storyURL: this.storiesService.pageList[0]?.storyURL,
      };

      const callback = (response) => {
        this.form = {
          ...this.form,
          ...response,
        };
      };

      this.pagesService.getPage(body, callback);
    }
  }
}
