import {Component, inject} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Store} from '../../shared/store';
import {Backend} from '../../shared/backend';
import {MatButton} from '@angular/material/button';
import {finalize} from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-data',
  imports: [DatePipe, MatButton, MatProgressSpinner],
  templateUrl: './data.html',
  styleUrl: './data.scss',
})
export class Data {
  public store = inject(Store);
  public backend = inject(Backend);

  public pageSize = 5;
  public pageIndex = 0;

  ngOnInit() {

  }

  public deleteRegistration(id: string) {
    const registration = this.store.registrations.find(r => r.id === id);

    if (!registration || registration.isDeleting) {
      return;
    }

    registration.isDeleting = true;

    this.backend.deleteRegistration(id)
      .pipe(finalize(() => registration.isDeleting = false))
      .subscribe(() => {
        this.store.registrations = this.store.registrations.filter(r => r.id !== id);
        this.clampPageIndex();
        this.backend.getRegistrations()
      });
  }

  public get totalRegistrations() {
    return this.store.registrations.length;
  }

  public get totalPages() {
    return Math.ceil(this.totalRegistrations / this.pageSize) || 1;
  }

  public get currentPage() {
    return this.pageIndex + 1;
  }

  public get pagedRegistrations() {
    const start = this.pageIndex * this.pageSize;
    return this.store.registrations.slice(start, start + this.pageSize);
  }

  public get showPagination() {
    return this.totalRegistrations > this.pageSize;
  }

  public prevPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
  }

  public nextPage() {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
    }
  }

  public goToPage(pageNumber: number) {
    const idx = pageNumber - 1;

    if (idx >= 0 && idx < this.totalPages) {
      this.pageIndex = idx;
    }
  }

  private clampPageIndex() {
    const maxIndex = this.totalPages - 1;

    if (this.pageIndex > maxIndex) {
      this.pageIndex = maxIndex;
    }

    if (this.pageIndex < 0) {
      this.pageIndex = 0;
    }
  }
}
