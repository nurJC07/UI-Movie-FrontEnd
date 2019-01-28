
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
 

class Header extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        }  
      }
      toggle() {
          this.setState({
              isOpen: !this.state.isOpen
          })
      }
    render (){
       return ( 
        <div>
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
        <NavItem>
        <Link to ='/ManageMovie'><NavLink> Manage Movies </NavLink></Link>
        </NavItem>
        <NavItem>
        <Link to="/ManageCategory"><NavLink>Manage Categories </NavLink></Link>
        </NavItem>
        <NavItem>
        <Link to="/Connection"><NavLink> Connect Movie & Category </NavLink></Link>
        </NavItem>
        </Nav>
        </Collapse>
        </Navbar>
    </div>
        );
      
}}


export default Header;
