import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons';
import { ReactElement } from 'react';

export interface MenuOption {
  key: string;
  label: string;
  icon: ReactElement;
}

export const menuOptions: MenuOption[] = [
  {
    key: '1',
    label: 'Registrar afiliados',
    icon: <PieChartOutlined />,
  },
  {
    key: '2',
    label: 'Ingreso de afiliados',
    icon: <DesktopOutlined />,
  },
];
