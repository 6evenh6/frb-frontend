export interface CreateReceitaModel {
  valorBruto: number;
  desconto?: number;
  acrescimos?: number;
  valorLiquido: number;
  descricao?: string;
  categoria: number;
  formaPagamento: number;
  statusPagamento: number;
  dataReceita: Date;
  dataVencimento?: Date;
  dataPagamento?: Date;
  pix?: string;
  motoristaId?: number;
  caminhaoId?: number;
  pessoaId?: number;
  observacoesInternas?: string;
  cheques: ChequeReceitaModel[];
}

export interface ChequeReceitaModel {
  numeroCheque: string;
  valor: number;
  dataCompensacao: string;
  compensado: boolean;
}
