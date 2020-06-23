import { Injectable } from '@angular/core';

const ERR_TIMEOUT = 5000;

@Injectable({
  providedIn: 'root',
})
export class RequestStatusService {
  isLoading = false;
  requestCount = 0;
  errors: string[] = [];

  updateRequestCount(isNewRequest = false) {
    if (isNewRequest) {
      this.requestCount += 1;
    } else {
      this.requestCount -= 1;
    }

    this.isLoading = this.requestCount > 0;
  }

  removeError(err) {
    this.errors = this.errors.filter((item) => item !== err);
  }

  addError(err) {
    const errorsSet = new Set(this.errors);

    errorsSet.add(err);

    this.errors = [...errorsSet];

    setTimeout(() => this.removeError(err), ERR_TIMEOUT);
  }
}
