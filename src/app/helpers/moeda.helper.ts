export class MoedaHelper {
  /**
   * Converte uma string com formato monetário brasileiro (ex: "1.234,56")
   * para número decimal (ex: 1234.56).
   */
  static paraNumero(valor: string | null | undefined): number {
    if (!valor) return 0;
    return parseFloat(
      valor
        .replace(/\./g, '')    // Remove pontos (milhar)
        .replace(',', '.')     // Converte vírgula decimal para ponto
    ) || 0;
  }
}