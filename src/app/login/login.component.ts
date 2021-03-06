import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public modalService: NgbActiveModal) { }

  user = {remember: false , username: '' , password: '' };
  ngOnInit() {
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.modalService.close();
  }

}
