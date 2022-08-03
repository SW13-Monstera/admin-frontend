import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface IMenuBarListElement {
  text: string;
  icon?: JSX.Element;
  url?: string;
}

export const MenuBarListElement = ({ text, icon, url = '/' }: IMenuBarListElement) =>
  url === '/' ? (
    <ListItemButton disabled={true}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : ''}
      <ListItemText primary={text} />
    </ListItemButton>
  ) : (
    <Link to={url}>
      <ListItemButton>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : ''}
        <ListItemText primary={text} />
      </ListItemButton>
    </Link>
  );
