import { PieChartOutlined, DesktopOutlined, LogoutOutlined, InteractionOutlined, CaretRightOutlined } from '@ant-design/icons';
import { ReactElement } from 'react';
import { Permissions } from '../../interfaces/permissions.enum';


export interface MenuOption {
  key: string;
  label: string;
  icon: ReactElement;
  permissions: string[];
  subMenuOptions?: MenuOption[];
}

export const subMenuOptions: MenuOption[] = [
  {
    key: 'sub-5',
    label: 'Asistencias del dia',
    icon: <PieChartOutlined />,
    permissions: [Permissions.all],
  },
]

export const menuOptions: MenuOption[] = [
  {
    key: '1',
    label: 'Registrar afiliados',
    icon: <PieChartOutlined />,
    permissions: [Permissions.all, Permissions.onSite],
  },
  {
    key: '2',
    label: 'Ingreso de afiliados',
    icon: <DesktopOutlined />,
    permissions: [Permissions.all, Permissions.onSite],
  },
  {
    key: '3',
    label: 'Activar suscripción',
    icon: <InteractionOutlined />,
    permissions: [Permissions.all, Permissions.onSite],
  },
  {
    key: '5',
    label: 'Asistencias',
    icon: <CaretRightOutlined />,
    permissions: [Permissions.all],
    subMenuOptions: subMenuOptions,
  },
  {
    key: '4',
    label: 'Cerrar sesión',
    icon: <LogoutOutlined />,
    permissions: [Permissions.all, Permissions.onSite],
  },
];
