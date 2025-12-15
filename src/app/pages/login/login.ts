import { Component, inject, signal } from '@angular/core';
import { Field, form, minLength, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { FormError } from '../../shared/components/form-error';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { authFeatures } from '../../shared/store/auth-features';
import { authAction } from '../../shared/store/auth-action';

@Component({
  selector: 'app-login',
  imports: [RouterLink,Field, FormError],
  templateUrl: './login.html',
  host: {
    class:'flex min-h-screen items-center justify-center bg-slate-400'
  }
})
export class Login {
  private readonly store = inject(Store);
  protected readonly isloading = toSignal(this.store.select(authFeatures.selectIsLoading));

  loginModel = signal({
    username: '',
    password: ''
  });
  loginForm = form(this.loginModel, (rootpath) => {
    required(rootpath.username, {message: 'Username is required'});
    minLength(rootpath.username, 3, {message: 'Username must be at least 3 characters long'});
    required(rootpath.password, {message: 'Password is required'});
    minLength(rootpath.password, 6, {message: 'Password must be at least 6 characters long'});
  });
  onSubmit(event: Event) {
    event.preventDefault();
    console.log("clicked");
    if (this.loginForm().valid()) {
      this.store.dispatch(authAction.login(this.loginForm().value()));
      console.log('Form submitted', this.loginForm().value());
    } else {
      console.log('Form is invalid');
    }
  }
}
