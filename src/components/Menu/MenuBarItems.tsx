import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';
import { URL } from '../../constants/url';
import { ListItemButton, ListItemIcon, ListItemText, List } from '@mui/material';
import { MenuBarListElement } from './MenuBarListElement';

export const MenuBarItems = () => {
  return (
    <>
      <MenuBarListElement text='문제 관리' />
      <List component='div' disablePadding>
        <MenuBarListElement text='서술형' icon={<BarChartIcon />} url={URL.LONG_PROBLEM_LIST} />
        <MenuBarListElement text='단답형' icon={<BarChartIcon />} />
        <MenuBarListElement text='객관식' icon={<BarChartIcon />} />
      </List>
      <MenuBarListElement text='AI 데이터 관리' />
      <List component='div' disablePadding>
        <MenuBarListElement text='라벨링' icon={<BarChartIcon />} url={URL.LABELING_DATA_LIST} />
        <MenuBarListElement text='검수' icon={<BarChartIcon />} url={URL.VALIDATING_DATA_LIST} />
        <MenuBarListElement text='완료' icon={<BarChartIcon />} url={URL.DONE_DATA_LIST} />
      </List>
    </>
  );
};
