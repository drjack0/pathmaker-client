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
  Col
} from "reactstrap";

export default function Register(props) {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [cognome,setCognome] = useState("");
  const [nome,setNome] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  //ATTRIBUTES
  const [annoCoca,setAnnoCoca] = useState("");
  const [formazione, setFormazione] = useState("");
  const [codiceCensimento, setCodiceCensimento] = useState("");
  const [branca, setBranca] = useState("");
  const [descrizione, setDescrizione] = useState("");

  function validateForm(){
    return username.length > 0 && password.length > 0 && confirmPassword.length > 0 
            && nome.length > 0 && cognome.length > 0 && confirmPassword === password
            && annoCoca.length > 0 && formazione.length > 0 && codiceCensimento.length > 0
            && branca.length > 0 && descrizione.length > 0;
  }

  async function handleSubmit(event){
    event.preventDefault();

    try{
      const userReturnAuth = await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          'custom:nome': nome,
          'custom:cognome': cognome,
          'custom:anno-coca': annoCoca,
          'custom:formazione': formazione,
          'custom:codice-censimento': codiceCensimento,
          'custom:descrizione': descrizione,
          'custom:branca': branca
        }
      });
      console.log(userReturnAuth);
      props.history.push("/auth/confirm_registration")
    } catch(err){
      alert(err.message);
      console.log(err);
    }
  }


  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <p>Sign Up with credentials</p>
            </div>

            {/* FORM SIGN UP - EMAIL,PASSWORD,NOME,COGNOME & CHECKS */}
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup controlid="nome">
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Nome" type="text" onChange = {e => setNome(e.target.value)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup controlid="cognome">
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Cognome" type="text" onChange = {e => setCognome(e.target.value)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup controlid="username">
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" onChange = {e => setUsername(e.target.value)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup controlid="password">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Password" type="password" onChange = {e => setPassword(e.target.value)}/>  
                </InputGroup>
                <small id="emailHelp" class="form-text text-muted">La Password deve contenere almeno 8 Caratteri, fra cui:</small>
                <small id="emailHelp" class="form-text text-muted">-almeno una lettera Maiuscola</small>
                <small id="emailHelp" class="form-text text-muted">-almeno un Numero</small>
              </FormGroup>
              <FormGroup controlid="confirmPassword">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-check-bold" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Confirm Password" type="password" onChange = {e => setConfirmPassword(e.target.value)}/>
                </InputGroup>
              </FormGroup>
              <div className="text-center text-muted mb-3">
                <p>Alcune informazioni aggiuntive</p>
              </div>
              <FormGroup controlid="annoCoca">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-atom" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Anno Co.Ca." type="text" autoComplete="1" onChange = {e => setAnnoCoca(e.target.value)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup controlid="branca">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-compass-04" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Branca" type="text" autoComplete="N/A" onChange = {e => setBranca(e.target.value)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup controlid="formazione">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-paper-diploma" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Livello Formazione" type="text" autoComplete="N/A" onChange = {e => setFormazione(e.target.value)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup controlid="codiceCensimento">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-tag" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Codice Censimento" type="text" autoComplete="0000000" onChange = {e => setCodiceCensimento(e.target.value)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup controlid="descrizione">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-collection" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Breve Descrizione" type="text" autoComplete="descrizione" onChange = {e => setDescrizione(e.target.value)}/>
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">???</span>
                </small>
              </div>
              <div className="text-center">
                <Button disabled = {!validateForm()} className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}
