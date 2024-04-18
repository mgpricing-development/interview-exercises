import { Redirect, Route, Switch } from "react-router-dom";
import ReportPage from "../pages/ReportPage";
import TaskPage from "../pages/TaskPage";

const Routes = ({}) => {
  return (
    <Switch>
      <Route path="/tasks" component={TaskPage} />
      <Route path="/reports" component={ReportPage} />
      <Redirect from="/" to="/reports" exact />
    </Switch>
  );
};

export default Routes;
