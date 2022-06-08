import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  constructor(private readonly userService: UserService) {}
}
