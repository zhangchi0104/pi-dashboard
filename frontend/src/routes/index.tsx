import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
const Routes = () => {
  return (
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/settings">Settings</Route>
      <Route path="/">
        <Redirect to="/dashboard" />
      </Route>
    </Switch>
  );
};
export default Routes;
