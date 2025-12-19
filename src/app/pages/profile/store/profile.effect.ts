import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../services/profile.service';
import { profileActions } from './profile-action';
import { catchError, map, of, switchMap } from 'rxjs';

export const profileEffcts = createEffect(
  (action$ = inject(Actions), profileApi = inject(ProfileService)) => {
    return action$.pipe(
      ofType(profileActions.load),
      switchMap(({ userId }) => {
        return profileApi.getuserProfile(userId).pipe(
          map((profile) => profileActions.loadSuccess({ profile })),
          catchError((error) => of(profileActions.loadFailure({ error: error.message })))
        );
      })
    );
  },
  { functional: true }
);
