import { Component, OnInit } from '@angular/core';

import { PagesService, Page } from 'src/app/shared/pages.service';
import { StoriesService } from 'src/app/shared/stories.service';
import { ActivatedRoute } from '@angular/router';

interface Changes {
  id: string;
  nextPages: string[];
  isFirst?: boolean;
}

const groupPageList = (filteredArr: Page[], arr: Page[][]): Page[][] => {
  const index: number = arr.length;
  const newArr = [...arr, []];
  const nextPages: string[] = arr[arr.length - 1].reduce((res: string[], item: Page) => (
    Array.from(new Set(res.concat(item?.nextPages || [])))
  ), []);

  const newFilteredArr = filteredArr.filter((item) => {
    const isConvinient = !nextPages.includes(item.pageId);
    const some = newArr[index]
      .some((prevItem: Page) => prevItem.nextPages?.includes(item.pageId));

    if (!isConvinient && !some) {
      newArr[index] = Array.from(new Set([...(newArr[index]), item]));
    }

    return isConvinient || some;
  });

  newArr[index].sort((item1: Page, item2: Page) => {
    const index1 = nextPages.indexOf(item1.pageId);
    const index2 = nextPages.indexOf(item2.pageId);

    if (index1 < index2) {
      return -1;
    }

    return 1;
  });

  if (!newArr[index][0]) {
    newArr.splice(index, 1);
  }

  if (!newFilteredArr.length) {
    return newArr;
  }

  if (filteredArr.length === newFilteredArr.length) {
    return [...newArr, filteredArr];
  }

  return groupPageList(newFilteredArr, newArr);
};

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.sass'],
})
export class EditStoryComponent implements OnInit {
  storyId: string;
  pinnedIndex = 0;
  indexParent = '';
  changes: Changes[] = [];

  constructor(
    public pagesService: PagesService,
    public storiesService: StoriesService,
    private activatedRouter: ActivatedRoute,
  ) {
    this.storyId = activatedRouter.snapshot.params.id;
  }

  get groupedPageList() {
    const { pageList } = this.storiesService;

    if (!pageList) {
      return null;
    }

    const first: Page | undefined = pageList.find((item: Page) => item.isFirst);

    if (!first) {
      return [pageList];
    }

    const newArr: Page[][] = [[first]];
    const filtered = pageList.filter((item: Page) => !item.isFirst);

    return groupPageList(filtered, newArr);
  }

  get title() {
    return this.storiesService.pageList.find(({ isFirst }: Page) => isFirst)?.title || '';
  }

  setFirst(id: string): void {
    this.changes = this.changes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isFirst: true,
        };
      }

      if (item.isFirst) {
        return {
          ...item,
          isFirst: false,
        };
      }

      return item;
    });
  }

  setPin(target: string): void {
    let { nextPages } = this.pagesService.pageList.find(({ id }: Page) => id === this.indexParent);

    if (!this.changes[0]) {
      nextPages[this.pinnedIndex] = target;

      this.changes = [{
        id: this.indexParent,
        nextPages,
      }];
    }

    this.changes = this.changes.map((item) => {
      if (item.id === this.indexParent) {
        return item;
      }

      ({ nextPages = [] } = item);
      nextPages[this.pinnedIndex] = target;

      return {
        ...item,
        nextPages,
      };
    });
  }

  changePin({ id, index }: { id: string, index: number}): void {
    this.indexParent = id;
    this.pinnedIndex = index;
  }

  saveChanges() {
    this.storiesService.saveStory({
      storyURL: this.pagesService.pageList[0].storyURL,
      changes: this.changes,
    });
    this.changes = [];
  }

  ngOnInit() {
    this.storiesService.getAllPages(this.storyId);
  }
}
