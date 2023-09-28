
import { useEffect, useState } from "react";
import { toast } from "react-toast";
import { API_CONFIG } from '../../config/api.config';
import { IAffiliate } from '../../interfaces/affiliates.interface';
import { IResponse } from "../../interfaces/api.interface";
import './style.css';
import { IAffiliateSuscription } from "../../interfaces/affiliateSuscription.interface";


interface NonAttendanceAffiliate extends IAffiliateSuscription {
    idAfiliado: IAffiliate;
}

export const NonAttendance = () => {


    const [nonAttendanceAffiliate, setNonAttendanceAffiliate] = useState<NonAttendanceAffiliate []>([]);

    const getNonAttendance = () => {
        const { method, url } = API_CONFIG.endpoints.nonAttendance;
        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((response: IResponse) => {
                if (response.success) {
                    const nonAttendance = response.data as NonAttendanceAffiliate[];
                    setNonAttendanceAffiliate(nonAttendance);
                } else {
                    toast.error(response.message);
                }
            })
            .catch((error) => {
                toast.error(error as string);
            });
    };

    useEffect(() => {
        getNonAttendance();
    }, []);

    return (
        <div className="container-table">
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Nombre Completo</th>
                            <th>WhatsApp</th>
                            <th>Suscripcion activa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            nonAttendanceAffiliate.map((affiliate, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{affiliate.idAfiliado.nombreCompleto}</td>
                                        <td>{affiliate.idAfiliado.celular}</td>
                                        <td>{affiliate.activo ? 'SI' : 'NO'}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};