import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CounterService } from '../counter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {



  counter: number = 0;
  backgroundColor: string = '';

  private sub: Subscription;

  constructor(private router: Router, private counterService: CounterService) {
    this.sub = this.counterService.counter$.subscribe(value => {
      this.counter = value;
      this.backgroundColor = this.counterService.getBackroundColor();
    })
  }

  ngOnInit() {}

  goToPage(page: string) {
    this.router.navigateByUrl(`/${page}`);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
