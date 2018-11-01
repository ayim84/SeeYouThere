import './Nav.css';
import React from "react";
import { Card, Navbar } from 'react-materialize';


const Nav = () => (
    <Card className="small"

        header={<Navbar className="navBar" right></Navbar>}>
    <div className="text">See You There
        </div>
    </Card>

);

export default Nav;
