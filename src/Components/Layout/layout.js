import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import classes from "./layout.module.css";

class Layout extends Component
{

    render()
    {
        return (
            <Container fluid>
                <Row>
                    <div className={classes.topbar + '  d-flex justify-content-center align-items-center text-white'}>
                        User Management System
                    </div>
                </Row>
                <Row className="d-flex justify-content-center p-5">
                    {this.props.children}
                </Row>

            </Container>
        );
    }
}

export default Layout;