import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import Progress from '../components/Progress';

const Login = lazy(() => import('../containers/LoginContainer'));

const SlotBookingContainer = lazy(() => import('../containers/SlotBookingContainer'));
const MachineryManagementContainer = lazy(() => import('../containers/MachineryManagementContainer'));
const ReportDashboard = lazy(() => import('../components/ReportEmbedComponent'));

const Routes = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<Progress />}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/slotBooking" component={SlotBookingContainer} />
          <Route exact path="/machinery" component={MachineryManagementContainer} />
          <Route exact path="/dashboard" component={ReportDashboard} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
