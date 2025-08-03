export enum TipoUsuario {
  Administrador = 'Administrador',
  Operador = 'Operador'
}

export interface Usuario {
  id?: number;
  tipo: TipoUsuario;
  nome: string;
  email: string;
  telefone: string;
  dataCadastro: Date;
  ativo: boolean;
  observacoes: string;
}
