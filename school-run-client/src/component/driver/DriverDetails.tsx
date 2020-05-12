import React, { useContext, useEffect } from 'react';

import { Card, Image, Button } from 'semantic-ui-react';
import Placeholder from '../../app/layout/assets/placeholder.png'
import DriverStore from '../../app/stores/driverStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';

interface DetailParams {
  id: string
}
const DriverDetails: React.FC<RouteComponentProps<DetailParams>>
  = ({ match, history }) => {
    const driverStore = useContext(DriverStore);
    const { driver,
      loadDriver, loadingInitial } = driverStore;

    useEffect(() => {
      loadDriver(match.params.id)
    }, [loadDriver, match.params.id, history])

    if (loadingInitial || !driver)
      return <LoadingComponent content='Loading driver....' />;
    if (!driver)
      return <h2>Driver Not :) Found</h2>
    return (
      <Card fluid>
        <Image src={Placeholder} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{driver.name}</Card.Header>
          <Card.Meta>
            <span >{driver.addres1}</span>
          </Card.Meta>
          <Card.Description>
            {driver.addres2}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2} >
            <Button as={Link} to={`/manage/${driver.id}`}
              basic color='blue' content='Edit' />
            <Button
              onClick={() => history.push('/driver')}
              basic color='grey' content='cancel' />
          </Button.Group>
        </Card.Content>
      </Card>
    );
  }

export default observer(DriverDetails);