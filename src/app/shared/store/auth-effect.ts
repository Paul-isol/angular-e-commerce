import { inject } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { AuthApi } from "../services/auth-api";
import { authAction } from "./auth-action";
import { switchMap, catchError, map, of } from "rxjs";
import { Router } from "@angular/router";



export const loginEffect = createEffect(
    (
        actions$=inject(Actions),
        authApi=inject(AuthApi),
        router=inject(Router)
    )=>{
    return actions$.pipe(
        ofType(authAction.login),
        switchMap((loginRequest)=> {
            return authApi.login(loginRequest).pipe(
                map((response)=>{
                    router.navigateByUrl('/products');
                    return authAction.loginSuccsess({ token: response.token });
                }),
                catchError((error)=>{
                    return of(authAction.loginFailure({ error: error.message }));
                })
            );
        })
    );
},
{
    functional: true
});
export const registerEffect = createEffect(
    (
        actions$=inject(Actions),
        authApi=inject(AuthApi),
        router=inject(Router)
    )=>{
    return actions$.pipe(
        ofType(authAction.register),
        switchMap((registerRequest)=> {
            return authApi.register(registerRequest).pipe(
                map((response)=>{
                    router.navigateByUrl('/login');
                    return authAction.registerSuccess();
                }),
                catchError((error)=>{
                    return of( authAction.registerFailure({ error: error.message }));
                })
            ); 
        })
    );
},
{
    functional: true
});