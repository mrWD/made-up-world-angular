import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SVGComponent } from './components/svg/svg.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BtnComponent } from './components/btn/btn.component';
import { PhotoComponent } from './components/photo/photo.component';
import { FieldComponent } from './components/field/field.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';

import { AuthMenuComponent } from './components/auth-menu/auth-menu.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';

import { StoryListComponent } from './pages/story-list/story-list.component';
import { StoryComponent } from './pages/story/story.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { EditStoryComponent } from './pages/edit-story/edit-story.component';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [
    SVGComponent,
    AppComponent,
    LoaderComponent,
    BtnComponent,
    FieldComponent,
    PhotoComponent,
    TooltipComponent,
    AuthMenuComponent,
    MenuComponent,
    NavComponent,
    SignUpComponent,
    HeaderComponent,
    FiltersComponent,
    PaginationComponent,
    CardComponent,
    ListComponent,
    StoryListComponent,
    StoryComponent,
    EditPageComponent,
    EditStoryComponent,
    UserListComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClickOutsideModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
