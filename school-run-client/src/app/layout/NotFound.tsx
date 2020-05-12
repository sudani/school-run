import React from 'react'
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Segment>
            <Header icon>
                <Icon name='search' />
                Oops, something went wrong, we couldn't find what you are looking for.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/driver' primary>
                    Return to Drivers page
                </Button>
            </Segment.Inline>
        </Segment>
    );
};

export default NotFound
