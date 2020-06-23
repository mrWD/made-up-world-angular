import { Component } from '@angular/core';
import { RequestStatusService } from 'src/app/shared/requestStatus.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass'],
})
export class LoaderComponent {
  constructor(public requestStatusService: RequestStatusService) {}
}
