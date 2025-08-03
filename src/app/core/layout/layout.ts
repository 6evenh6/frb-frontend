// src/app/layout/layout.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para ngClass
import { RouterOutlet } from '@angular/router'; // Para o SEGUNDO <router-outlet>

// Importe seus componentes de layout (TopBar e SideBar)
import { TopbarComponent } from '../../shared/topbar/topbar'; // Ajuste o caminho
import { SidebarComponent } from '../../shared/sidebar/sidebar'; // Ajuste o caminho

@Component({
  selector: 'app-layout', // Este seletor será usado nas suas rotas
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopbarComponent,
    SidebarComponent
  ],
  templateUrl: './layout.html', // APONTA PARA O SEU layout.html
  styleUrls: ['./layout.scss'] // Ajuste o caminho/nome do seu SCSS para o layout
})
export class LayoutComponent {
  sidebarCollapsed: boolean = false; // Estado inicial da sidebar

  onToggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}