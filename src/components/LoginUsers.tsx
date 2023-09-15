import React from "react";
import { ResponsiveForm } from "./index";
import { Form, Input } from "antd";
import { IAssistance } from "../interfaces/assistance.interface";
import { API_CONFIG } from "../config/api.config";

export const LoginUser: React.FC = () => {

  const resetForm = () => {
    const documentField = document.getElementById("document");
    if (documentField) {
      (documentField as HTMLInputElement).value = "";
    }
  }

  const onFinish = (values: IAssistance) => {
    const today = new Date();
    const assistance: IAssistance = {
      ...values,
      fechaDeAsistencia: today,
    };

    const url = API_CONFIG.baseUrl + API_CONFIG.endpoints.setAssistance.url;
    const options = {
      method: API_CONFIG.endpoints.setAssistance.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assistance),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then(() => {
        alert("Afiliado ingreso correctamente");
        resetForm();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          `Error al ingresar el afiliado, revisa el documento, tambien recuerda que solo puedes registrar asistencia una vez al dia`
        );
      });
  };

  return (
    <ResponsiveForm
      buttonOptions={{
        title: "Login",
        type: "primary",
        htmlType: "button",
        text: "Registrar ingreso",
      }}
      onFinish={onFinish}
    >
      <Form.Item
        id="document"
        label="Numero de documento"
        name="document"
        rules={[{ required: true, message: "Ingrese su numero de documento" }]}
      >
        <Input type="number" />
      </Form.Item>
    </ResponsiveForm>
  );
};
