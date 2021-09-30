import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
