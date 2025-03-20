import { Component } from '@angular/core';
import { CounterService } from '../counter.service';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-up',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './up.component.html',
  styleUrl: './up.component.scss'
})
export class UpComponent {

  private interval: any;
  step: number = 1;

  private sub: Subscription;

  constructor(private counterService: CounterService) {
    this.sub = this.counterService.step$.subscribe(value => {
      this.step = value;
    })
  }
  increment() {
    this.counterService.increment();
  }


  startIncrement() {
    this.increment();
    this.interval = setInterval(() => {
      this.increment();
    }, 200);
  }

  stopIncrement() {
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    this.stopIncrement();
    this.sub.unsubscribe();
  }
}
