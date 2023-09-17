import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { API_CONFIG } from "../config/api.config";
import { IResponse } from "../interfaces/api.interface";
import { ResponsiveForm } from "./common/Form";
import { IAffiliate } from "../interfaces";
import { IPayments } from "../interfaces/payments.interface";

export const RegisterPayment: React.FC = () => {

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

  const onFinish = (values: IPayments) => {
    const {method,  url } = API_CONFIG.endpoints.setPayments;
    const payment = {
      idAfiliado: affiliateSelect,
      fechaDePago: values.fechaDePago,
      medioDePago: values.medioDePago,
      valorDePago: values.valorDePago,
    };
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payment),
    }
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
      key="registerPayment"
      buttonOptions={{
        title: "Registrar Pago",
        type: "primary",
        htmlType: "submit",
        text: "Registrar Pago",
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
        label="Fecha de pago"
        name="fechaDePago"
        rules={[{ required: true, message: "Ingrese la fecha de pago" }]}
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
      <Form.Item
        label="Valor"
        name="valorDePago"
        rules={[{ required: true, message: "Ingrese el valor" }]}
      >
        <Input type="number" />
      </Form.Item>
    </ResponsiveForm>
  );
};
