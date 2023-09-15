import React from "react";
import { ResponsiveForm } from "./index";
import { Form, Input } from "antd";
import { IAssistance } from "../interfaces/assistance.interface";
import { API_CONFIG } from "../config/api.config";
import { IResponse } from "../interfaces/api.interface";

export const LoginUser: React.FC = () => {
  const resetForm = () => {
    const documentField = document.getElementById("numeroDocumento");
    if (documentField) {
      (documentField as HTMLInputElement).value = "";
    }
  };

  const onFinish = (values: IAssistance) => {
    const today = new Date();
    const assistance: IAssistance = {
      ...values,
      fechaDeAsistencia: today,
    };

    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.setAssistance.url}`;

    const options = {
      method: API_CONFIG.endpoints.setAssistance.method,
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
          alert(response.message);
          resetForm();
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
