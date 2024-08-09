export interface VendaItem {
  vendaId: number;
  codProduto: number;
  cfop: number;
  qtde: number;
  valor: number;
  desconto: number | null;
  descricaoProd: string;
  valorTotal: number;
  status: string;
  un: string;
  opcional: any[]; // Adaptar conforme sua estrutura de opcionais
  adicional: any[]; // Adaptar conforme sua estrutura de adicionais
}
