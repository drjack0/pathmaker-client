/*!

=========================================================
* PathMaker DashBoard React
=========================================================

*/
import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import { Auth } from "aws-amplify";

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
  Col
} from "reactstrap";



function Login(props){
    const [email,setEmail] = useState("");
    const [password,SetPassword] = useState("");

  function validateForm(){
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event){
    event.preventDefault();
    try {
      const data = await Auth.signIn(email,password);
      props.handleLoginApp(props.history,
                          data.attributes.email,
                          data.attributes['custom:nome'],
                          data.attributes['custom:cognome'],
                          data.attributes)
    } catch(err) {
      alert(err.message);
      console.log(err);
    }
  }
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <p>Sign in with Path Maker credentials</p>
              </div>

              {/* FORM SIGN IN - EMAIL AND PASSWORD CHECK AND SUBMIT*/}
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup controlid="email" className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email" onChange = {e => setEmail(e.target.value)}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup controlid="password">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password" onChange={e => SetPassword(e.target.value)}/>
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button disabled = {!validateForm()} className="my-4" color="primary" type="submit">
                    Sign in
                  </Button>
                </div>
                <Row className="mt-3">
                  <Col xs="6">
                    <a className="text-light" href="/auth/forgot_password">
                      <small>Forgot password?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <a className="text-light" href="/auth/register">
                      <small>Create new account</small>
                    </a>
                  </Col>
                </Row>
              </Form>
            </CardBody>   
          </Card>       
        </Col>
      </>
    );
  //}
}

export default withRouter(Login);
