
export interface IAffiliate {
    _id?: string;
    tipoDocumento: string;
    numeroDocumento: number;
    nombreCompleto: string;
    email?: string;
    celular: number;
    fechaNacimiento: Date;
    fechaIngreso: Date;
    eps: string;
    direccion?: string;
    estatura?: number;
    peso?: number;
    contactoEmergenciaNombre: string;
    contactoEmergenciaCelular: number;
    horarioElegido: string;
    diasDeCortesia?: number;
    sede: string;
}