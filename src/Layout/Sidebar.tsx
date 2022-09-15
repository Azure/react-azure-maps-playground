import React, { FC } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { examplesList } from '../examples/examplesList';
import { useLocation } from 'react-router';

const Sidebar: FC = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <List disablePadding dense>
        {examplesList.map((item) => (
          <ListItem
            selected={location && location.pathname === item.path}
            key={item.name}
            button
            component={Link}
            to={item.path}
          >
            <ListItemText>{item.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
