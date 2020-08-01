import { AppRegex } from '@util/app-regex';
import { takeWhile } from 'rxjs/operators';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-boxes',
  templateUrl: './input-boxes.component.html',
  styleUrls: ['./input-boxes.component.scss'],
})
export class InputBoxesComponent implements OnInit {
isAlive = true;

  constructor( private formBuilder: FormBuilder) {}
  @Output() loginValues = new EventEmitter<any>();  //pass login values to parent component 
  loginForm: FormGroup; //form declaration

  ngOnInit() {
    this.createForm();  
    this.formValueChanges();
  }
  createForm():void
  {
    this.loginForm = this.formBuilder.group({  
      email: ['', [Validators.required, Validators.pattern(AppRegex.email)]], // check email validation
      password: ['', Validators.required],
    });
  }
formValueChanges():void {   //for detecting changes on form values
    this.loginForm.valueChanges
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((val) => {
        this.loginValues.emit({
          loginFormValues: this.loginForm.value,
          validation: this.loginForm.valid,
        });
      });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
