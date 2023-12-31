import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { API_CONFIG } from "../../config/api.config";
import { IResponse } from "../../interfaces/api.interface";
import { ResponsiveForm } from "../common/Form";
import { IAffiliate } from "../../interfaces";
import { IAffiliateSuscription } from "../../interfaces/affiliateSuscription.interface";
import { toast } from "react-toast";

export const RegisterSuscription: React.FC = () => {

  const [affiliates, setAffiliates] = useState<IAffiliate[]>([]);
  const [affiliateSelect, setAffiliateSelect] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
          toast.warn(response.message);
        }
      })
      .catch((error) => {
        toast.warn(error as string);
      });
  }

  useEffect(() => {
    const getAffiliateSuscription = () => {
      const { method, url } = API_CONFIG.endpoints.getAffiliatesSuscription;
      const urlWithParams = url.replace(":id", affiliateSelect);

      fetch(urlWithParams, { method })
        .then((response) => {
          return response.json();
        }
        )
        .then((response: IResponse) => {
          if (response.success === true) {
            const affiliateSuscription = response.data as IAffiliateSuscription;
            const dateFormated = new Date(affiliateSuscription.fechaDePago).toISOString().split("T")[0];
            toast.info(`Tienes una suscripcion activa desde el ${dateFormated.toString()}`);
          } else {
            toast.warn(response.message);
          }
        })
        .catch((error) => {
          toast.warn(error as string);
        });

    }
    if (affiliateSelect) {
      getAffiliateSuscription();
    }
  }, [affiliateSelect]);

  useEffect(() => {
    getAffiliates();
  }, []);


  const onFinish = (values: IAffiliateSuscription) => {
    setIsLoading(true);
    const { method, url } = API_CONFIG.endpoints.setAffiliatesSuscription;
    const [id] = affiliateSelect.split("-");
    const affiliateSuscription = {
      idAfiliado: id,
      fechaDePago: values.fechaDePago,
      medioDePago: values.medioDePago,
      activo: true,
      valorDePago: values.valorDePago,
      mesesPagados: values.mesesPagados,
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
          toast.info(response.message);
          setIsLoading(false);
        } else {
          toast.warn(response.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast.error(String(error));
        setIsLoading(false);
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
      isLoading={isLoading}
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
                  {affiliate.numeroDocumento}-{affiliate.nombreCompleto}
                </Select.Option>
              );
            })
          }
        </Select>

      </Form.Item>
      <Form.Item
        label="Fecha de inicio"
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
      <Form.Item
        label="Valor"
        name="valorDePago"
        rules={[{ required: true, message: "Ingrese el valor" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Cantidad de meses pagados"
        name="mesesPagados"
        rules={[{ required: true, message: "Ingrese el valor" }]}
      >
        <Input type="number" />
      </Form.Item>
    </ResponsiveForm>
  );
};
