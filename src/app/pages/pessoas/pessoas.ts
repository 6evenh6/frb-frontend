import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Pessoa, TipoPessoa } from 'app/models/pessoas.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  templateUrl: './pessoas.html',
  styleUrls: ['./pessoas.scss']
})
export class Pessoas implements OnInit {
  @ViewChild('modalDetalhes') modalDetalhes!: TemplateRef<any>;

  TipoPessoa = TipoPessoa;
  exibirFormulario = false;
  pessoaSelecionada: any = null;

  pessoas: any[] = [];
  displayedViagens: any[] = [];
  collectionSize = 0;
  page = 1;
  pageSize = 4;

  icones: string[] = [
    'bi-geo-alt-fill',
    'bi-calendar-check-fill',
    'bi-speedometer2',
    'bi-fuel-pump-fill',
    'bi-box-seam',
    'bi-map-fill'
  ];
  iconeAtual: string = this.icones[Math.floor(Math.random() * this.icones.length)];

  ngOnInit(): void {
    this.carregarPessoasIniciais();
  }

  carregarPessoasIniciais(): void {
    this.pessoas = [
      {
        id: 1,
        tipo: TipoPessoa.PessoaJuridica,
        nome: 'Transportadora SP-RJ',
        documento: '12.345.678/0001-00',
        inscricaoEstadual: '123456789',
        telefone: '(11) 1111-1111',
        celular: '(11) 99999-1111',
        email: 'contato@sprj.com.br',
        endereco: 'Rua A, 123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        nomeResponsavel: 'João da Silva',
        dataNascimentoOuFundacao: new Date('2005-01-15'),
        observacoes: 'Entrega rápida e segura.',
        origem: 'São Paulo - SP',
        destino: 'Rio de Janeiro - RJ',
        datasaida: '2025-07-10T08:00:00',
        datachegada: '2025-07-11T18:30:00',
        pessoaid: '1'
      },
      {
        id: 2,
        tipo: TipoPessoa.PessoaFisica,
        nome: 'Carlos Andrade',
        documento: '123.456.789-00',
        inscricaoEstadual: '',
        telefone: '(19) 2222-2222',
        celular: '(19) 98888-2222',
        email: 'carlos@email.com',
        endereco: 'Rua B, 456',
        bairro: 'Jardins',
        cidade: 'Campinas',
        estado: 'SP',
        cep: '13000-000',
        nomeResponsavel: '',
        dataNascimentoOuFundacao: new Date('1982-07-22'),
        observacoes: '',
        origem: 'Campinas - SP',
        destino: 'Belo Horizonte - MG',
        datasaida: '2025-07-09T07:30:00',
        datachegada: '2025-07-10T17:45:00',
        pessoaid: '2'
      },
      {
        id: 3,
        tipo: TipoPessoa.PessoaJuridica,
        nome: 'Sul Transportes Ltda',
        documento: '98.765.432/0001-99',
        inscricaoEstadual: '987654321',
        telefone: '(41) 3333-3333',
        celular: '(41) 97777-3333',
        email: 'contato@sultransportes.com.br',
        endereco: 'Av. Paraná, 789',
        bairro: 'Boa Vista',
        cidade: 'Curitiba',
        estado: 'PR',
        cep: '80000-000',
        nomeResponsavel: 'Ana Souza',
        dataNascimentoOuFundacao: new Date('2010-03-10'),
        observacoes: 'Empresa especializada em fretes para o sul.',
        origem: 'Curitiba - PR',
        destino: 'Porto Alegre - RS',
        datasaida: '2025-07-08T06:00:00',
        datachegada: '2025-07-09T15:20:00',
        pessoaid: '3'
      },
      {
        id: 4,
        tipo: TipoPessoa.PessoaFisica,
        nome: 'Marcos Lima',
        documento: '987.654.321-00',
        inscricaoEstadual: '',
        telefone: '(71) 4444-4444',
        celular: '(71) 96666-4444',
        email: 'marcos.lima@gmail.com',
        endereco: 'Rua das Flores, 321',
        bairro: 'Barra',
        cidade: 'Salvador',
        estado: 'BA',
        cep: '40000-000',
        nomeResponsavel: '',
        dataNascimentoOuFundacao: new Date('1990-11-03'),
        observacoes: 'Freelancer de transporte interestadual.',
        origem: 'Salvador - BA',
        destino: 'Recife - PE',
        datasaida: '2025-07-07T05:45:00',
        datachegada: '2025-07-07T22:10:00',
        pessoaid: '4'
      }
    ];
    this.collectionSize = this.pessoas.length;
    this.refreshPessoas();
  }

  refreshPessoas(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedViagens = this.pessoas.slice(start, end);
  }

  modelo = this.novoModelo();
  novoModelo(): Pessoa {
    return {
      tipo: TipoPessoa.PessoaJuridica,
      nome: '',
      documento: '',
      inscricaoEstadual: '',
      telefone: '',
      celular: '',
      email: '',
      endereco: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      nomeResponsavel: '',
      dataNascimentoOuFundacao: undefined,
      observacoes: ''
    };
  }

  abrirFormulario() {
    this.exibirFormulario = true;
    this.modelo = this.novoModelo();
  }

  cancelar() {
    this.exibirFormulario = false;
    this.modelo = this.novoModelo();
  }

  salvarPessoa(form: NgForm) {
    if (!form.valid) return;

    const novaPessoa = {
      ...this.modelo,
      id: this.pessoas.length > 0 ? Math.max(...this.pessoas.map(m => m.id)) + 1 : 1
    };

    this.pessoas.unshift(novaPessoa);
    this.collectionSize = this.pessoas.length;
    this.page = 1;
    this.refreshPessoas();
    this.cancelar();

    Swal.fire({
      icon: 'success',
      title: 'Pessoa cadastrada!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  abrirModalDetalhes(viagem: any): void {
    this.pessoaSelecionada = viagem;
    this.modalService.open(this.modalDetalhes, { size: 'lg', centered: true });
  }

  editarPessoa(viagem: any): void {
    this.modelo = { ...viagem };
    this.exibirFormulario = true;
  }

  excluirPessoa(id: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pessoas = this.pessoas.filter(m => m.id !== id);
        this.refreshPessoas();
        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  constructor(public modalService: NgbModal) { }
}
