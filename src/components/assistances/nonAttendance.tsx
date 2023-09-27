
import { useEffect, useState } from "react";
import { toast } from "react-toast";
import { API_CONFIG } from '../../config/api.config';
import { IAffiliate } from '../../interfaces/affiliates.interface';
import { IResponse } from "../../interfaces/api.interface";
import './style.css';
import { IAffiliateSuscription } from "../../interfaces/affiliateSuscription.interface";


interface NonAttendanceAffiliate {
    affiliate: {
        status: string;
        value: {
            _id: string;
            idAfiliado: IAffiliate;
        } & IAffiliateSuscription;
    }
}

export const NonAttendance = () => {


    const [nonAttendanceAffiliate, setNonAttendanceAffiliate] = useState<NonAttendanceAffiliate[]>([]);

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
                    const affiliatesNonAttendanceSet: Set<NonAttendanceAffiliate>  = new Set();
                    nonAttendance.forEach((nonAttendance) => {
                        // cumprueba que el objeto no este vacio
                        if (Object.keys(nonAttendance).length !== 0) {
                            affiliatesNonAttendanceSet.add(nonAttendance);
                        }
                    });
                    setNonAttendanceAffiliate(Array.from(affiliatesNonAttendanceSet));
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
                                        <td>{affiliate.affiliate.value.idAfiliado.nombreCompleto}</td>
                                        <td>{affiliate.affiliate.value.idAfiliado.celular}</td>
                                        <td>{affiliate.affiliate.value.activo ? 'SI' : 'NO'}</td>
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