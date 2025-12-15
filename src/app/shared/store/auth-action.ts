import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { RegisterRequest } from "../services/auth-api";


export const authAction = createActionGroup({
    source: 'Auth',
    events: {
        login: props<{ username: string; password: string }>(),
        loginSuccsess: props<{ token: string }>(),
        loginFailure: props<{ error: any }>(),
        register: props<RegisterRequest>(),
        registerSuccess: emptyProps(),
        registerFailure: props<{ error: any }>()
    }
});