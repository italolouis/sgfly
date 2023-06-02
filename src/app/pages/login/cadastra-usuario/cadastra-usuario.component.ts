import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Usuario} from "../../../shared/usuario";
import {UsuarioService} from "../../../service/usuario.service";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-cadastra-usuario.ts',
  templateUrl: './cadastra-usuario.component.html',
  styleUrls: ['./cadastra-usuario.component.scss']
})
export class CadastraUsuarioComponent implements OnInit{
  formUsuario!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CadastraUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private formBuilder: FormBuilder,
    private authService : AuthService,
  ) {}

  ngOnInit(): void {
    this.createForm(new Usuario());
  }
  cancel(): void {
    this.dialogRef.close();
  }

  createForm(usuario: Usuario) {
    this.formUsuario = this.formBuilder.group({
      cpfCnpj: usuario.cpfCnpj,
      nome: usuario.nome,
      login: usuario.login,
      senha: usuario.senha,
    });
  }

  onSubmit() {
    this.authService.cadastrarUsuario(this.formUsuario.value)
      .then((response) => {
        this.cancel();
      });
  }

}
