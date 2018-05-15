import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import InstructorMain from './components/instructors/InstructorMain';
import InstructorDetail from './components/instructors/InstructorDetail';
import InstructorCreate from './components/instructors/InstructorCreate';
import InstructorEdit from './components/instructors/InstructorEdit';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Home}>
        <IndexRoute component={InstructorMain} />
        <Route path="instructors/new" component={InstructorCreate} />
        <Route path="instructors/:id" component={InstructorDetail} />
        <Route path="instructors/:id/edit" component={InstructorEdit} />
      </Route>
    </Router>
  );
};

export default Routes;
