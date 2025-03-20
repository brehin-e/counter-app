import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private _snackbar: MatSnackBar) { }

  public notify(
    type: string,
    message: string,
    action: string = '',
    duration?: number,
    position?: string
  ) {
    let options: any = {
      panelClass: [`snackbar-${type}`],
    };
    if (duration) {
      options['duration'] = duration;
    }
    if (position) {
      options['verticalPosition'] = position;
    }
    return this._snackbar.open(message, action, options);
  }
}
