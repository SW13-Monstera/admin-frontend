import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface IMenuBarListElement {
  icon: JSX.Element;
  text: string;
  url?: string;
}

export const MenuBarListElement = ({ icon, text, url = '/' }: IMenuBarListElement) =>
  url === '/' ? (
    <ListItemButton disabled={true}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  ) : (
    <Link to={url}>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </Link>
  );
