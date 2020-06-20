import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StoriesService } from 'src/app/shared/stories.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.sass'],
})
export class StoryComponent implements OnInit {
  storyURL: string;

  constructor(public storiesService: StoriesService, private route: ActivatedRoute) {
    this.storyURL = route.snapshot.params['id'];
  }

  nextPage(pageId: string): void {
    this.storiesService.getStory({ pageId });
  }

  getUserLink(value: string): string {
    return `/user/${value}`;
  }

  ngOnInit() {
    this.storiesService.getStory({
      storyURL: this.storyURL,
    });
  }
}
