import { User } from './../../models/user';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$?: Observable<User | undefined>

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.authService.user
    console.log("oi")
  }


  logout() {
    this.authService.logout()
  }
}
