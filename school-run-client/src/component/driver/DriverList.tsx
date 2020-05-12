import React, {  useContext } from "react";
import { Item, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import DriverStore from '../../app/stores/driverStore';
import {Link} from 'react-router-dom';



const DriverList: React.FC = () => {
         
const driverStore = useContext(DriverStore);
const {drivers,submitting,deleteDriver,target} = driverStore;
    return (
        <Segment clearing>


            <Item.Group divided>
                {drivers.map(driver => (
                    <Item key={driver.id}>
                        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />

                        <Item.Content>
                            <Item.Header as='a'>{driver.name}</Item.Header>
                            <Item.Meta>{driver.addres1}</Item.Meta>
                            <Item.Description>
                                <div>{driver.addres2}</div>
                                <div>{driver.telphone}</div>
                                <div>{driver.city}</div>
                                <div>{driver.postCode}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button 
                                as={Link} to={`/driver/${driver.id}`}
                                floated='right' content='view'
                                    color='blue' />
                                    <Button name={driver.id}
                                    loading={target === driver.id && submitting }
                                onClick={(e) => deleteDriver(e,driver.id)}
                                floated='right' content='delete'
                                    color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>

                ))}


            </Item.Group>
        </Segment>
    );
};

export default observer(DriverList);