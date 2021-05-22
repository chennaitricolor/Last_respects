import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import Progress from '../components/Progress';
import Header from '../components/Header';

const Login = lazy(() => import('../containers/LoginContainer'));

const SlotBookingContainer = lazy(() => import('../containers/SlotBookingContainer'));

const Routes = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<Progress />}>
        <header className="Site-header">{window.location.pathname !== '/' && <Header />}</header>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/slotBooking" component={SlotBookingContainer} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
