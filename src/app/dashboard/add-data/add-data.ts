import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '../../shared/store';
import {Backend} from '../../shared/backend';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-data',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckbox, MatSelectModule, MatButtonModule],
  templateUrl: './add-data.html',
  styleUrl: './add-data.scss',
})
export class AddData {
  public store = inject(Store);
  public backend = inject(Backend);
  private fb = inject(FormBuilder);
  public signupForm: any;
  public today: any;
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.today = new Date();

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      newsletter: [false],
      courseId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.backend.addRegistration(this.signupForm.value)
        .subscribe(() => this.snackBar.open('Anmeldung erfolgreich gespeichert', 'OK', {duration: 2500}))
        .add(() => {
          this.signupForm.reset();
          this.backend.getRegistrations();
        });
    }
  }
}
