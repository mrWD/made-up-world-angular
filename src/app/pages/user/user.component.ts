import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService, User } from 'src/app/shared/users.service';
import { AuthService } from 'src/app/shared/auth.service';
import { StoriesService, Story } from 'src/app/shared/stories.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent implements OnInit {
  userId: string;

  constructor(
    public authService: AuthService,
    public usersService: UsersService,
    public storiesService: StoriesService,
    private route: ActivatedRoute,
  ) {
    this.userId = route.snapshot.params.id;
  }

  getPhotoUrl(value: string): string {
    return `${this.usersService.destination}/${value}`;
  }

  getStoryLink(value: string): string {
    return `/edit-story/${value}`;
  }

  isUser(): boolean {
    return this.usersService.userInfo && this.checkLogin(this.usersService.userInfo?.login);
  }

  isFollowed(): boolean {
    return this.usersService.userInfo
      .followers?.some((item: User) => this.checkLogin(item?.login));
  }

  isFollower(): boolean {
    return this.usersService.userInfo
      .followings?.some((item: User) => this.checkLogin(item?.login));
  }

  checkLogin(value: string): boolean {
    return this.authService.authInfo?.login === value;
  }

  togglePublishment(storyInfo: Story): void {
    if (this.checkPublishing(storyInfo)) {
      this.storiesService.unpublishStory(storyInfo.storyURL);
    } else {
      this.storiesService.publishStory(storyInfo.storyURL);
    }
  }

  isFollowedFilter(userList: { login: string }[], user: User): boolean {
    return !userList.some((item) => item?.login === user.login);
  }

  checkPublishing(story: Story): boolean {
    return story.isPublished;
  }

  ngOnInit() {
    this.usersService.getUserInfo(this.userId);

    this.storiesService.getStoryList({ owner: this.userId });
  }
}
