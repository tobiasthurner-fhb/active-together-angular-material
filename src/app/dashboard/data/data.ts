import {Component, inject} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Store} from '../../shared/store';
import {Backend} from '../../shared/backend';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-data',
  imports: [DatePipe, MatButton],
  templateUrl: './data.html',
  styleUrl: './data.scss',
})
export class Data {
  public store = inject(Store);
  public backend = inject(Backend);

  ngOnInit() {

  }

  public deleteRegistration(id: string) {
    this.backend.deleteRegistration(id);
  }
}
