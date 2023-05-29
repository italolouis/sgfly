import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  title = 'sgfly';
  status = false;

  constructor(
    private router: Router,
  ) {}
  addToggle() {
    this.status = !this.status;
  }

  logout(){
    localStorage.removeItem("acess");
    this.router.navigateByUrl('/')
  }
}
