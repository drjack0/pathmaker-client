/*!

=========================================================
* PathMaker DashBoard React
=========================================================

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
  Col,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

export default function ForgotPassword(props) {

  const [username,setUsername] = useState("");
  
  const [modal,SetModal] = useState(false);
  const toggle = () => SetModal(!modal);

  const [verificationCode,setVerificationCode] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  function validateForm(){
    return username.length > 0;
    ;
  }

  function validateConfirm(){
    return username.length > 0 && verificationCode.length > 0 && password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  }

  async function handleSubmit(event){
    event.preventDefault();

    try{
      const userReturnAuth = await Auth.forgotPassword(username);
      console.log(userReturnAuth.user);
      SetModal(!modal);
    } catch(err){
      alert(err.message);
      console.log(err);
    }
  }

  async function handleConfirm(event){
      event.preventDefault();
      try{
        const func = await Auth.forgotPasswordSubmit(username,verificationCode,password);
        console.log(func);
        alert("Password Resettata con successo");
        props.history.push("/auth/login");
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
                <small>Inserisci la tua email per ricevere le nuove credenziali</small>
              </div>

              {/* FORM FORGOT PASSWORD - EMAIL CHECK */}
              <Form role="form" onSubmit={handleSubmit}>
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
                    Invia a questa email
                  </Button>                                  
                </div>
              </Form>
              <hr/>

                {/* FORM CONFIRM FORGOT PASSWORD - CODE,PASS,CONFIRM_PASS CHECK*/}
              <div className="text-center">
                <Button type="button" className="btn btn-warning mb-3" onClick={toggle}>Ho già un codice</Button>
                <Modal isOpen={modal} toggle={toggle} className="modal-dialog modal-danger modal-dialog-centered modal-">
                  <div className="modal-content bg-gradient-danger">
                    <ModalHeader toggle={toggle}></ModalHeader>
                    <ModalBody>
                      <div className="py-3 text-center">
                        <i className="ni ni-settings-gear-65 ni-3x"></i>
                        <h4 className="heading mt-4">Conferma Reset Password</h4>
                        <p>Compila le seguenti informazioni per il reset della password</p>
                      </div>
                      <Form role="form" onSubmit={handleConfirm}>
                        <FormGroup controlid="verificationCode">
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Verification Code" type="text" autoComplete="new-email" onChange = {e => setVerificationCode(e.target.value)}/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup controlid="password">
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="New Password" type="password" autoComplete="new-password" onChange = {e => setPassword(e.target.value)}/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup controlid="confirmPassword">
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Confirm Password" type="password" autoComplete="new-password" onChange = {e => setConfirmPassword(e.target.value)}/>
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                          <Button disabled = {!validateConfirm()} className="mt-4" color="primary" type="submit">
                            Confirm New Password
                          </Button>                                  
                        </div>
                      </Form> 
                    </ModalBody>
                  </div>         
                </Modal>
              </div>                          
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
