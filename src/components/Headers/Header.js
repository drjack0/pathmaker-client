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
import { Card, CardBody, CardTitle, Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dropdownMensiliOpen: false,
      monthType: this.getMeseDropdown((new Date(Date.now())).getMonth()+1),
      arretrati: this.getInitialMensiliArretrati(this.getMeseDropdown((new Date(Date.now())).getMonth()+1))
    }
  }

  getInitialMensiliArretrati = (date) => {
    const currentMonth = date.toLowerCase()
    let total = 0;   
    for(var i=0; i < this.props.reparto.length; i++){
      if(this.props.reparto[i].mensili !== undefined){
        total = total + (20 - parseInt(this.props.reparto[i].mensili[currentMonth]));
      }     
    }
    return total
  }

  setMensili = (e,month) => {
    this.setState({monthType: month});
    this.setState({arretrati: this.getInitialMensiliArretrati(month)})
  }

  getMensiliArretratiTotali = () => {
    let total= 0;
    for(var i=0; i < this.props.reparto.length; i++){
      if(this.props.reparto[i].mensili !== undefined){
        const {mensili} = this.props.reparto[i];
        total = total + 160 - (parseInt(mensili.ottobre) + parseInt(mensili.novembre) + parseInt(mensili.dicembre) + parseInt(mensili.gennaio) + parseInt(mensili.febbraio)
                                  + parseInt(mensili.marzo) + parseInt(mensili.aprile) + parseInt(mensili.maggio))
      }
    }
    return total
  }

  getRedBudget = () => {
    const currentMonth = this.getMese().toString().toLowerCase();
    let total = 0;
    for(var i=0; i < this.props.budget.length; i++){
      if((new Date(this.props.budget[i].updatedAt)).getMonth() === (new Date(Date.now())).getMonth()){
        if(this.props.budget[i].typeOp === "-"){
          total = total + parseInt(this.props.budget[i].amount)
        }
      }
    }
    console.log(this.saldoCassa())
    return total
  }

  //UTILS
  updateDateFormat = (date) => {
    const stringDate = new Date(date);
    return stringDate.getDate() + "/" + (stringDate.getMonth()+1) + "/" + stringDate.getFullYear();
  }

  saldoCassa = () => {
    let greenMensili = 0;
    for(var i = 0; i < this.props.reparto.length; i++){
      const {mensili} = this.props.reparto[i];
      greenMensili = greenMensili + parseInt(mensili.ottobre) + parseInt(mensili.novembre) + parseInt(mensili.dicembre) + parseInt(mensili.gennaio) + parseInt(mensili.febbraio)
                                  + parseInt(mensili.marzo) + parseInt(mensili.aprile) + parseInt(mensili.maggio)
    }
    return greenMensili + this.saldoBudget()
  }

  saldoBudget = () => {
    let total = 0;
    for(var i=0; i < this.props.budget.length; i++){
      if(this.props.budget[i].typeOp === "+"){
        total = total + parseInt(this.props.budget[i].amount)
      } else {
        total = total - parseInt(this.props.budget[i].amount)
      }
    }
    return total
  }

  getMese = () => {
    let meseNumber = (new Date(Date.now())).getMonth() + 1;
    let mese;
    switch(meseNumber){
      case 1:
        mese = "Gennaio";
        break;
      case 2:
        mese = "Febbraio";
        break;
      case 3:
        mese ="Marzo";
        break;
      case 4:
        mese ="Aprile";
        break;
      case 5:
        mese ="Maggio";
        break;
      case 10:
        mese ="Ottobre";
        break;
      case 11:
        mese="Novembre";
        break;
      case 12:
        mese ="Dicembre";
        break
    }
    return mese;
  }

  getMeseDropdown = (meseNumber) => {
    let mese;
    switch(meseNumber){
      case 1:
        mese = "Gennaio";
        break;
      case 2:
        mese = "Febbraio";
        break;
      case 3:
        mese ="Marzo";
        break;
      case 4:
        mese ="Aprile";
        break;
      case 5:
        mese ="Maggio";
        break;
      case 10:
        mese ="Ottobre";
        break;
      case 11:
        mese="Novembre";
        break;
      case 12:
        mese ="Dicembre";
        break
    }
    return mese;
  }

  //DROPDOWN MENSILE
  toggleDropdownMensile = () => {
    this.setState({dropdownMensiliOpen: !this.state.dropdownMensiliOpen})
  }


  render() {
    console.log("HEADERS PROPS", this.props)
    console.log("HEADERS STATE", this.state)
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Mensili Arretrati {this.state.monthType}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.arretrati}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-mouse-pointer" />
                        </span>{" "}
                        <Dropdown isOpen={this.state.dropdownMensiliOpen} toggle={this.toggleDropdownMensile}>
                          <DropdownToggle tag="span" className="text-nowrap" style={{cursor: "pointer"}}>
                            Seleziona mese
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem header style={{color: "blue"}}>Seleziona Mese</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={e => this.setMensili(e,"Ottobre")}>Ottobre</DropdownItem>
                            <DropdownItem onClick={e => this.setMensili(e,"Novembre")}>Novembre</DropdownItem>
                            <DropdownItem onClick={e => this.setMensili(e,"Dicembre")}>Dicembre</DropdownItem>
                            <DropdownItem onClick={e => this.setMensili(e,"Gennaio")}>Gennaio</DropdownItem>
                            <DropdownItem onClick={e => this.setMensili(e,"Febbraio")}>Febbraio</DropdownItem>
                            <DropdownItem onClick={e => this.setMensili(e,"Marzo")}>Marzo</DropdownItem>
                            <DropdownItem onClick={e => this.setMensili(e,"Aprile")}>Aprile</DropdownItem>
                            <DropdownItem onClick={e => this.setMensili(e,"Maggio")}>Maggio</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                        {/*<span className="text-nowrap">Seleziona mese</span>*/}
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Mensili Arretrati Totali
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.getMensiliArretratiTotali()}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-money-check-alt" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-primary mr-2">
                          <i className="fas fa-calculator" />
                        </span>{" "}
                        <span className="text-nowrap">Calcolati su tutti i mesi di Attività</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Saldo Disponibile
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{this.saldoCassa()}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-piggy-bank" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="far fa-money-bill-alt" />
                        </span>{" "}
                        <span className="text-nowrap">Calcolato su Budget e Mensili</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Reparto Roma 19
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            Web App
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fab fa-slack-hash" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-check" />
                        </span>{" "}
                        <span className="text-nowrap">Path Maker</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
