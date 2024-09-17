export interface ConfiguteService {
  Couvert: number;
  TaxaServico: number;
  TemContaMaxDigital: boolean;
}

export interface Corporation {
  empId: number;
  razaoSocial: string;
  fantasia: string;
  apelido: string;
  cnpj: string;
  logoRelatorio: string;
  logo: string;
  inscEstadual: string;
  fone: string;
  endereco: {
    cidade: string;
    referencia: string;
    uf: string;
    endereco: string;
    bairro: string;
    numeroEndereco: string;
    cep: string;
    ibge: number;
  };
}
