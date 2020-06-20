import { Component, Input } from '@angular/core';

export interface Form {
  title: string | null;
  from: string | null;
  to: string | null;
  owner: string | null;
  sortBy: string;
}

export interface Sort {
  label: string;
  value: string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass'],
})
export class FiltersComponent {
  isVisible = false;

  form: Form = {
    title: null,
    from: null,
    to: null,
    owner: null,
    sortBy: 'createdAt',
  };

  sortList: Sort[] = [
    { label: 'Title', value: 'title' },
    { label: 'Title Reverse', value: '-title' },
    { label: 'Author', value: 'owner' },
    { label: 'Author Reverse', value: '-owner' },
    { label: 'Date', value: 'createdAt' },
    { label: 'Date Reverse', value: '-createdAt' },
  ];

  handleSubmit() {}
}
