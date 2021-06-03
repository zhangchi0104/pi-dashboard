import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import DockerRoute from './Docker';
const Routes = () => {
  return (
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/docker">
        <DockerRoute />
      </Route>
      <Route path="/settings">Settings</Route>
      <Route path="/">
        <Redirect to="/dashboard" />
      </Route>
    </Switch>
  );
};
export default Routes;
