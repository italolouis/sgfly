import {PlanoContas} from "./plano-contas";

export class Despesa {
  id?: number;
  descricao: string = '';
  valor?: number;
  planoContas: PlanoContas = new PlanoContas();
  data?: Date;
  categoria: string = '';
  observacao: string = '';
  dataVencimento?: Date;
  pago: boolean = false;
}
