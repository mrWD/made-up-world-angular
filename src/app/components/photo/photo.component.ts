import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.sass'],
})
export class PhotoComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;
  @Input() width: string;

  private DEFAULT_IMG = 'assets/images/default-user.png';

  srcData = this.src;

  handleErr() {
    this.srcData = this.DEFAULT_IMG;
  }

  ngOnInit() {
    this.srcData = this.src;
  }
}
