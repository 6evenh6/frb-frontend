import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  resumo = {
    receitas: 25300,
    despesas: 14820,
    saldo: 10480,
    viagensPendentes: 6
  };

  graficoDados = [
    { categoria: 'Frete', valor: 12000 },
    { categoria: 'Entregas', valor: 8000 },
    { categoria: 'Outros', valor: 5300 }
  ];

  // Configurações para o gráfico de barras
  public barChartLabels = this.graficoDados.map(x => x.categoria);
  public barChartData = {
    labels: this.barChartLabels,
    datasets: [{
      data: this.graficoDados.map(x => x.valor),
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      label: 'Receitas por Categoria'
    }]
  };
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };
}
