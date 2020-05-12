import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";




const NavBar: React.FC = () => {
 
  return (
    <Container>
      <Menu fixed="top" inverted>
        <Menu.Item name='Home' as={NavLink} exact to= '/'></Menu.Item>
        <Menu.Item name="Drivers" as={NavLink} to='/driver' />
        <Menu.Item >
          <Button as={NavLink} to='/createDriver' positive content="Create Driver" />
        </Menu.Item>

      </Menu>
    </Container>
  );
};

export default observer(NavBar);
