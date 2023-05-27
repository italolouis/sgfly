import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;

  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(){
    this.authService.getToken(this.formLogin.value)
      .then(response => {
        let dataResponse = response.data
        if(dataResponse){
          const acess_token:any = JSON.stringify(dataResponse)
          localStorage.setItem("access", acess_token)
        }
        this.router.navigateByUrl('/')
      })
      .catch(error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      login: new FormControl('', [Validators.email, Validators.required ]),
      senha: new FormControl('', [Validators.required, Validators.min(3) ])
    });
  }


}
