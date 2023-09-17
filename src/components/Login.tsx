import { Button, Form, Input } from 'antd';
import logo from '../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
import { API_CONFIG } from '../config/api.config';
import { IResponse } from '../interfaces/api.interface';

type FieldType = {
    numeroDocumento?: string;
    contrasena?: string;
};

export const Login = () => {

    const navigate = useNavigate();

    const onFinish = (user: FieldType) => {
        const { method, url } = API_CONFIG.endpoints.login;
        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                return response.json();
            })
            .then((response: IResponse) => {
                if (response.success) {
                    localStorage.setItem('isLogged', 'true');
                    navigate('/dashboard');
                } else {
                    alert(response.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "linear-gradient(to bottom right, #070A2E 30%, #059FFF 30%)"
        }}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '10px'
                }} >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'black',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                    }}>
                        <img src={logo} alt="logo" style={{ width: 90, padding: '1px 2px 0 0' }} />
                    </div>
                </div>
                <Form.Item<FieldType>
                    label="Documento"
                    name="numeroDocumento"
                    rules={[{ required: true, message: 'Please input your document!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Contraseña"
                    name="contrasena"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
