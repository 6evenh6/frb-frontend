export interface Receita {
  id: number;
  valorBruto: number;
  desconto?: number; // O '?' indica que é opcional
  acrescimos?: number; // O '?' indica que é opcional
  valorLiquido: number;
  descricao?: string;
  categoria: number;
  formaPagamento: number;
  statusPagamento: number;
  dataReceita: Date; // Usaremos Date no frontend
  dataVencimento?: Date;
  dataPagamento?: Date;
  pix?: string;
  cheques?: ChequeReceita[];
  motoristaId?: number;
  caminhaoId?: number;
  pessoaId?: number;
  dataRegistro: Date;
  observacoesInternas?: string;
}
export interface ChequeReceitaModel {
  numeroCheque: string;
  valor: number;
  dataCompensacao: string;
  compensado: boolean;
}
export interface ChequeReceita {
  id: number;
  numeroCheque: string;
  valor: number;
  dataCompensacao: string;
  compensado: boolean;
}
// Para suas listas de Categoria e Forma de Pagamento (enums ou lookups)
export interface LookupItem {
  valor: number;
  nome: string;
}