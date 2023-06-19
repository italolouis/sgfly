import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {PlanoContas} from "../../shared/plano-contas";

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
    localStorage.removeItem("access");
    this.router.navigateByUrl('/')
  }
}
