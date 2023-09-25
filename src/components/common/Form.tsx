import React, { ReactNode, useState } from "react";
import { Form, Button, Row, Col } from "antd";

const { Item } = Form;

interface FormProps {
  onFinish: (values: any) => void;
  buttonOptions: {
    title: string;
    type?:
      | "link"
      | "text"
      | "ghost"
      | "default"
      | "primary"
      | "dashed"
      | undefined;
    htmlType?: "button" | "submit" | "reset" | undefined;
    text: string;
  };
  children?: ReactNode[] | ReactNode;
  isLoading?: boolean;
}

export const ResponsiveForm: React.FC<FormProps> = ({
  onFinish,
  buttonOptions,
  children,
  isLoading: loading = false,
}) => {
  const { title, htmlType, type, text } = buttonOptions;

  const formItems = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Item
  );

  const [form] = Form.useForm();


  const handleFinish = (values: any) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <Form onFinish={handleFinish} layout="vertical" form={form}>
      <Row gutter={16}>
        {formItems.map((FormItem, index) => (
          <Col key={index} xs={24} sm={24} md={24} lg={24}>
            {FormItem}
          </Col>
        ))}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item>
            <Button title={title} type={type} htmlType={htmlType} disabled={loading}>
            {loading ? "Cargando..." : text}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};