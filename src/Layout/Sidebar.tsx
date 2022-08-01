import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { examplesList } from '../examples/examplesList';
import { withRouter, RouteProps } from 'react-router';

const Sidebar = ({ location }: RouteProps) => {
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

export default withRouter(Sidebar);
