import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PropertyBagService {
  private _username = '';

  get username() {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
  constructor() {}
}
