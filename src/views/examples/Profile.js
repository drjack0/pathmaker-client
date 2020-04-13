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
import {withRouter} from "react-router-dom";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { Auth, API } from "aws-amplify";
import ReactDatetimeClass from "react-datetime";
import ReactDatetime from "react-datetime";

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      oldPassword: "",
      confirmOldPassword: "",
      newPassword: "",
      confirmNewPassword: "",

      nomeMod: "",
      cognomeMod: "",

      descrizioneMod: "",

      addEgModal: false,

      
      censcodeEG:  "",
      nomeEG:  "",
      cognomeEG:  "",

      cellMammaEG: "",
      mailMammaEG: "",
      nomeMammaEG: "",
      
      cellPapaEG: "",
      mailPapaEG: "",
      nomePapaEG: "",
      
      casaEG: "",
      cellulareEG: "",
      indirizzoEG: "",
      nascitaEG: "",
        
      annoEG: "",
      camminaPerEG: "",
      incaricoEG: "",
      lavoraPerEG: "",
      noteSentieroEG: "",
      squadrigliaEG: ""
    }
    
  }

  validateFormPassword = () => {
    return this.state.oldPassword.length > 0 && this.state.confirmOldPassword.length > 0
            && this.state.newPassword.length > 0 && this.state.confirmNewPassword.length > 0
            && this.state.oldPassword === this.state.confirmOldPassword
            && this.state.newPassword === this.state.confirmNewPassword;
  }

  validateFormInfo = () => {
    return this.state.nomeMod.length > 0 && this.state.cognomeMod.length > 0
  }

  validateFormDescrizione = () => {
    return this.state.descrizioneMod.length > 0;
  }

  handleModInfo = async (event) => {
    event.preventDefault();
    console.log("WOO CHANGE INFO");
    console.log(this.state.nomeMod,this.state.cognomeMod);
    try{
      const userCurrent = await Auth.currentAuthenticatedUser({
        bypassCache: true
      });
      console.log(userCurrent);
      try{
        const data = await Auth.updateUserAttributes(userCurrent,{
          "custom:nome":this.state.nomeMod,
          "custom:cognome":this.state.cognomeMod
        })
        console.log(data);
        //this.props.history.go("/admin/user-profile");
        this.props.history.go("/admin/user-profile");
        //this.props.history.goBack();
      } catch(err2){
        console.log("UPDATE ERR",err2)
      }
    } catch(err){
      console.log("AUTH INFO ERROR",err);
    }
  }

  handleModPassword = async (event) => {
    event.preventDefault();
    console.log("WOO PASS CHANGE");
    try{
      const userCurrent = await Auth.currentAuthenticatedUser({
        bypassCahce: true
      });
      console.log(userCurrent);
      try{
        const data = await Auth.changePassword(userCurrent, this.state.oldPassword, this.state.newPassword);
        console.log(data);
        this.props.history.go("/admin/user-profile");
      } catch(err2){
        console.log("CHANGE PASS ERR",err2)
      }
    } catch(err){
      console.log("AUTH INFO ERROR CHANGE PASS",err)
    }
  }  

  handleModDescription = async (event) => {
    event.preventDefault();
    console.log("WOO CHANGE DESCRIPTION");
    console.log(this.state.descrizioneMod);
    try{
      const userCurrent = await Auth.currentAuthenticatedUser({
        bypassCache: true
      });
      console.log(userCurrent);
      try{
        const data = await Auth.updateUserAttributes(userCurrent,{
          "custom:descrizione":this.state.descrizioneMod
        })
        console.log(data);
        //this.props.history.go("/admin/user-profile");
        this.props.history.go("/admin/user-profile");
        //this.props.history.goBack();
      } catch(err2){
        console.log("UPDATE ERR",err2)
      }
    } catch(err){
      console.log("AUTH INFO ERROR",err);
    }
  }

  toggleAddEgModal = () => {
    this.setState({addEgModal: !this.state.addEgModal})
  }

  handleAddUserSubmit = async (event) => {
    const content= {
      censcode: this.state.censcodeEG,
      nome: this.state.nomeEG,
      cognome: this.state.cognomeEG,
      mamma: {
        nomeMamma: this.state.nomeMammaEG,
        cellMamma: this.state.cellMammaEG,
        mailMamma: this.state.mailMammaEG
      },
      papa: {
        nomePapa: this.state.nomePapaEG,
        cellPapa: this.state.cellPapaEG,
        mailPapa: this.state.mailPapaEG
      },
      recapiti: {
        casa: this.state.casaEG,
        cellulare: this.state.cellulareEG,
        indirizzo: this.state.indirizzoEG,
        nascita: this.state.nascitaEG
      },
      sentiero: {
        anno: this.state.annoEG,
        camminaPer: this.state.camminaPerEG,
        incarico: this.state.incaricoEG,
        lavoraPer: this.state.lavoraPerEG,
        noteSentiero: this.state.noteSentieroEG,
        squadriglia: this.state.squadrigliaEG
      }
    }
    event.preventDefault();
    try{
      const response = API.post("pathMaker", "/reparto", {
        body: content
      });
      console.log(response)
      this.props.history.go("admin/user-profile");
    } catch(err){
      alert(err);
      console.log(err);
    }
  }
 
  render() {
    return (
      <>
        <UserHeader {...this.props}/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" /*onClick={e => e.preventDefault()}*/>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-1-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">                    
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      /*onClick={e => e.preventDefault()}*/
                      size="sm"
                    >
                      Cambia Immagine
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">{this.props.user.annoCoca}</span>
                          <span className="description">Anno Co.Ca.</span>
                        </div>
                        <div>
                          <span className="heading">{this.props.user.formazione}</span>
                          <span className="description">Formazione</span>
                        </div>
                        <div>
                          <span className="heading">{this.props.user.branca}</span>
                          <span className="description">Branca</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {this.props.user.nome} {this.props.user.cognome}
                      {/*<span className="font-weight-light">, Età</span>*/}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Roma, Italia
                    </div>
                    {/*<div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Ruolo
                    </div>*/}
                    <div>
                      <i className="ni education_hat mr-2" />
                      Reparto Rm 19
                    </div>
                  </div>

                  <hr/>

                  <Row>
                    <Col>
                      <div className="card-profile-stats d-flex justify-content-center">
                        <Button type="button" color="success" size="lg" outline className="btn mb-3 mr-3" onClick={this.toggleAddEgModal}>Aggiungi EG</Button>
                        <Button type="button" color="warning" size="lg" outline className="btn mb-3 ml-3" >Conferma Utente</Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                
              </Card>
            </Col>

            

            
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Il mio account</h3>
                    </Col>
                    
                  </Row>
                </CardHeader>
                <CardBody>
                  
                  {/* FORM INFO NOME COGNOME */}
                  <Form onSubmit={this.handleModInfo}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              disabled={true}
                              className="form-control-alternative"
                              id="input-email"
                              placeholder={this.props.user.email}
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Nome
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={e => this.setState({nomeMod: e.target.value})}
                              id="input-first-name"
                              placeholder={this.props.user.nome}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Cognome
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={e => this.setState({cognomeMod: e.target.value})}
                              id="input-last-name"
                              placeholder={this.props.user.cognome}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="text-right" xs="12">
                          <Button disabled={!this.validateFormInfo()} className="my-4" size="sm" color="primary" type="submit" >
                            Cambia Informazioni
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Form>  
                  
                    <hr className="my-4" />

                    {/* Password */}
                  <Form onSubmit={this.handleModPassword}>                     
                    <h6 className="heading-small text-muted mb-4">
                      Change Password
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-old-password"
                            >
                              Old Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={e => this.setState({oldPassword: e.target.value})}
                              id="input-old-password"
                              placeholder="Enter Old Passoword Here"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-confirm-old-password"
                            >
                              Confirm Old Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={e => this.setState({confirmOldPassword: e.target.value})}
                              id="input-confirm-old-password"
                              placeholder="Confirm Old Password"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-new-password"
                            >
                              New Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={e => this.setState({newPassword: e.target.value})}
                              id="input-new-password"
                              placeholder="Enter New Password Here"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-confirm-new-password"
                            >
                              Confirm New Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={e => this.setState({confirmNewPassword: e.target.value})}
                              id="input-confirm-new-password"
                              placeholder="Confirm New Password"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="text-right" xs="12">
                        <Button disabled={!this.validateFormPassword()} className="my-4" size="sm" color="primary" type="submit">
                          Cambia Password
                        </Button>
                        </Col>
                        
                      </Row>
                    </div>
                  </Form>

                    <hr className="my-4" />

                  <Form onSubmit={this.handleModDescription}>
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    {/*<div className="pl-lg-4">*/}
                    <Col className="lg-12">
                    <FormGroup>
                        <Input
                          className="form-control-alternative"
                          placeholder={this.props.user.descrizione}
                          onChange={e => this.setState({descrizioneMod: e.target.value})}
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="text-right" xs="13">
                        <Button disabled={!this.validateFormDescrizione()} className="my-4" size="sm" color="primary" type="submit">
                          Cambia Descrizione
                        </Button>
                        </Col>
                      
                      
                    {/*</div>*/}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Modal isOpen={this.state.addEgModal} toggle={e => this.toggleAddEgModal} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleAddEgModal} />
              <Form role="form" onSubmit={this.handleAddUserSubmit}>
              <ModalBody>
                <div className="py-3 text-center">
                  <i className="ni ni-badge ni-3x"></i>
                  <h4 className="heading mt-4">Crea un nuovo EG</h4>
                  <p>Inserisci i dati dell'EG che vuoi registrare</p>
                </div>

                <hr className="mt-1"/>

                <p className="text-center">Dati principali</p>
                <FormGroup controlid="censcode" className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-app" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Codice Censimento" type="text" required onChange={e => this.setState({censcodeEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <Row>
                  <Col md="6">
                  <FormGroup controlid="nomeEg" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-ghost" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Nome EG" required type="text" onChange={e => this.setState({nomeEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup controlid="cognomeEg" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-signature" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Cognome EG" required type="text" onChange={e => this.setState({cognomeEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                    <p className="text-center">Recapiti</p>

                <Row>
                  <Col md="6">
                  <FormGroup controlid="casa" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-voicemail" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Numero Casa" type="text" onChange={e => this.setState({casaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup controlid="cellulare" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-phone" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Cellulare" type="text" onChange={e => this.setState({cellualreEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                  <FormGroup controlid="indirizzo" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-home" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Indirizzo" type="text" onChange={e => this.setState({indirizzoEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup controlid="nascita" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-birthday-cake" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Data di Nascita" type="date" onChange={e => this.setState({nascitaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                <p className="text-center">Sentiero</p>

                <Row>
                  <Col md="6">
                  <FormGroup controlid="squadriglia" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-home" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Squadriglia" type="text" onChange={e => this.setState({squadrigliaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup controlid="anno" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="far fa-calendar" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Anno" type="text" onChange={e => this.setState({annoEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                  <FormGroup controlid="camminaPer" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-shoe-prints" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Cammina Per..." type="text" onChange={e => this.setState({camminaPerEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup controlid="lavoraPer" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-wrench" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Lavora Per..." type="text" onChange={e => this.setState({lavoraPerEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                  <FormGroup controlid="incarico" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-briefcase" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Incarico" type="text" onChange={e => this.setState({incaricoEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup controlid="noteSentiero" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Note Sentiero" type="text" onChange={e => this.setState({noteSentieroEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                <p className="text-center">Mamma</p>

                <Row>
                  <Col md="6">
                  <FormGroup controlid="nomeMamma" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-signature" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Nome Mamma" type="text" onChange={e => this.setState({nomeMammaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup controlid="cellMamma" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-phone" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Cellulare Mamma" onChange={e => this.setState({cellMammaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup controlid="mailMamma" className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="far fa-envelope" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Mail Mamma" type="email" onChange={e => this.setState({mailMammaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>

                <p className="text-center">Papa</p>

                <Row>
                  <Col md="6">
                  <FormGroup controlid="nomePapa" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-signature" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Nome Papà" type="text" onChange={e => this.setState({nomePapaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup controlid="cellPapa" /*className="mb-3 mx-6"*/>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fas fa-phone" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Cellulare Papà" type="text" onChange={e => this.setState({cellPapaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup controlid="mailPapa" className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="far fa-envelope" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Mail Papà" type="email" onChange={e => this.setState({mailPapaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                          
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit" /*disabled={!this.validateBudgetForm()}*/>Aggiungi</Button>
                <Button className="btn btn-link text-white ml-auto" onClick={this.toggleAddEgModal}>Indietro</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>

        </Container>
      </>
    );
  }
}

export default withRouter(Profile);
