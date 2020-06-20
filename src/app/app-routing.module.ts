import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoryListComponent } from './pages/story-list/story-list.component';
import { StoryComponent } from './pages/story/story.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { EditStoryComponent } from './pages/edit-story/edit-story.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: StoryListComponent,
  },
  {
    path: 'story/:id',
    component: StoryComponent,
  },
  {
    path: 'edit-page',
    component: EditPageComponent,
  },
  {
    path: 'edit-page/:id',
    component: EditPageComponent,
  },
  {
    path: 'edit-story/:id',
    component: EditStoryComponent,
  },
  {
    path: 'user-list',
    component: UserListComponent,
  },
  {
    path: 'user/:id',
    component: UserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  title: 'Made Up World';
}
