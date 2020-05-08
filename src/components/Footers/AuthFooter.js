/*!

=========================================================
* PathMaker DashBoard React
=========================================================

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink href="/" >
                      Path Maker
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/" >
                      About Us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/" >
                      MIT License
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
