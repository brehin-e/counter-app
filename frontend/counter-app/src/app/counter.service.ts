import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService, getLocalStorageName } from './api.service';
import { City } from './models/city';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private counter: number = 0;
  private step: number = 1;
  private actionCount = 0;

  private melunPostalCode = 0;

  private counterSubject = new BehaviorSubject<number>(this.counter);
  counter$ = this.counterSubject.asObservable();

  private stepSubject = new BehaviorSubject<number>(this.step);
  step$ = this.stepSubject.asObservable();

  constructor(private api: ApiService, private notify: NotifyService) {
    const saved = localStorage.getItem(getLocalStorageName('counter'));
    if (saved) {
      this.counter = parseInt(saved);
      this.updateCounter();
    }

    this.initPostalCode();

  }

  // Retrieve postal code from melun from backend
  private initPostalCode() {
    this.api.get('cities/search/Melun').subscribe({
      next: (value) => {
        if (!value) return;
        const melun = value.cities.find((e: City) => e.name == "Melun")
        if (melun) {
          this.melunPostalCode = parseInt(melun.postal_codes[0]);
        }
      },
      error: (err) => {
        this.notify.notify('error', err.error.message, '', 2000);
        console.log(err);
      },
    })
  }

  // Increment counter and propagate to components
  increment() {
    this.counter += this.step;
    this.updateCounter();
  }

  // Decrement counter and propagate to components
  decrement() {
    this.counter -= this.step;
    this.updateCounter();
  }

  // Reset counter
  reset() {
    this.counter = 0;
    this.step = 1;
    this.actionCount = 0;
    this.counterSubject.next(this.counter);
    this.stepSubject.next(this.step);
    this.saveToStorage();
  }

  private updateCounter() {
    this.actionCount++;

    // If actionCount multiple of 30, double the increment
    if (this.actionCount % 30 === 0) {
      this.step *= 2;
      this.stepSubject.next(this.step);
      this.initPostalCode(); // No real need but just in case Melun decides to change its postal code
    }

    // Here it could be either >= or == depending on how the instructions were understandable
    if (Math.abs(this.counter) == this.melunPostalCode) {
      this.notify.notify(
        'success',
        "Congratulations ! You reached the postal code of Melun !",
        '',
        2000
      );
      this.reset();
    }

    this.counterSubject.next(this.counter);
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem(getLocalStorageName('counter'), this.counter.toString());
  }

  getBackroundColor(): string {
    if (this.counter >= 10) return '#e74c3c';
    if (this.counter <= -10) return '#27ae60';
    return '';
  }

}
