import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbPaginationModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective } from 'ngx-mask';
import Swal from 'sweetalert2';
import { MoedaHelper } from '../../helpers/moeda.helper';
import { Receita, LookupItem } from '../../models/receita.model';
import { CreateReceitaModel } from '../../models/CreateReceitaModel';

@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule, NgxMaskDirective],
  templateUrl: './receitas.html',
  styleUrls: ['./receitas.scss']
})
export class ReceitasComponent implements OnInit {
  exibirFormulario = false;

  @ViewChild('modalDetalhes', { static: true }) modalDetalhes!: TemplateRef<any>;
  receitaSelecionada: Receita | null = null;

  modelo: CreateReceitaModel = {
    valorBruto: null as any,
    valorLiquido: null as any,
    descricao: '',
    categoria: null as any,
    formaPagamento: null as any,
    statusPagamento: null as any,
    dataReceita: new Date(),
    desconto: null as any,
    acrescimos: null as any,
    dataVencimento: undefined,
    dataPagamento: undefined,
    pix: '',
    motoristaId: undefined,
    caminhaoId: undefined,
    pessoaId: undefined,
    observacoesInternas: '',
    cheques: []
  };

  receitas: Receita[] = [];
  displayedReceitas: Receita[] = [];

  collectionSize = 0;
  page = 1;
  pageSize = 4;

  categorias: LookupItem[] = [
    { valor: 0, nome: 'Frete' },
    { valor: 1, nome: 'Devolução' },
    { valor: 2, nome: 'Outros' }
  ];

  formasPagamento: LookupItem[] = [
    { valor: 0, nome: 'Dinheiro' },
    { valor: 1, nome: 'Pix' },
    { valor: 2, nome: 'Transferência' },
    { valor: 3, nome: 'Cheque' }
  ];

  statusPagamentoOptions: LookupItem[] = [
    { valor: 0, nome: 'Pendente' },
    { valor: 1, nome: 'Pago' },
    { valor: 2, nome: 'Cheque a Compensar' }
  ];

  // Icone animado
  iconeAtual: string = 'bi-coin';
  iconesReceita = ['bi-cash-stack', 'bi-coin', 'bi-wallet2', 'bi-piggy-bank', 'bi-graph-up'];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.carregarReceitasIniciais();
    this.trocarIconePeriodicamente();
  }

  trocarIconePeriodicamente(): void {
    setInterval(() => {
      const proximo = this.iconesReceita[Math.floor(Math.random() * this.iconesReceita.length)];
      this.iconeAtual = proximo;
    }, 3000);
  }

  carregarReceitasIniciais(): void {
    this.receitas = [
      {
        id: 1,
        descricao: 'Frete SP-RJ',
        valorBruto: 1500.00,
        valorLiquido: 1500.00,
        categoria: 0,
        formaPagamento: 1,
        statusPagamento: 1,
        dataReceita: new Date('2025-06-21'),
        dataPagamento: new Date('2025-06-22'),
        dataRegistro: new Date('2025-06-21')
      }
    ];
    this.collectionSize = this.receitas.length;
    this.refreshReceitas();
  }

  refreshReceitas(): void {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedReceitas = this.receitas.slice(startIndex, endIndex);
  }

  getNomeCategoria(valor: number): string {
    return this.categorias.find(c => c.valor === valor)?.nome ?? '';
  }

  getNomeFormaPagamento(valor: number): string {
    return this.formasPagamento.find(f => f.valor === valor)?.nome ?? '';
  }

  getNomeStatusPagamento(valor: number): string {
    return this.statusPagamentoOptions.find(s => s.valor === valor)?.nome ?? '';
  }

  abrirFormulario() {
    this.exibirFormulario = true;
  }

  cancelar() {
    this.exibirFormulario = false;
    this.modelo = {
      valorBruto: 0,
      valorLiquido: 0,
      descricao: '',
      categoria: null as any,
      formaPagamento: null as any,
      statusPagamento: 1,
      dataReceita: new Date(),
      desconto: 0,
      acrescimos: 0,
      dataVencimento: undefined,
      dataPagamento: undefined,
      pix: '',
      cheques: null as any,
      observacoesInternas: ''
    };
  }

  salvarReceita(formReceita: NgForm) {
    const valorBruto = MoedaHelper.paraNumero(this.modelo.valorBruto as any);
    const desconto = MoedaHelper.paraNumero(this.modelo.desconto as any);
    const acrescimos = MoedaHelper.paraNumero(this.modelo.acrescimos as any);

    this.modelo.valorLiquido = valorBruto - desconto + acrescimos;

    const novaReceitaAdicionada: Receita = {
      ...this.modelo,
      id: this.receitas.length > 0 ? Math.max(...this.receitas.map(r => r.id)) + 1 : 1,
      valorBruto,
      desconto,
      acrescimos,
      valorLiquido: this.modelo.valorLiquido,
      dataReceita: new Date(this.modelo.dataReceita),
      dataRegistro: new Date(),
      cheques: this.modelo.cheques.map((c, index) => ({
        ...c,
        id: index + 1 // Apenas para simulação local
      }))
    };

    this.receitas.unshift(novaReceitaAdicionada);
    this.collectionSize = this.receitas.length;
    this.page = 1;
    this.refreshReceitas();
    this.cancelar();
    alert('Receita adicionada com sucesso! (Localmente)');
  }

  abrirModalDetalhes(receita: Receita): void {
    this.receitaSelecionada = receita;
    this.modalService.open(this.modalDetalhes, { size: 'lg', centered: true });
  }

  editarReceita(receita: Receita): void {
    this.modelo = {
      ...receita,
      cheques: (receita.cheques ?? []).map(c => ({
        numeroCheque: c.numeroCheque,
        valor: c.valor,
        dataCompensacao: c.dataCompensacao,
        compensado: c.compensado
      }))
    };


    this.exibirFormulario = true;
  }
  adicionarCheque(): void {
    if (!this.modelo.cheques) {
      this.modelo.cheques = [];
    }

    this.modelo.cheques.push({
      numeroCheque: '',
      valor: 0,
      dataCompensacao: '',
      compensado: false
    });
  }
  removerCheque(index: number): void {
    if (this.modelo.cheques && index >= 0 && index < this.modelo.cheques.length) {
      this.modelo.cheques.splice(index, 1);
    }
  }

  isChequeInvalido(): boolean {
  if (!this.modelo.cheques || this.modelo.cheques.length === 0) return false;

  return this.modelo.cheques.some(c =>
    !c.numeroCheque || !c.valor || !c.dataCompensacao
  );
}

  excluirReceita(id: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.receitas = this.receitas.filter(r => r.id !== id);
        this.refreshReceitas();

        Swal.fire({
          title: 'Excluído!',
          text: 'A receita foi removida com sucesso.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
}
