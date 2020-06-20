import { Component, Input, OnInit } from '@angular/core';

import { StoriesService } from '../../shared/stories.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.sass'],
})
export class StoryListComponent implements OnInit {
  constructor(public storiesService: StoriesService) {}

  goToPage(page) {
    this.storiesService.getStoryList({ page });
  }

  getStoryUrl(value: string): string {
    return `/story/${value}`;
  }

  getUserUrl(value: string): string {
    return `/user/${value}`;
  }

  ngOnInit() {
    this.storiesService.getStoryList();
  }
}
