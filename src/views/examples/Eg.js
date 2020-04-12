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
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { Auth } from "aws-amplify";

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

      descrizioneMod: ""
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
        </Container>
      </>
    );
  }
}

export default withRouter(Profile);
