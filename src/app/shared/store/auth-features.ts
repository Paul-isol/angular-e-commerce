import { createFeature, createReducer, on } from "@ngrx/store";
import { authAction } from "./auth-action";

export type AuthState = {
    token: string | null;
    userId: number | null;
    error: string | null;
    isLoading: boolean;
}
export const initialAuthState: AuthState = {
    token: null,
    userId: null,
    error: null,
    isLoading: false
}
export const authFeatures = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialAuthState,

        on(authAction.loginSuccsess, (state, { token, userId })=>({
            ...state,
            userId,
            token,
            isLoading: false,
        })),

        on(authAction.loginFailure, (state, { error })=>({
            ...state,
            token: null,
            error
        })),

        on(authAction.login, (state)=> ({
            ...state,
            isLoading: true,
            error: null
        })),

        on(authAction.register, (state)=> ({
            ...state,
            isLoading: true,
            error: null
        })),

        on( authAction.registerSuccess, (state)=> ({
            ...state,
            isLoading: false
        })),

        on( authAction.registerFailure, (state, { error })=> ({
            ...state,
            isLoading: false,
            error
        }))
    )
})