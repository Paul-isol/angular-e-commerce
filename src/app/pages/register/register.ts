import { Component, signal } from '@angular/core';
import { email, Field, form, minLength, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { FormError } from '../../shared/components/form-error';

@Component({
  selector: 'app-register',
  imports: [RouterLink, Field, FormError],
  templateUrl: './register.html',
  styles: ``,
  host: {
    class:'flex min-h-screen items-center justify-center bg-slate-400'
  }
})
export class Register {
  registerModel = signal({
    username: '',
    email: '',
    password: ''
  });
  registerForm = form(this.registerModel, (rootpath) => {
    required(rootpath.username, {message: 'Username is required'});
    minLength(rootpath.username, 3, {message: 'Username must be at least 3 characters long'});
    validate(rootpath.username, (ctx) => {
    const username = ctx.value;
    // Whitelist approach: Only allows Alphanumeric (a-z, 0-9) and Underscores (_)
    const isValid = /^[a-zA-Z0-9_]+$/.test(username());
    
    if (!isValid) {
      return { kind: 'error', message: 'Username can only contain letters, numbers, and underscores' };
    }
    // implicitly returns undefined (valid) if true
    return;
  });
    required(rootpath.email, {message: 'Email is required'});
    email(rootpath.email, {message: 'Email is not valid'});
    required(rootpath.password, {message: 'Password is required'});
    minLength(rootpath.password, 6, {message: 'Password must be at least 6 characters long'});
  });
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm().valid()) {
      console.log('Registering user:', this.registerModel());
    } else {
      console.log('Form is invalid');
    }
  } 
}
