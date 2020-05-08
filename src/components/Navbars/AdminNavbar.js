/*!

=========================================================
* PathMaker DashBoard React
=========================================================

*/
import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {   
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" to="/">
              {this.props.brandText}
            </Link>

            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="..." src={require("assets/img/theme/user-800.jpg")}/>
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {this.props.user.nome} {this.props.user.cognome}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Bentornato, {this.props.user.nome}!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>Profilo</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/index" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Home</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={e => this.props.handleLogout(this.props,e)}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
