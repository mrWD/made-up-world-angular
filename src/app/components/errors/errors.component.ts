import { Component } from '@angular/core';
import { RequestStatusService } from 'src/app/shared/requestStatus.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.sass'],
})
export class ErrorsComponent {
  constructor(public requestStatusService: RequestStatusService) {}
}
