import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
      cpfCnpj: new FormControl(usuario.cpfCnpj, [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/) ], ),
      nome: new FormControl(usuario.nome, [Validators.required ]),
      login: new FormControl(usuario.login, [Validators.email, Validators.required ]),
      senha: new FormControl(usuario.senha, [Validators.required ]),
    });
  }

  onSubmit() {
    if (this.formUsuario.valid) {
      this.authService.cadastrarUsuario(this.formUsuario.value)
        .then((response) => {
          this.cancel();
        });
    }
  }
}
