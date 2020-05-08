/*!

=========================================================
* PathMaker DashBoard React
=========================================================

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink href="/"  rel="noopener noreferrer" >
                  Path Maker
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" >
                  About Us
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" >
                  MIT License
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
