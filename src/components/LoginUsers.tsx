import React from "react";
import { ResponsiveForm } from "./index";
import { Form, Input } from "antd";


export const LoginUser: React.FC = () => {
  return (
    <ResponsiveForm
      buttonOptions={{
        title: "Login",
        type: "primary",
        htmlType: "button",
        text: "Registrar ingreso",
      }}
      onFinish={() => alert("Registered")}
    >
      <Form.Item
        label="Numero de documento"
        name="document"
        rules={[{ required: true, message: "Ingrese su numero de documento" }]}
      >
        <Input type="number" />
      </Form.Item>
    </ResponsiveForm>
  );
};
