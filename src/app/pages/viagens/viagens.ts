import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-motoristas',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  templateUrl: './viagens.html',
  styleUrls: ['./viagens.scss']
})
export class ViagensComponent implements OnInit {
  @ViewChild('modalDetalhes') modalDetalhes!: TemplateRef<any>;

  exibirFormulario = false;
  viagemSelecionada: any = null;

  modelo = this.novoModelo();

  viagens: any[] = [];
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
    this.carregarViagensIniciais();
  }

  carregarViagensIniciais(): void {
    this.viagens = [
      {
        id: 1,
        origem: 'São Paulo - SP',
        destino: 'Rio de Janeiro - RJ',
        datasaida: '2025-07-10T08:00:00',
        datachegada: '2025-07-11T18:30:00',
        pessoaid: '1'
      },
      {
        id: 2,
        origem: 'Campinas - SP',
        destino: 'Belo Horizonte - MG',
        datasaida: '2025-07-09T07:30:00',
        datachegada: '2025-07-10T17:45:00',
        pessoaid: '2'
      },
      {
        id: 3,
        origem: 'Curitiba - PR',
        destino: 'Porto Alegre - RS',
        datasaida: '2025-07-08T06:00:00',
        datachegada: '2025-07-09T15:20:00',
        pessoaid: '3'
      },
      {
        id: 4,
        origem: 'Salvador - BA',
        destino: 'Recife - PE',
        datasaida: '2025-07-07T05:45:00',
        datachegada: '2025-07-07T22:10:00',
        pessoaid: '4'
      }
    ];
    this.collectionSize = this.viagens.length;
    this.refreshViagens();
  }

  refreshViagens(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedViagens = this.viagens.slice(start, end);
  }

  novoModelo(): any {
    return {
      id: null,
      origem: '',
      destino: '',
      datasaida: '',
      datachegada: '',
      pessoaid: ''
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

  salvarViagem(form: NgForm) {
    if (!form.valid) return;

    const novoMotorista = {
      ...this.modelo,
      id: this.viagens.length > 0 ? Math.max(...this.viagens.map(m => m.id)) + 1 : 1
    };

    this.viagens.unshift(novoMotorista);
    this.collectionSize = this.viagens.length;
    this.page = 1;
    this.refreshViagens();
    this.cancelar();

    Swal.fire({
      icon: 'success',
      title: 'Viagem cadastrada!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  abrirModalDetalhes(viagem: any): void {
    this.viagemSelecionada = viagem;
    this.modalService.open(this.modalDetalhes, { size: 'lg', centered: true });
  }

  editarViagem(viagem: any): void {
    this.modelo = { ...viagem };
    this.exibirFormulario = true;
  }

  excluirViagem(id: number): void {
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
        this.viagens = this.viagens.filter(m => m.id !== id);
        this.refreshViagens();
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
