import { IProdutosAdditional, IProdutosOptions } from "./Produto";

export interface Venda {
  numMesa: string;
  operador: number;
  tipo: string;
  pediuConta?: number;
  venda: {
    id?: number;
    clienteId: number;
    tipo: string;
    atendente?: number;
    status?: string;
    abertura?: string;
    cfop?: number;
    cliNome: string;
    cpf: string;
    totalNf?: number;
    msg?: string;
    vlrTotalLiqProd?: number;
    consumidorFinal?: boolean;
    empId?: string;
    itens?: VendaItem[];
    pagamentos?: IFoodVendaPagamento[];
  };
}

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
  opcional: IProdutosOptions[];
  adicional: IProdutosAdditional[]; 
}

export interface IFoodVendaPagamento {
  valor?: number;
  formaPgto?: string;
  bandCartao?: string;
  qtdParcela?: number;
  obs?: string;
  dinheiroTroco?: number;
  posId?: number;
  posDescricao?: string;
  posSerial?: string;
  posCredenciadora?: string;
  posIDPagamento?: number;
  posMensagem?: string;
  posStatusPagamento?: string;
  posCodigoAutorizacao?: string;
  posBin?: string;
  posDonoCartao?: string;
  posDataExpiracao?: string;
  posInstituicaoFinanceira?: string;
  posParcelas?: number;
  posUltimosQuatroDigitos?: number;
  posCodigoPagamento?: string;
  posValorPagamento?: number;
  posIDFila?: number;
  posTipo?: string;
  posIdRespostaFiscal?: string;
  posNSU?: string;
  tefIdLocal?: number;
  tefAutLocal?: number;
  tefNSU?: string;
  pixTxId?: string;
  pixE2eId?: string;
}

export interface IRequestAccount {
  numero: number;
  tipo: string;
  atendente: number;
}

export interface IPix {
  empId: number;
  valor: number;  
  nome?: string;  
  cpf?: string; 
  idVenda: number;
};
