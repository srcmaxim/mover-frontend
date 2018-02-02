import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Component, OnInit} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth.component.html',
  styleUrls: []
})
export class AuthComponent implements OnInit {

  private credentials: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthService) {
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  onLogin() {
    const credentials = this.credentials.value;
    this.authenticationService.login(credentials)
      .first().subscribe(() => this.onClose());
  }

  onClose() {
    this.router.navigate([{outlets: {popup: null}}]);
  }
}
