import { Component, OnInit, Output } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

import { Comment } from '../shared/Comment';

@Component({
  selector: 'app-ngbd-rating-basic',
  templateUrl: './ngbd-rating-basic.component.html',
  styleUrls: ['./ngbd-rating-basic.component.scss']
})
export class NgbdRatingBasicComponent implements OnInit {
  comment: Comment;
  date: number;
  currentRate = 0;
  DishCommentForm: FormGroup;
  formErrors = {
    'Name': '',
    'Comment': '',
  };

  validationMessages = {
    'Name': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'Comment': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
  };

  config2: NgbRatingConfig;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCreation = new EventEmitter();

  constructor(config: NgbRatingConfig , private fb: FormBuilder ) {
    config.max = 5;
    this.DishCommentForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      Comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      Stars: ['', Validators.required]
    });
    this.DishCommentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();  // reset the data 
   }

   onValueChanged(data?: any) {
    if (!this.DishCommentForm) { return; }
    const form = this.DishCommentForm;
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


  onSubmit() {
    this.comment = {
      author : this.DishCommentForm.value.Name,
      comment : this.DishCommentForm.value.Comment,
      rating : this.DishCommentForm.value.Stars,
      date : Date.now().toString()
    };
    this.onCreation.emit(this.comment);
    this.DishCommentForm.reset({
      Name: '',
      Comment: '',
      Stars: ''
    });
  }
  ngOnInit() {
  }

}
