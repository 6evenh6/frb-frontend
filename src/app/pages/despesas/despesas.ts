import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbPaginationModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import Swal from 'sweetalert2';
import { CreateDespesa } from '../../models/despesas.model'; // ajuste o caminho se necessário

@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, NgbPaginationModule],
  templateUrl: './despesas.html',
  styleUrls: ['./despesas.scss'],
  providers: [provideNgxMask()]
})
export class Despesas implements OnInit {
  modelo: CreateDespesa = this.novoModelo();
  despesaSelecionada: any;
  exibirFormulario = false;

  @ViewChild('modalDetalhes') modalDetalhes!: TemplateRef<any>;

  constructor(private modalService: NgbModal) {}

  // Animação do ícone
  iconeAtual: string = 'bi-cash-stack';
  iconesDespesa = ['bi-cash-stack', 'bi-wallet2', 'bi-receipt', 'bi-graph-down', 'bi-bag-dash'];

  ngOnInit(): void {
    this.despesas = [
      {
        id: 1,
        descricao: 'Troca de óleo',
        valor: 250.00,
        categoria: 'Manutencao',
        formaPagamento: 'Pix',
        statusPagamento: 'Pago',
        dataPagamento: new Date('2024-06-20'),
        dataVencimento: new Date('2024-06-19'),
        banco: 'Caixa',
        agencia: '1234',
        conta: '000111-2',
        chequeNumero: null,
        motoristaId: 1,
        caminhaoId: 2
      },
      {
        id: 2,
        descricao: 'Pedágio - Viagem SP',
        valor: 45.90,
        categoria: 'Pedagio',
        formaPagamento: 'Dinheiro',
        statusPagamento: 'Pendente',
        dataPagamento: null,
        dataVencimento: new Date('2024-06-23'),
        banco: '',
        agencia: '',
        conta: '',
        chequeNumero: '',
        motoristaId: 2,
        caminhaoId: 1
      }
    ];

    this.despesas = this.despesas.map((d, i) => ({ ...d, id: d.id ?? i + 1 }));
    this.refreshDespesas();
    this.trocarIconePeriodicamente();
  }

  trocarIconePeriodicamente(): void {
    setInterval(() => {
      const proximo = this.iconesDespesa[Math.floor(Math.random() * this.iconesDespesa.length)];
      this.iconeAtual = proximo;
    }, 3000);
  }

  categorias = [
    { nome: 'Combustível', valor: 'Combustivel' },
    { nome: 'Manutenção', valor: 'Manutencao' },
    { nome: 'Pedágio', valor: 'Pedagio' },
    { nome: 'Alimentação', valor: 'Alimentacao' },
    { nome: 'Outros', valor: 'Outros' }
  ];

  formasPagamento = [
    { nome: 'Dinheiro', valor: 'Dinheiro' },
    { nome: 'Pix', valor: 'Pix' },
    { nome: 'Cheque', valor: 'Cheque' },
    { nome: 'Transferência', valor: 'Transferencia' }
  ];

  statusPagamentoOptions = [
    { nome: 'Pago', valor: 'Pago' },
    { nome: 'Pendente', valor: 'Pendente' },
    { nome: 'Cheque a Compensar', valor: 'ChequeCompensar' }
  ];

  motoristas = [
    { id: 1, nome: 'João da Silva' },
    { id: 2, nome: 'Maria Oliveira' }
  ];

  caminhoes = [
    { id: 1, placa: 'ABC-1234' },
    { id: 2, placa: 'XYZ-5678' }
  ];

  novoModelo(): CreateDespesa {
    return {
      id: null as any,
      valor: null as any,
      descricao: '',
      categoria: null as any,
      formaPagamento: null as any,
      statusPagamento: null as any,
      dataPagamento: undefined,
      dataVencimento: undefined,
      banco: '',
      agencia: '',
      conta: '',
      chequeNumero: '',
      motoristaId: null as any,
      caminhaoId: null as any
    };
  }

  abrirFormulario(): void {
    this.exibirFormulario = true;
    this.modelo = this.novoModelo();
  }

  salvarDespesa(form: NgForm): void {
    if (!form.valid) return;

    Swal.fire({
      title: 'Confirmar cadastro?',
      text: 'Tem certeza de que deseja salvar esta despesa?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        const novaDespesa = { ...this.modelo, id: Date.now() };
        this.despesas.push(novaDespesa);
        this.refreshDespesas();
        form.resetForm();
        this.modelo = this.novoModelo();
        this.exibirFormulario = false;

        Swal.fire({
          title: 'Sucesso!',
          text: 'Despesa cadastrada com sucesso.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

  cancelar(): void {
    Swal.fire({
      title: 'Cancelar preenchimento?',
      text: 'Todos os dados informados serão descartados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, descartar',
      cancelButtonText: 'Voltar',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modelo = this.novoModelo();
        this.exibirFormulario = false;
      }
    });
  }

  editarDespesa(despesa: any): void {
    this.modelo = { ...despesa };
    this.exibirFormulario = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  abrirModalDetalhes(despesa: any): void {
    this.despesaSelecionada = despesa;
    this.modalService.open(this.modalDetalhes, { size: 'lg' });
  }

  excluirDespesa(id: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja excluir esta despesa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    }).then(result => {
      if (result.isConfirmed) {
        this.despesas = this.despesas.filter(d => d.id !== id);
        this.refreshDespesas();

        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: 'Despesa removida com sucesso.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

  despesas: any[] = [];
  displayedDespesas: any[] = [];
  collectionSize = 0;
  page = 1;
  pageSize = 4;

  refreshDespesas(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.collectionSize = this.despesas.length;
    this.displayedDespesas = this.despesas.slice(start, end);
  }

  getNomeCategoria(categoria: string): string {
    return this.categorias.find(c => c.valor === categoria)?.nome ?? '-';
  }

  getNomeFormaPagamento(forma: string): string {
    return this.formasPagamento.find(f => f.valor === forma)?.nome ?? '-';
  }

  getNomeStatusPagamento(status: string): string {
    return this.statusPagamentoOptions.find(s => s.valor === status)?.nome ?? '-';
  }

  getNomeMotorista(id: number | null | undefined): string {
    return this.motoristas.find(m => m.id === id)?.nome ?? '-';
  }

  getPlacaCaminhao(id: number | null | undefined): string {
    return this.caminhoes.find(c => c.id === id)?.placa ?? '-';
  }
}
