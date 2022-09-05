import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Nav, Navbar, NavbarBrand, NavItem, NavLink
} from "reactstrap";

export default function TopBar(props) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isRegistered = localStorage.getItem("isRegistered");
  // console.log("...", isLoggedIn);

  return (
    <div>
      <Navbar expand="md">
        <NavbarBrand>Manage Income</NavbarBrand>
        <Nav className="mr-auto" navbar>
          {isLoggedIn &&
            <NavItem>
              <NavLink>{props.userName}</NavLink>
            </NavItem>
          }
          {isLoggedIn && 
            <NavItem>
              <NavLink href="/logout">Logout</NavLink>
            </NavItem>
          }
          {!isLoggedIn && 
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
          }
          {!isRegistered &&
            <NavItem>
              <NavLink href="/register">Register</NavLink>
            </NavItem>
          }
        </Nav>
      </Navbar>
    </div>
  );
}
