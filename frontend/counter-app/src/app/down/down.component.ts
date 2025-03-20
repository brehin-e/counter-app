import { Component } from '@angular/core';
import { CounterService } from '../counter.service';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-down',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './down.component.html',
  styleUrl: './down.component.scss',
})
export class DownComponent {

  step: number = 1;

  private interval: any;
  private sub: Subscription;

  constructor(private counterService: CounterService) {
    this.sub = this.counterService.step$.subscribe(value => {
      this.step = value;
    })
  }

  decrement() {
    this.counterService.decrement();
  }

  startDecrement() {
    this.decrement();
    this.interval = setInterval(() => {
      this.decrement();
    }, 200);
  }

  stopDecrement() {
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    this.stopDecrement();
    this.sub.unsubscribe();
  }
}
