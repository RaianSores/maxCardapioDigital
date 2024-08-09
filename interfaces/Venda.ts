import { VendaItem } from "./VendaItem";
export interface Venda {
  numMesa: string;
  operador: string;
  tipo: string;
  venda: {
    id: number;
    clienteId: number;
    tipo: string;
    atendente: string;
    status: string;
    abertura: string;
    cfop: number;
    cliNome: string;
    cpf: string;
    totalNf: number | null;
    msg: string;
    vlrTotalLiqProd: number;
    consumidorFinal: boolean;
    empId: string;
    itens: VendaItem[];
  };
}
