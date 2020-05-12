import React from 'react'
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container style={{ marginTop: '6em' }}>
            <h1> Home Page</h1>
            <h3>Go to <Link to='/driver'>Drivers List</Link></h3>
        </Container>
    )
}

export default HomePage
