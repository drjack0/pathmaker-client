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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";

import {API} from "aws-amplify"
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  InputGroupButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import {Link} from "react-router-dom";

import Header from "components/Headers/Header.js";

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      squadList: this.props.squad,
      backupSquadList: this.props.squad,
      dropdownOpen: false,
      squadFilterType: "squadriglia",
      modalAddBudget: false,

      budgetAmount: "",
      budgetType: "",
      budgetOp: ""
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };

  //SQUAD FUNCTION SECTION

  toggleDropDown = () => {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  renderSquadTable = () => {
    return this.state.backupSquadList.sort((a,b) => (a.squadriglia < b.squadriglia) ? 1 : -1).map((sq,i) => {
      const {squadriglia, genere, lavoraPer} = sq;
      return (
        <tr key={squadriglia}>
          <th scope="row">{squadriglia}</th>
          <td>{genere}</td>
          <td>{lavoraPer}</td>
          <td>
            <i className="fas fa-location-arrow text-success mr-3" />
            <Link to={"/admin/squadriglia/"+squadriglia.toLowerCase()}> Scopri </Link>
          </td>
        </tr>
      )
    })
  }

  filterSquadList =(event) => {
    var updatedList = this.state.squadList;
    const filterType = this.state.squadFilterType.toString();
    updatedList = updatedList.filter(function(list){
      return (list[filterType].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
    });
    this.setState({backupSquadList: updatedList});
  };

  //BUDGET FUNCTION SECTION

  renderBudgetTable = () => {
    return this.props.budget.map((bud,i) => {
      const {cashId, nomeOp, updatedAt, typeOp, amount} = bud;     
      const temp = new Date(updatedAt);
      const date = temp.getDate() + "/" + (temp.getMonth()+1) + "/" + temp.getFullYear()

      if(typeOp === "+" && temp.getMonth() === new Date(Date.now()).getMonth()){
        return (
          <tr key={cashId}>
            <th scope="row">{nomeOp}</th>
            <td>{date}</td>
            <td>
              <i className="fas fa-plus text-success mr-3" />{amount}
            </td>
          </tr>
        )
      } else if(typeOp === "-" && temp.getMonth() == new Date(Date.now()).getMonth()){
        return (
          <tr key={cashId}>
            <th scope="row">{nomeOp}</th>
            <td>{date}</td>
            <td>
              <i className="fas fa-minus text-warning mr-3" />{amount}
            </td>
          </tr>
        )
      }      
    })
  }

  validateBudgetForm = () => {
    return this.state.budgetAmount.length > 0 && this.state.budgetType.length > 0
            && this.state.budgetOp.length > 0
  }

  toggleAddBudget = () => {
    this.setState({modalAddBudget: !this.state.modalAddBudget})
  }

  handleBudgetSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.budgetAmount, this.state.budgetOp, this.state.budgetType);

    let typeOp;
    if(this.state.budgetType === "Entrata"){
      typeOp = "+"
    } else {
      typeOp = "-"
    }

    try{
      const response = await API.post("pathMakerUtils", "/budget", {
        body: {
          nomeOp: this.state.budgetOp,
          typeOp: typeOp,
          amount: this.state.budgetAmount
        }
      });
      console.log(response);
      this.props.history.go("/admin/index")
    } catch(err){
      alert(err);
      console.log(err);
    }
  }

  render() {
    console.log("INDEX PROPS",this.props);
    console.log("INDEX STATE",this.state)
    
    return (
      <>
        <Header {...this.props} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Squadriglie</h3>
                    </div>
                    <div className="col md-4 text-right">
                      <InputGroup className="mb-1">
                      <Input type="text" placeholder={"Filtra: " + this.state.squadFilterType} className="mb-0" onChange={this.filterSquadList} />
                        <InputGroupButtonDropdown className="mb-1" addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                          <InputGroupText style={{paddingTop: "0.03rem",paddingRight:"0.04rem",paddingBottom: "0.03rem",paddingLeft:"0.04rem"}}>
                          <DropdownToggle outline color="primary" >
                            <i className="ni ni-zoom-split-in" />
                          </DropdownToggle>
                          <DropdownMenu >
                            <DropdownItem header style={{color: "blue"}} >Seleziona Filtro</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={e => this.setState({squadFilterType: "squadriglia"})}>Squadriglia</DropdownItem>
                            <DropdownItem onClick={e => this.setState({squadFilterType: "lavoraPer"})}>Lavora Per</DropdownItem>
                          </DropdownMenu>
                          </InputGroupText>                                                
                        </InputGroupButtonDropdown>                                                
                      </InputGroup>
                    </div>
                  </Row>
                </CardHeader>
                <Table hover className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Squadriglia</th>
                      <th scope="col">Genere</th>
                      <th scope="col">Lavora Per</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderSquadTable()}
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Budgeting Ultimo Mese</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={e => this.toggleAddBudget()}
                        size="sm"
                      >
                        Add
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Operazione</th>
                      <th scope="col">Data</th>
                      <th scope="col">Importo</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.renderBudgetTable()}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>

          <Modal isOpen={this.state.modalAddBudget} toggle={e => this.toggleAddBudget} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleAddBudget} />
              <Form role="form" onSubmit={this.handleBudgetSubmit}>
              <ModalBody>
                <div className="py-3 text-center">
                  <i className="ni ni-building ni-3x"></i>
                  <h4 className="heading mt-4">Budgeting</h4>
                  <p>Inserisci i dati dell'operazione che vuoi registrare</p>
                </div>
                  
                    <FormGroup controlid="budgetOp" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-shop" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Operazione" type="text" onChange={e => this.setState({budgetOp: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="budgetAmount" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-money-coins" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Importo" type="number" min="0" onChange={e => this.setState({budgetAmount: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="budgetType" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-credit-card" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Tipo" type="select" required onChange={e => this.setState({budgetType: e.target.value})}>
                          <option>Entrata</option>
                          <option>Uscita</option>
                        </Input>
                      </InputGroup>
                    </FormGroup>                    
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit" disabled={!this.validateBudgetForm()}>Aggiungi</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleAddBudget}>Indietro</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>
        </Container>
      </>
    );
  }
}

export default Index;
