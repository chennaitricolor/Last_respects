import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom';
import Progress from './components/Progress';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import './index.css';

const App = lazy(() => import('./App'))

const Routes = () => {
    return (
        <Router>
            <Suspense fallback={<Progress />}>
                <Switch>
                    <Route path='/' component={App} />
                </Switch>
            </Suspense>
        </Router>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Routes />
    </React.StrictMode>,
    document.getElementById('root'),
);
