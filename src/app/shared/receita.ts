import {PlanoContas} from "./plano-contas";

export class Receita {
  id?: number;
  descricao: string = '';
  valor?: number;
  planoContas?: PlanoContas;
  data?: Date;
  observacao: string = '';
  dataRecebimento?: Date;
  recebido: boolean = false;
}
