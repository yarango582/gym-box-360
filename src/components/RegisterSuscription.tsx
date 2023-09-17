import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { API_CONFIG } from "../config/api.config";
import { IResponse } from "../interfaces/api.interface";
import { ResponsiveForm } from "./common/Form";
import { IAffiliate } from "../interfaces";
import { IAffiliateSuscription } from "../interfaces/affiliateSuscription.interface";

export const RegisterSuscription: React.FC = () => {

  const [affiliates, setAffiliates] = useState<IAffiliate[]>([]);
  const [affiliateSelect, setAffiliateSelect] = useState<string>("");

  const getAffiliates = () => {
    const { method, url } = API_CONFIG.endpoints.getAffiliates;
    fetch(url, { method })
      .then((response) => {
        return response.json();
      })
      .then((response: IResponse) => {
        if (response.success === true) {
          setAffiliates(response.data as IAffiliate[]);
        } else {
          alert(response.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  useEffect(() => {
    getAffiliates();
  }, []);


  const onFinish = (values: IAffiliateSuscription) => {
    const  {method, url} = API_CONFIG.endpoints.setAffiliatesSuscription;
    const [id] = affiliateSelect.split("-");
    const affiliateSuscription = {
      idAfiliado: id,
      fechaDePago: values.fechaDePago,
      medioDePago: values.medioDePago,
      activo: true,
    }
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(affiliateSuscription),
    };
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((response: IResponse) => {
        if (response.success) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ResponsiveForm
      buttonOptions={{
        title: "activateSuscription",
        type: "primary",
        htmlType: "submit",
        text: "Activar suscripcion",
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Seleccione un afiliado"
        name="afiliado"
        rules={[{ required: true, message: "Seleccione un afiliado" }]}
      >
        <Select showSearch onSelect={(value: string) => {
          const [id] = value.split("-");
          setAffiliateSelect(id);
        }}>
          {
            affiliates.map((affiliate: IAffiliate) => {
              return (
                <Select.Option key={affiliate._id} value={`${affiliate._id || ""}-${affiliate.nombreCompleto}`}>
                  {affiliate.nombreCompleto}
                </Select.Option>
              );
            })
          }
        </Select>

      </Form.Item>
      <Form.Item
        label="Fecha de Inicio"
        name="fechaDePago"
        rules={[{ required: true, message: "Ingrese la fecha de inicio" }]}
      >
        <Input type="date" />
      </Form.Item>
      <Form.Item
        label="Seleccione un medio de pago"
        name="medioDePago"
        rules={[{ required: true, message: "Seleccione un medio de pago" }]}
      >
        <Select showSearch>
          <Select.Option value="nequi">Nequi</Select.Option>
          <Select.Option value="bancolombia">Bancolombia</Select.Option>
          <Select.Option value="efectivo">Efectivo</Select.Option>
          <Select.Option value="otro">Otro</Select.Option>
        </Select>
      </Form.Item>
    </ResponsiveForm>
  );
};
