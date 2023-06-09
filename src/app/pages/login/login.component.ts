import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {CadastraDespesasComponent} from "../despesas/cadastra-despesas/cadastra-despesas.component";
import {MatDialog} from "@angular/material/dialog";
import {CadastraUsuarioComponent} from "./cadastra-usuario/cadastra-usuario.component";
import {ToastService} from "../../service/toast.service";

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
    private authService: AuthService,
    public dialog: MatDialog,
    private toastService:ToastService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      login: new FormControl('', [Validators.email, Validators.required ]),
      senha: new FormControl('', [Validators.required, Validators.min(3) ])
    });
  }

  onSubmit(){
    this.authService.getToken(this.formLogin.value)
      .then(response => {
        let dataResponse = response.data
        if(dataResponse){
          const acess_token:any = JSON.stringify(dataResponse)
          localStorage.setItem("access", acess_token)
        }
        this.router.navigateByUrl('/pages/dashboard')
      })
      .catch(error => {
        this.toastService.showErrorToast('Falha', error.message)
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CadastraUsuarioComponent, {
      width: '520px',
      height: '500px',
      data: {
        title: 'Cadastrar-se',
      },
    });
  }
}
