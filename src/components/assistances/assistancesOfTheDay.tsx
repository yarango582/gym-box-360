import { useEffect, useState } from "react";
import { toast } from "react-toast";
import { API_CONFIG } from "../../config/api.config";
import { IAffiliateSuscription } from "../../interfaces/affiliateSuscription.interface";
import { IAffiliate } from "../../interfaces/affiliates.interface";
import { IResponse } from "../../interfaces/api.interface";
import { IAssistance } from "../../interfaces/assistance.interface";
import moment from "moment";
import "./style.css";

interface IAssistancesWithAffiliate extends IAssistance {
  _doc: IAssistance;
  affiliate: IAffiliate;
  suscription: IAffiliateSuscription;
}

export const AssisteancesOfTheDay = () => {
  const [assistances, setAssistances] = useState<IAssistancesWithAffiliate[]>(
    []
  );

  const getAssistances = () => {
    const { method, url } = API_CONFIG.endpoints.getAssistances;
    const headers = {
      "Content-Type": "application/json",
    };
    fetch(url, {
      method,
      headers,
    })
      .then((response) => response.json())
      .then((response: IResponse) => {
        if (response.success) {
          const data = response.data as IAssistancesWithAffiliate[];
          const assistancesFiltered = filterAssistancesToday(data);
          setAssistances(assistancesFiltered);
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

  const filterAssistancesToday = (
    data: IAssistancesWithAffiliate[]
  ): IAssistancesWithAffiliate[] => {
    // filtramos todas las asistencias de hoy
    const today = moment(new Date()).format("YYYY-MM-DD");
    let todayAssistances;
    const assistancesFiltered = data.filter((assistance) => {
      todayAssistances = moment(assistance._doc.fechaDeAsistencia).format(
        "YYYY-MM-DD"
      );
      if (todayAssistances === today) {
        return true;
      }
      return false;
    });
    return assistancesFiltered;
  };

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
            {assistances.map((assistance, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {moment(assistance._doc.fechaDeAsistencia)
                    .subtract(5, "hour")
                    .toDate()
                    .toISOString()}
                </td>
                <td>{assistance.affiliate.numeroDocumento}</td>
                <td>{assistance.affiliate.nombreCompleto}</td>
                <td>{assistance.affiliate.celular}</td>
                <td>{assistance.suscription?.activo ? "SI" : "NO"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
