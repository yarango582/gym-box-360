import React from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { IAffiliate } from "../../interfaces";
import { API_CONFIG } from "../../config/api.config";
import { IResponse } from "../../interfaces/api.interface";
import { ResponsiveForm } from "../common/Form";
import { toast } from "react-toast";

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

export const RegisterUser: React.FC = () => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinish = (values: IAffiliate) => {
    setIsLoading(true);
    const fechaIngreso = new Date(values.fechaIngreso);
    const fechaNacimiento = new Date(values.fechaNacimiento);

    const affiliate: IAffiliate = {
      ...values,
      fechaIngreso,
      fechaNacimiento,
    }

    const { method, url } = API_CONFIG.endpoints.setAffiliate;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(affiliate),
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
        title: "Register",
        type: "primary",
        htmlType: "submit",
        text: "Registrar afiliado",
      }}
      onFinish={onFinish}
      isLoading={isLoading}
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
        rules={[{ required: false, message: "Seleccione su género" }]}
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
          { required: false, message: "Seleccione su fecha de nacimiento", type: 'date' },
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
        rules={[{ required: false, message: "Seleccione su EPS" }]}
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
            required: false,
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
            required: false,
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
      <Form.Item
        label="Dias de Cortesía"
        name="diasDeCortesia"
      >
        <Select showSearch>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Sede de entrenamiento"
        name="sede"
        rules={[{ required: true, message: "Ingrese la sede a la que pertenece" }]}
      >
        <Select showSearch>
          <Option value="jamundi">Jamundi</Option>
          <Option value="pobladoCampestre">Poblado Campestre</Option>
          <Option value="casona">Casona</Option>
        </Select>
      </Form.Item>
    </ResponsiveForm>
  );
};
