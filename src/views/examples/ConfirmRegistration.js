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
import React, {useState} from "react";
import {Auth} from "aws-amplify";


// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

export default function Register(props) {

  const [username,setUsername] = useState("");
  const [verificationCode,setVerificationCode] = useState("");

  const [modal,SetModal] = useState(false);
  const toggle = () => SetModal(!modal);

  function validateForm(){
    return username.length > 0 && verificationCode.length > 0;
    ;
  }

  async function handleSubmit(event){
    event.preventDefault();

    try{
      console.log(username,verificationCode);
      const userReturnAuth = await Auth.confirmSignUp(username,verificationCode);
      console.log(userReturnAuth.user);
      props.history.push("/login")
    } catch(err){
      alert(err.message);
      console.log(err);
    }
  }

  async function handleSendLink(event){
      event.preventDefault();      
      try{
        const func = await Auth.resendSignUp(username);
        console.log(func);
        SetModal(!modal)
        alert("Abbiamo reinviato il codice... Controlla la tua Email! (Anche nello Spam)");
      } catch(err) {
          console.log(err);
          alert(err);
      }
  }

    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>We've sent you a verification code, check your email and fill this form!</small>
              </div>

              {/* FORM CONFIRM SIGN UP - VERIFICATION CODE & EMAIL CHECK */}
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup controlid="verificationCode">
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-check-bold" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Verification Code" type="text" onChange = {e => setVerificationCode(e.target.value)}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup controlid="username">
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email" onChange = {e => setUsername(e.target.value)}/>
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button disabled = {!validateForm()} className="mt-4" color="primary" type="submit">
                    Confirm Registration
                  </Button>                                  
                </div>
              </Form> 
                <hr></hr>
                
                {/* MODAL CONFIRM SIGNUP */}
                <div className="text-center">
                    <Button type="button" className="btn btn-block btn-warning mb-3" onClick={toggle}>Not Yet Received?</Button>
                    <Modal isOpen={modal} toggle={toggle} className="modal-dialog modal-danger modal-dialog-centered modal-">
                        <div className="modal-content bg-gradient-danger">
                            <ModalHeader toggle={toggle}>
                            </ModalHeader>

                            <ModalBody>
                                <div className="py-3 text-center">
                                    <i className="ni ni-spaceship ni-3x"></i>
                                    <h4 className="heading mt-4">Invio Link</h4>
                                    <p>Inserisci nel campo l'indirizzo Email a cui inviare, nuovamente, il codice di verifica</p>
                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <Button className="btn btn-white" /*color="primary"*/ onClick={handleSendLink}>Invia</Button>{' '}
                                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={toggle}>Ok, Ho capito!</Button>
                            </ModalFooter>
                        </div>         
                    </Modal>
                </div>                          
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
