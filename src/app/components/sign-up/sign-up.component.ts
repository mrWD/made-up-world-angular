import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

export interface Form {
  file: File | string | null;
  login: string | null;
  password: string | null;
  passwordConfirm: string | null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
})
export class SignUpComponent {
  @Input() formType: 'signin' | 'signup' | '' = '';
  @Output() close = new EventEmitter();

  userImg: ArrayBuffer | string | null = null;

  form: Form = {
    file: null,
    login: null,
    password: null,
    passwordConfirm: null,
  };

  constructor(public authService: AuthService) {}

  setImage({ target }: ProgressEvent<FileReader>): void {
    this.userImg = target && target.result;
  };

  uploadFile({ target }: { target: HTMLInputElement }) {
    if (target.files && target.files[0]) {
      const reader = new FileReader();

      reader.onload = this.setImage;

      reader.readAsDataURL(target.files[0]);

      this.form.file = target.files[0];
    }
  };

  handleSubmit(value) {
    if (value === 'signup') {
      this.authService.signUp(this.form);
    }

    if (value === 'signin') {
      this.authService.signIn(this.form);
    }
  }
}
