/*!

=========================================================
* PathMaker DashBoard React
=========================================================

*/
import React from "react";
import {Link} from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
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
  Form
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

import {API} from "aws-amplify";

class Squadriglie extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalAddSquad: false,
      addSquadNome: "",
      addSquadGenere: "",
      addSquadLavoraPer: "",
      addSquadNote: ""
    }
  }

  renderCardSquad = () => {
    return this.props.squad.sort((a,b) => (a.squadriglia < b.squadriglia) ? 1 : -1).map((sq,i) => {
      const {squadriglia, genere, lavoraPer} = sq;
      const imgString = this.props.squadURL.find(x => x.squad === sq.squadriglia).URL;
      return (
        <Col key={squadriglia} lg="6" xl="3" className="pb-2 pt-5">
          <Link to={"/admin/squadriglia/"+ sq.squadriglia.toLowerCase()}>
            <Card className="inner d-flex shadow mb-4 mb-xl-0 border-0">
              <CardImg alt="..." src={imgString} top />
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

  toggleAddSquad = () => {
    this.setState({modalAddSquad: !this.state.modalAddSquad})
  }

  handleAddSquad = async (event) => {
    event.preventDefault();
    let genere;
    if(this.state.genere === "Femminile"){
      genere = "F"
    } else {
      genere = "M"
    }
    try{
      const response = await API.post("pathMakerReparto", `/squadriglie`, {
        body: {
          squadriglia: this.state.addSquadNome,
          genere: genere,
          note: this.state.addSquadNote,
          lavoraPer: this.state.addSquadLavoraPer
        }
      });
      console.log(response);
      this.props.history.go(`admin/squadriglie`)
    } catch(err){
      alert(err);
      console.log(err);
    }

  }

  render() {
    return (
      <>
        <Header {...this.props} />

        <Container className="mt--7" fluid>
          <Row>
            {this.renderCardSquad()}
            <Col lg="6" xl="3" className="pb-2 pt-5">
              <a style={{cursor: "pointer"}} onClick={this.toggleAddSquad}>
                <Card className="inner d-flex shadow mb-4 mb-xl-0 border-0">
                  <CardImg alt="..." src={require("assets/img/theme/add-plus.jpg")} top />
                  <CardImgOverlay className="flex-center text-center align-items-center">
                    <div>
                      <CardTitle className="d-flex align-items-center text-center h1 text-white mb-2">Aggiungi Squadriglia</CardTitle>
                      <CardText className="d-flex align-items-center text-white font-weight-bold">
                        Clicca qui sopra per aggiungere una squadriglia
                      </CardText>
                    </div>
                  </CardImgOverlay>
                </Card>
              </a>              
            </Col>
          </Row>
          
          {/*ADD SQUAD MODAL*/}
          <Modal isOpen={this.state.modalAddSquad} toggle={e => this.toggleAddSquad} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleAddSquad} />
              <Form role="form" onSubmit={this.handleAddSquad}>
                <ModalBody>
                  <div className="py-3 text-center">
                    <i className="ni ni-button-power ni-3x"></i>
                    <h4 className="heading mt-4">Squadriglia</h4>
                    <p>Aggiungi una squadriglia al Reparto</p>
                  </div>
                  <FormGroup controlid="nomeSquad" className="mb-3 mx-6">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-shop" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Squadriglia" type="text" onChange={e => this.setState({addSquadNome: e.target.value})}/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup controlid="lavoraPer" className="mb-3 mx-6">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-shop" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Lavora Per..." type="text" onChange={e => this.setState({addSquadLavoraPer: e.target.value})}/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup controlid="note" className="mb-3 mx-6">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-money-coins" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Note" type="text" onChange={e => this.setState({addSquadNote: e.target.value})}/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup controlid="genere" className="mb-3 mx-6">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-credit-card" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Genere" type="select" required onChange={e => this.setState({adSquadGenere: e.target.value})}>
                        <option>Femminile</option>
                        <option>Maschile</option>
                      </Input>
                    </InputGroup>
                  </FormGroup>                    
                </ModalBody>
                <ModalFooter>
                  <Button className="btn btn-white" type="submit">Aggiungi Squadriglia</Button>
                  <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleAddSquad}>Indietro</Button>
                </ModalFooter>
              </Form> 
            </div>         
          </Modal>

        </Container>
      </>
    );
  }
}

export default Squadriglie;
