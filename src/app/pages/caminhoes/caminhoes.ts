import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-caminhoes',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  templateUrl: './caminhoes.html',
  styleUrls: ['./caminhoes.scss']
})
export class CaminhoesComponent {
  @ViewChild('modalDetalhes') modalDetalhes!: TemplateRef<any>;
  
  exibirFormulario = false;
  caminhaoSelecionado: any = null;

  modelo = this.novoModelo();

  caminhoes: any[] = [];
  displayedCaminhoes: any[] = [];
  collectionSize = 0;
  page = 1;
  pageSize = 4;

  icones: string[] = ['bi-truck', 'bi-person-badge', 'bi-steering-wheel', 'bi-car-front'];
  iconeAtual: string = this.icones[Math.floor(Math.random() * this.icones.length)];

  ngOnInit(): void {
    this.carregarCaminhoesIniciais();
}

carregarCaminhoesIniciais(): void {
    this.caminhoes = [
      {
        placa: 'AUZ-4A13',
        modelo: 'SCANIA',
        anoModelo: '2020',
        capacidadeCarga: '29000',
        cor: 'VERMELHA',
        chassi: '15159q1x526s5q12',
        numeroRegistro: '48477271852' 
      }
    ];
    this.collectionSize = this.caminhoes.length;
    this.refreshCaminhoes();
  }

  refreshCaminhoes(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedCaminhoes = this.caminhoes.slice(start, end);
  }

  novoModelo(): any {
    return {
      placa: null,
      modelo: '',
      anoModelo: '',
      capacidadeCarga: '',
      cor: '',
      chassi: '',
      numeroRegistro: ''      
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

  salvarCaminhao(form: NgForm) {
    if (!form.valid) return;

    const novoCaminhao = {
      ...this.modelo,
      id: this.caminhoes.length > 0 ? Math.max(...this.caminhoes.map(m => m.id)) + 1 : 1
    };

    this.caminhoes.unshift(novoCaminhao);
    this.collectionSize = this.caminhoes.length;
    this.page = 1;
    this.refreshCaminhoes();
    this.cancelar();

    Swal.fire({
      icon: 'success',
      title: 'Caminhão cadastrado!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  abrirModalDetalhes(caminhao: any): void {
    this.caminhaoSelecionado = caminhao;
    this.modalService.open(this.modalDetalhes, { size: 'lg', centered: true });
  }

  editarCaminhao(caminhao: any): void {
    this.modelo = { ...caminhao };
    this.exibirFormulario = true;
  }

  excluirCaminhao(id: number): void {
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
        this.caminhoes = this.caminhoes.filter(m => m.id !== id);
        this.refreshCaminhoes();
        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  constructor(public modalService: NgbModal) {}
}
