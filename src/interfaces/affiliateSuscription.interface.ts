
export interface IAffiliateSuscription {
    _idAfiliado?: string;
    fechaDePago: Date;
    medioDePago: string;
    activo: boolean;
    valorDePago: number;
    mesesPagados: number;
}