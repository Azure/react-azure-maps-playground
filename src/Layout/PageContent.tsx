import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { examplesList } from '../examples/examplesList';

const PageContent = () => {
  return (
    <div className="content-page">
      <Switch>
        {examplesList.map((item) => (
          <Route key={item.name} exact={item.exact} path={item.path}>
            <React.Fragment>
              <h1>{item.name}</h1>
              {<item.component />}
            </React.Fragment>
          </Route>
        ))}
      </Switch>
    </div>
  );
};

export default PageContent;
