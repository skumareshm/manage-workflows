// src/routes.js
import React from 'react';
import { Router, Route, Redirect } from 'react-router';

import App from './App';
import Workflow from './Workflow';
import './index.css';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/:workflowId" component={Workflow} />
    <Redirect from='*' to='/' />
  </Router>
);

export default Routes;