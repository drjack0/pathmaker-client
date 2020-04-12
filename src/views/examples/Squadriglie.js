/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardText
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

class Squadriglie extends React.Component {
  constructor(props){
    super(props);
  }

  renderCardSquad = () => {
    return this.props.squad.map((sq,i) => {
      const {squadriglia, genere, lavoraPer} = sq;
      const imgString = "/"+squadriglia.toLowerCase()+".png"
      return (
        
        <Col key={squadriglia} lg="6" xl="3" className="pb-2 pt-5">
          <a style={{ cursor: 'pointer' }} /*onClick={siteSelectedCallback}*/>
          <Card className="d-flex shadow mb-4 mb-xl-0 border-0">
            <CardImg alt="..." src={require("assets/img/theme/squadriglie" + imgString)} top />
            <CardImgOverlay className="flex-center text-center align-items-center">
              <div>
                <CardTitle className="d-flex align-items-center text-center h1 text-white mb-2">{squadriglia}</CardTitle>
                <CardText className="d-flex align-items-center text-white font-weight-bold">
                  Lavora nell'ambito di: {lavoraPer}
                </CardText>
              </div>
            </CardImgOverlay>
          </Card>
          </a>          
        </Col>
      )
    })
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            {this.renderCardSquad()}
          </Row>
        </Container>
      </>
    );
  }
}

export default Squadriglie;
