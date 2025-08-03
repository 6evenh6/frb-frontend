export interface CreateDespesa {
id: number;
valor: number;
descricao?: string;
categoria: string;
formaPagamento: string;
statusPagamento: string;
dataVencimento?: Date;
dataPagamento?: Date;
banco?: string;
agencia?: string;
conta?: string;
chequeNumero?: string;
motoristaId?: number;
caminhaoId?: number;
}
