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
import {Route, Switch, Link} from "react-router-dom";
import {API} from "aws-amplify"


// reactstrap components
import {
  Button,
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
  CardText,
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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import "assets/css/custom_hover.css";

class Squad extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalSquadMod: false,
      modalSquadDel: false,
      delConfirm: "",
      lavoraPer: "",
      note: "",
      genere: ""
    }
  }

  validateDelForm = () => {
    return this.state.delConfirm === "delete";
  }

  toggleSquadDel = () => {
    this.setState({modalSquadDel: !this.state.modalSquadDel})
  }

  validateSquadForm = () => {
    return this.state.lavoraPer.length > 0 
            && this.state.note.length > 0 && this.state.genere.length > 0;
  }

  toggleSquadMod = () => {
    this.setState({modalSquadMod: !this.state.modalSquadMod})
  }

  handleSquadMod = async (event) => {
    event.preventDefault();
    let genere;
    if(this.state.genere === "Femminile"){
      genere = "F"
    } else {
      genere = "M"
    }

    try{
      const response = await API.put("pathMaker", `/squadriglie/${this.props.squad.squadriglia}`, {
        body: {
          genere: this.state.genere.length > 0 ? genere : this.props.squad.genere,
          note: this.state.note.length > 0 ? this.state.note : this.props.squad.note,
          lavoraPer: this.state.lavoraPer.length > 0 ? this.state.lavoraPer : this.props.squad.lavoraPer,
        }
      });
      console.log(response);
      this.props.history.go(`admin/squadriglia/${this.props.squad.squadriglia}`)
    } catch(err){
      alert(err);
      console.log(err);
    }

  }

  handleSquadDel = async (event) => {
    event.preventDefault();
    try{
      const response = await API.del("pathMaker",`/squadriglie/${this.props.squad.squadriglia}`);
      console.log(response);
      this.props.history.go(`/admin/squadriglie`);
    } catch(err){
      alert(err);
      console.log(err);
    }
  }

  renderCardSquad = () => {
    return this.props.squad.map((sq,i) => {
      const {squadriglia, genere, lavoraPer} = sq;
      const imgString = "/"+squadriglia.toLowerCase()+".jpg"
      return (
        
        <Col key={squadriglia} lg="6" xl="3" className="pb-2 pt-5">
          <Link to={"/admin/squadriglia/"+ sq.squadriglia.toLowerCase()}>
          <Card className="inner d-flex shadow mb-4 mb-xl-0 border-0">
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
          </Link> 
          
                   
        </Col>
      )
    })
  }

  render() {
    console.log(this.props.squad);
    const temp = new Date(this.props.squad.updatedAt);
    const date = temp.getDate() + "/" + (temp.getMonth()+1) + "/" + temp.getFullYear()

    const genere = this.props.squad.genere.toUpperCase() === "F" ? "Femminile" : "Maschile";
    console.log(genere)

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Lavora Per...
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {this.props.squad.lavoraPer}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          Aggiornato il
                        </span>{" "}
                        <span className="text-nowrap">{date}</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Note...
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.squad.note}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          Aggiornato il
                        </span>{" "}
                        <span className="text-nowrap">{date}</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Squadriglia {genere}
                          </CardTitle>
                          <span className="text-green h2 font-weight-bold mb-0">{this.props.squad.squadriglia.toUpperCase()}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span style={{cursor: "pointer"}} className="text-green mr-2" onClick={this.toggleSquadMod}>
                          Modifica
                        </span>{" "}
                        <span style={{cursor: "pointer"}} className="text-warning mr-2" onClick={this.toggleSquadDel}>
                          Elimina
                        </span>{" "}
                      </p>
                      
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>


        <Container className="mt--7" fluid>
          <Row>
            {this.props.squad.squadriglia}
          </Row>

          <Modal isOpen={this.state.modalSquadMod} toggle={e => this.toggleSquadMod} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleSquadMod} />
              <Form role="form" onSubmit={this.handleSquadMod}>
              <ModalBody>
                <div className="py-3 text-center">
                  <i className="ni ni-button-power ni-3x"></i>
                  <h4 className="heading mt-4">Squadriglia {this.props.squad.squadriglia}</h4>
                  <p>Modifica i Dati della squadriglia</p>
                </div>
                  
                    <FormGroup controlid="lavoraPer" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-shop" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Lavora Per: " + this.props.squad.lavoraPer} type="text" onChange={e => this.setState({lavoraPer: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="note" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-money-coins" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Note: " + this.props.squad.note} type="text" onChange={e => this.setState({note: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="genere" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-credit-card" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Genere: " + this.props.squad.genere} type="select" required onChange={e => this.setState({genere: e.target.value})}>
                          <option>Femminile</option>
                          <option>Maschile</option>
                        </Input>
                      </InputGroup>
                    </FormGroup>                    
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit">Modifica</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleSquadMod}>Elimina Squadriglia</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>

          <Modal isOpen={this.state.modalSquadDel} toggle={e => this.toggleSquadDel} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleSquadDel} />
              <Form role="form" onSubmit={this.handleSquadDel}>
              <ModalBody>
                <div className="py-3 text-center">
                  <i className="ni ni-button-power ni-3x"></i>
                  <h4 className="heading mt-4">Squadriglia {this.props.squad.squadriglia}</h4>
                  <p>Sei sicuro di voler eliminare la squadriglia?</p>
                  <p>Per confermare, inserisci qui sotto la parola "delete" e invia la richiesta!</p>
                </div>
                  
                    <FormGroup controlid="lavoraPer" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-shop" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" onChange={e => this.setState({delConfirm: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>

                    </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit" disabled={!this.validateDelForm()}>Elimina Squadriglia</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleSquadDel}>Indietro</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>

        </Container>
      </>
    );
  }
}

export default Squad;
