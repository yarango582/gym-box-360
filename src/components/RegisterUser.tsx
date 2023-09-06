import React from "react";
import { ResponsiveForm } from "./index";
import { Form, Input, Select, DatePicker } from "antd";
import { IAffiliate } from "../interfaces";

const { Option } = Select;

const epsOptions = [
  "ALIANSALUD ENTIDAD PROMOTORA DE SALUD S.A.",
  "ASOCIACIÓN INDÍGENA DEL CAUCA",
  "ASOCIACION MUTUAL SER EMPRESA SOLIDARIA DE SALUD EPS",
  "CAPITAL SALUD",
  "COMFENALCO  VALLE  E.P.S.",
  "COMPENSAR   E.P.S.",
  "COOPERATIVA DE SALUD Y DESARROLLO INTEGRAL ZONA SUR ORIENTAL DE CARTAGENA",
  "E.P.S.  FAMISANAR LTDA.",
  "E.P.S.  SANITAS S.A.",
  "EPS  CONVIDA",
  "EPS SERVICIO OCCIDENTAL DE SALUD S.A.",
  "EPS Y MEDICINA PREPAGADA SURAMERICANA S.A",
  "FUNDACIÓN SALUD MIA EPS",
  "MALLAMAS",
  "NUEVA EPS S.A.",
  "SALUD TOTAL S.A.  E.P.S.",
  "SALUDVIDA S.A. E.P.S",
  "SAVIA SALUD EPS",
  "OTRA",
];

const horariosOptions = [
  "5 am - 6 am",
  "6 am - 7 am",
  "7 am - 8 am",
  "5 pm - 6 pm",
  "6 pm - 7 pm",
  "7 pm - 8 pm",
  "8 pm - 9 pm",
  "9 pm - 10 pm",
];

const resetForm = () => {
  window.location.reload();
}

const onFinish = (values: IAffiliate) => {

  const fechaIngreso = new Date(values.fechaIngreso);
  const fechaNacimiento = new Date(values.fechaNacimiento);

  const affiliate: IAffiliate = {
    ...values,
    fechaIngreso,
    fechaNacimiento,
  }

  const url = "http://localhost:3000/api/v1/affiliates";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(affiliate),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then(() => {
      alert("Afiliado registrado correctamente");
      resetForm();
    })
    .catch((error) => {
      console.error(error);
      alert("Error al registrar el afiliado");
    });

};

export const RegisterUser: React.FC = () => {
  return (
    <ResponsiveForm
      buttonOptions={{
        title: "Register",
        type: "primary",
        htmlType: "submit",
        text: "Registrar afiliado",
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Tipo de documento"
        name="tipoDocumento"
        rules={[{ required: true, message: "Ingrese su tipo de documento" }]}
      >
        <Select showSearch>
          <Option value="cedula">Cédula</Option>
          <Option value="cedulaExtranjeria">Cédula de extranjería</Option>
          <Option value="tarjetaIdentidad">Tarjeta de identidad</Option>
          <Option value="pasaporte">Pasaporte</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Numero de documento"
        name="numeroDocumento"
        rules={[{ required: true, message: "Ingrese su numero de documento" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Nombre Completo"
        name="nombreCompleto"
        rules={[{ required: true, message: "Ingrese su nombre completo" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Correo Electrónico"
        name="email"
        rules={[{ required: false, message: "Ingrese su correo electrónico" }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="Teléfono Celular/Wpp"
        name="celular"
        rules={[{ required: true, message: "Ingrese su teléfono celular" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Género"
        name="genero"
        rules={[{ required: true, message: "Seleccione su género" }]}
      >
        <Select showSearch>
          <Option value="male">Masculino</Option>
          <Option value="female">Femenino</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Fecha de Nacimiento"
        name="fechaNacimiento"
        rules={[
          { required: true, message: "Seleccione su fecha de nacimiento", type: 'date' },
        ]}
      >
        <DatePicker placeholder="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        label="Fecha de Ingreso"
        name="fechaIngreso"
        rules={[
          { required: true, message: "Seleccione su fecha de ingreso", type: 'date' },
        ]}
      >
        <DatePicker placeholder="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        label="EPS"
        name="eps"
        rules={[{ required: true, message: "Seleccione su EPS" }]}
      >
        <Select showSearch>
          {epsOptions.map((eps) => (
            <Option key={eps} value={eps}>
              {eps}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Dirección"
        name="direccion"
        rules={[{ required: false, message: "Ingrese su dirección" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Estatura"
        name="estatura"
        rules={[{ required: false, message: "Ingrese su estatura" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Peso"
        name="peso"
        rules={[{ required: false, message: "Ingrese su peso" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Contacto de Emergencia - Nombre"
        name="contactoEmergenciaNombre"
        rules={[
          {
            required: true,
            message: "Ingrese el nombre del contacto de emergencia",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Contacto de Emergencia - Teléfono"
        name="contactoEmergenciaCelular"
        rules={[
          {
            required: true,
            message: "Ingrese el teléfono del contacto de emergencia",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Horario elegido"
        name="horarioElegido"
        rules={[{ required: true, message: "Seleccione su horario" }]}
      >
        <Select showSearch>
          {horariosOptions.map((horario) => (
            <Option key={horario} value={horario}>
              {horario}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </ResponsiveForm>
  );
};
