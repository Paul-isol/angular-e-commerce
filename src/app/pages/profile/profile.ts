import { Component, inject } from '@angular/core';
import { LucideAngularModule, Heart, ShoppingCart, Wallet } from "lucide-angular";
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { profileActions } from './store/profile-action';
import { profileFeature } from './store/profile-feature';
import { authFeatures } from '../../shared/store/auth-features';
import { MyStorage } from '../../shared/services/storage';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule],
  templateUrl: './profile.html',
  styles: ``,
})
export class Profile {
  protected readonly icons = {Heart, ShoppingCart, Wallet};
  private readonly store = inject(Store);
  private readonly storage = inject(MyStorage);
  
  protected readonly profile = toSignal(this.store.select(profileFeature.selectProfile));
  protected readonly loading = toSignal(this.store.select(profileFeature.selectLoading));
  protected readonly userId = toSignal(this.store.select(authFeatures.selectUserId));

  ngOnInit(): void {
    const userId = this.userId() || this.storage.getUserId();
    if(userId){
      this.store.dispatch(profileActions.load({userId})); 
    }
  }
}
