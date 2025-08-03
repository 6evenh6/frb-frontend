export enum TipoPessoa {
  PessoaFisica = 1,
  PessoaJuridica = 2
}

export interface Pessoa {
  tipo: TipoPessoa;
  nome: string;
  documento: string;
  inscricaoEstadual?: string;
  telefone: string;
  celular: string;
  email: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  nomeResponsavel?: string;
  dataNascimentoOuFundacao?: Date;
  observacoes?: string;
}