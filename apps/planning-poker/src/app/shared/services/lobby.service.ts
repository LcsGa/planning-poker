import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  public readonly ID_PATTERN = /^[\w\d]{10}$/;

  constructor(private readonly userService: UserService) {}
}
