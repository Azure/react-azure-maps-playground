import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { examplesList } from '../examples/examplesList';

const PageContent = () => {
  return (
    <div className="content-page">
      <Routes>
        {examplesList.map((item) => (
          <Route
            key={item.name}
            path={item.path}
            element={
              <>
                <h1>{item.name}</h1>
                {<item.component />}
              </>
            }
          ></Route>
        ))}
      </Routes>
    </div>
  );
};

export default PageContent;
