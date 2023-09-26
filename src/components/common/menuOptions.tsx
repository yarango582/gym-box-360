import { PieChartOutlined, DesktopOutlined, LogoutOutlined, InteractionOutlined } from '@ant-design/icons';
import { ReactElement } from 'react';
import { Permissions } from '../../interfaces/permissions.enum';

export interface MenuOption {
  key: string;
  label: string;
  icon: ReactElement;
  permissions: string[];
}

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
    key: '4',
    label: 'Cerrar sesión',
    icon: <LogoutOutlined />,
    permissions: [Permissions.all, Permissions.onSite],
  }
];
