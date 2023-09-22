import React from "react";
import { Form, Input } from "antd";
import { IAssistance } from "../interfaces/assistance.interface";
import { API_CONFIG } from "../config/api.config";
import { IResponse } from "../interfaces/api.interface";
import { ResponsiveForm } from "./common/Form";
import { toast } from "react-toast";

export const RegisterAssistance: React.FC = () => {


  const onFinish = (values: IAssistance) => {
    const today = new Date();
    const assistance: IAssistance = {
      ...values,
      fechaDeAsistencia: today,
    };

    const { method, url } = API_CONFIG.endpoints.setAssistance;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assistance),
    };

    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((response: IResponse) => {
        if (response.success === true) {
          toast.info(response.message);
        } else {
          toast.warn(response.message);
        }
      })
      .catch((error: any) => {
        toast.error(String(error));
      });
  };

  return (
    <ResponsiveForm
      buttonOptions={{
        title: "Login",
        type: "primary",
        htmlType: "submit",
        text: "Registrar ingreso",
      }}
      onFinish={onFinish}
    >
      <Form.Item
        id="document"
        label="Numero de documento"
        name="numeroDocumento"
        rules={[{ required: true, message: "Ingrese su numero de documento" }]}
      >
        <Input type="number" />
      </Form.Item>
    </ResponsiveForm>
  );
};
