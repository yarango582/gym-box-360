import moment from 'moment';
import { useEffect, useState } from "react";
import { toast } from "react-toast";
import { API_CONFIG } from '../../config/api.config';
import { IAffiliateSuscription } from "../../interfaces/affiliateSuscription.interface";
import { IAffiliate } from '../../interfaces/affiliates.interface';
import { IResponse } from "../../interfaces/api.interface";
import { IAssistance } from "../../interfaces/assistance.interface";
import './style.css';


interface IAssistancesWithAffiliate extends IAssistance {
    affiliate: IAffiliate;
    suscription: IAffiliateSuscription;
}

export const AssisteancesOfTheDay = () => {


    const [assistancesToday, setAssistancesToday] = useState<IAssistancesWithAffiliate[]>([]);

    const getAssistances = () => {
        const { method, url } = API_CONFIG.endpoints.getAssistancesToday;
        const headers = {
            'Content-Type': 'application/json',
        }
        fetch(url, {
            method,
            headers
        })
            .then((response) => response.json())
            .then((response: IResponse) => {
                if (response.success) {
                    const assistances = response.data as IAssistancesWithAffiliate[];
                    setAssistancesToday(assistances);
                } else {
                    toast.error(response.message);
                }
            })
            .catch((error) => {
                toast.error(error as string);
            });
    };

    useEffect(() => {
        getAssistances();
    }, []);

    return (
        <div className="container-table">
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Asistencias del día</th>
                            <th>Fecha de Ingreso</th>
                            <th>Numero de Documento</th>
                            <th>Nombre Completo</th>
                            <th>WhatsApp</th>
                            <th>Suscription Activa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assistancesToday.map((assistance, index) => (
                                (
                                    <tr  key={index}>
                                        <td>{index + 1}</td>
                                        <td>{moment(assistance.fechaDeAsistencia).utcOffset(-5).format('YYYY-MM-DD:HH:mm:ss')}</td>
                                        <td>{assistance.affiliate.numeroDocumento}</td>
                                        <td>{assistance.affiliate.nombreCompleto}</td>
                                        <td>{assistance.affiliate.celular}</td>
                                        <td>{assistance.suscription?.activo ? 'SI': 'NO'}</td>
                                    </tr>
                                )
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};