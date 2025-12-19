import { inject, Injectable } from "@angular/core";
import { API_URL } from "../../../app.config";
import { HttpClient } from "@angular/common/http";
import { UserProfile } from "../types/profile.type";


@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private readonly baseApiUrl = inject(API_URL);
    private readonly http = inject(HttpClient);

    getuserProfile(userId: number){
        return this.http.get<UserProfile>(`${this.baseApiUrl}/users/${userId}`);
    }
}