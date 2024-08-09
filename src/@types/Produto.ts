export interface Produto {
  proId: number;
  descricao: string;
  proMsg: string;
  fabricante: string;
  subGrupo: string;
  grupo: string;
  fabricanteId: number;
  grupoId: number;
  subGrupoId: number;
  estoque: number;
  descontoMaximo: number;
  un: string;
  tipoSped: string;
  valorCusto: number;
  valorVenda: number;
  priceDiscount?: number;
  desativado: boolean;
  aplicacao: string;
  tipo: string;
  codigoFab: string;
  prateleira: string;
  localizador: string;
  imagem: string;
  apresentacaoDav?: string;
  modeloAplicacao?: string;
  horaFinal?: string;
  horaInicial?: string;
  totalDesconto?: number;
  valorPromocao?: number;
  dataFinal?: string;
  dataInicial?: string;
}

export interface ProdutosResponse {
  docs: Produto[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
