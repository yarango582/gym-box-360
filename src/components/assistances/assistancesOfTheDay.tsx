import { IAssistance } from "../../interfaces/assistance.interface";
import { IAffiliate } from '../../interfaces/affiliates.interface';
import { API_CONFIG } from '../../config/api.config';
import { IResponse } from "../../interfaces/api.interface";
import { useEffect, useState } from "react";
import moment from 'moment';
import { toast } from "react-toast";
import './style.css';

interface AssistancesOfTheDayProps {
    fechaDeAsistencia: string;
    numeroDocumento: string;
    nombreCompleto: string;
}

export const AssisteancesOfTheDay = () => {

    const [, setAssistances] = useState<IAssistance[]>([]);
    const [assitancesOfDay, setAssitancesOfDay] = useState<AssistancesOfTheDayProps[]>([]);


    useEffect(() => {
        const uniqueAssistances = new Set<string>();

        const getAffiliateByNumeroDocumento = (numeroDocumento: number) => {
            const { url, method } = API_CONFIG.endpoints.getAffiliateByNumeroDocumento;
            const newUrl = url.replace(':numeroDocumento', numeroDocumento.toString());
            const headers = {
                'Content-Type': 'application/json',
            };
            return fetch(newUrl, {
                method,
                headers,
            })
                .then((response) => response.json())
                .then((response: IResponse) => {
                    const affiliateData = response.data as IAffiliate;
                    return affiliateData;
                })
                .catch(() => {
                    toast.warn('No se pudo obtener el afiliado');
                });
        }
        const getAssistancesOfTheDay = () => {
            const { url, method } = API_CONFIG.endpoints.getAssistances;

            const headers = {
                'Content-Type': 'application/json',
            };

            fetch(url, {
                method,
                headers,
            })
                .then((response) => response.json())
                .then((response: IResponse) => {
                    const assistancesData = response.data as IAssistance[];
                    const today = new Date();
                    const todayString = moment(today).format('YYYY-MM-DD');
                    const assitancesOfTheDay = assistancesData.filter(async (assistance) => {
                        const assistanceDate = new Date(assistance.fechaDeAsistencia);
                        const assistanceDateString = moment(assistanceDate).format('YYYY-MM-DD');
                        if (assistanceDateString === todayString) {
                            const affiliate = await getAffiliateByNumeroDocumento(assistance.numeroDocumento);
                            const assistanceDateColombia = moment(
                                assistance.fechaDeAsistencia
                            ).utcOffset(-5).format('YYYY-MM-DD HH:mm:ss').toString();
                            if (affiliate === undefined) return;
                            const assistanceToAdd = {
                                fechaDeAsistencia: assistanceDateColombia,
                                numeroDocumento: assistance.numeroDocumento.toString(),
                                nombreCompleto: `${affiliate.nombreCompleto}`,
                            };
                            uniqueAssistances.add(JSON.stringify(assistanceToAdd));
                            setAssitancesOfDay([...uniqueAssistances].map((assistanceString) => JSON.parse(assistanceString) as AssistancesOfTheDayProps));
                            return assistance;
                        }
                    });
                    setAssistances(assitancesOfTheDay);
                })
                .catch(() => {
                    toast.warn('No se pudo obtener las asistencias');
                });
        }
        getAssistancesOfTheDay();

    }, []);

    return (
        <div className="container-table">
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Asistencias del día</th>
                            <th>Fecha de Ingreso</th>
                            <th>Numero de Documento</th>
                            <th>Nombre Completo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assitancesOfDay.map((assistance, index) => (
                                <tr key={index}>
                                    <td colSpan={3}> {index + 1} </td>
                                    <td>{assistance.fechaDeAsistencia}</td>
                                    <td>{assistance.numeroDocumento}</td>
                                    <td>{assistance.nombreCompleto}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};