import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import DriverList from '../DriverList';
import { observer } from 'mobx-react-lite';
import  DriverStore  from '../../../app/stores/driverStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const DriverDashboard: React.FC = () => {
    const driverStore = useContext(DriverStore);


    useEffect(() => {
      driverStore.loadDrivers();
    }, [driverStore]);
  
    if (driverStore.loadingInitial) return <LoadingComponent content='Loading drivers' />
    
    return (
        <Grid>
            <Grid.Column width={10}>
                <DriverList/>
            </Grid.Column>
            <Grid.Column width={6}>
            <h2>Activity filtering</h2>
            </Grid.Column>
        </Grid>
    )
};

export default observer(DriverDashboard);
