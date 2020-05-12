import React, {  Fragment } from "react";
import "./App.css";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import DriverDashboard from "../../component/driver/dashboard/DriverDashboard";
import { observer } from 'mobx-react-lite';
import { Switch,Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from "../../component/features/home/HomePage";
import NewDriverForm from "../../component/driver/NewDriverForm";
import DriverDetails from "../../component/driver/DriverDetails";
import NotFound from "./NotFound";
import { ToastContainer} from 'react-toastify';

const App: React.FC<RouteComponentProps> = ({ location }) => {


  return (
    <Fragment>
      <ToastContainer position='bottom-right'/>
    <Route exact path='/' component={HomePage} />
    <Route exact path={'/(.+)'}
     render= {() => (
      <Fragment>
      <NavBar />
      <Container style={{ marginTop: '6em' }}>
        <Switch>
        <Route exact path='/driver' component={DriverDashboard} />
        <Route path='/driver/:id' component={DriverDetails} />
        <Route key={location.key}
          path={['/createDriver', '/manage/:id']} component={NewDriverForm} />
      <Route component={NotFound}/>
        </Switch>
      
      </Container>
      </Fragment>
     )} />
      </Fragment>
   
  );
}
//withRouter make key and location avaliable to us
export default withRouter(observer(App));
