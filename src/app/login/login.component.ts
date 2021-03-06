import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /** Currently authenticating */
  public authenticating = true;

  constructor(
    public activatedRoute: ActivatedRoute,
    public dataService: DataService,
    public router: Router,
  ) { }

  ngOnInit() {
    if (this.dataService.loggedIn) {
      this.router.navigate(['feed']);
      return;
    }

    const params = this.activatedRoute.snapshot.queryParams;
    if (params.hasOwnProperty('code')) {
      const auth_code = params['code'];
      this.dataService.AuthenticateSSO(auth_code).subscribe(() => {
        this.dataService.GetFillCurrentUser().subscribe(user => {
          this.router.navigate(['feed']);
        });
      });
    } else {
      this.authenticating = false;
    }
  }

  /** Open a new tab for SSO login */
  login() {
    window.location.href = this.dataService.GetLoginURL();
  }

  /** Continue as guest */
  guest() {
    this.router.navigate(['feed']);
  }

}
