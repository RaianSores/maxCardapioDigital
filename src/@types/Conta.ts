export interface Conta {
  Id: number;
  codProduto: number;
  vendaId: number;
  qtde: number;
  descricaoProd: string;
  valorTotal: number;
  desconto: number;
  vlrOutrasDesp: number;
  valorLiquido: number;
  cancelado: string; // De acordo com a API, pode ser "True" ou "False"
  infAdicional: string;
  relacaoVdi: number;
  imagem: string;
}
