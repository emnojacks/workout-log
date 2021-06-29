import React from 'react';
import { useState } from 'react';

import {
    Nav,
    Collapse,
    Navbar,
    NavItem,
    NavbarBrand,
    NavbarToggler,
    Button
} from 'reactstrap';


const Sitebar = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }

    
    return (

        <Navbar
            color="faded"
            light expand='md'>
            <NavbarBrand
                href="/">
                Workout Log
            </NavbarBrand>
            <NavbarToggler onClick={toggle}>
                <Collapse isOpen={isOpen}>
                    <Nav className="ml-auto">
                        <NavItem>
                            <Button onClick={props.clickLogout}>Logout</Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </NavbarToggler>
        </Navbar>
    );
};

export default Sitebar;