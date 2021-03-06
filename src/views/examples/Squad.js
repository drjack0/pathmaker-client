/*!

=========================================================
* PathMaker DashBoard React
=========================================================

*/
import React from "react";
import {Link} from "react-router-dom";
import {API} from "aws-amplify"

import {s3UploadSq} from "libs/awsLib.js";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Col,
  CardBody,
  CardTitle,
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
  Label
} from "reactstrap";

// css custom components
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
      genere: "",
      isLoading: true
    }
    this.fileImgSquad = React.createRef();
    this.fileImgURL = ""
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

    const fileImg = await this.handleFileSubmitSquad();

    try{
      const response = await API.put("pathMakerReparto", `/squadriglie/${this.props.squad.squadriglia}`, {
        body: {
          genere: this.state.genere.length > 0 ? genere : this.props.squad.genere,
          note: this.state.note.length > 0 ? this.state.note : this.props.squad.note,
          lavoraPer: this.state.lavoraPer.length > 0 ? this.state.lavoraPer : this.props.squad.lavoraPer,
          imgSquad: fileImg !== null ? fileImg : "img"
        }
      });
      console.log(response);
      this.props.history.go(`admin/squadriglia/${this.props.squad.squadriglia}`)
    } catch(err){
      alert(err);
      console.log(err);
    }

  }

  handleFileSubmitSquad = async () => {
    try{
      const img = this.fileImgSquad.current ? await s3UploadSq(this.fileImgSquad.current,this.props.squad.squadriglia) : null;
      return img;
    } catch(err) {
      console.log(err);
    }
  }
  handleFileChangeImgSquad = (event) => {
    this.fileImgSquad.current = event.target.files[0]
  }

  handleSquadDel = async (event) => {
    event.preventDefault();
    try{
      const response = await API.del("pathMakerReparto",`/squadriglie/${this.props.squad.squadriglia}`);
      console.log(response);
      this.props.history.go(`/admin/squadriglie`);
    } catch(err){
      alert(err);
      console.log(err);
    }
  }

  renderSquadMembersTable = () => {
    return this.props.squadMembers.sort((a,b) => (a.sentiero.anno < b.sentiero.anno) ? 1 : (a.sentiero.anno === b.sentiero.anno) ? ((a.cognome < b.cognome) ? 1 : -1) : -1).map((member,i) => {
      const {nome, cognome, censcode, mamma, papa, recapiti, sentiero, updatedAt} = member;

      let colorIcons;
      switch(sentiero.squadriglia){
        case "Tigri":
          colorIcons = "icon icon-shape bg-pink text-dark rounded-circle shadow mr-3";
          break;
        case "Squali":
          colorIcons = "icon icon-shape bg-green text-dark rounded-circle shadow mr-3";
          break;
        case "Pantere":
          colorIcons = "icon icon-shape bg-yellow text-dark rounded-circle shadow mr-3";
          break;
        case "Lupi":
          colorIcons = "icon icon-shape bg-dark text-yellow rounded-circle shadow mr-3";
          break;
        case "Condor":
          colorIcons = "icon icon-shape bg-blue text-white rounded-circle shadow mr-3";
          break;
        case "Cobra":
          colorIcons = "icon icon-shape bg-orange text-dark rounded-circle shadow mr-3";
          break;
        case "Cerbiatti":
          colorIcons = "icon icon-shape bg-pink text-dark rounded-circle shadow mr-3";
          break;
        case "Castori":
          colorIcons = "icon icon-shape bg-yellow text-blue rounded-circle shadow mr-3";
          break;
      }
      
      let badge;
      switch(sentiero.anno){
        case "1":
          badge = "fas fa-campground";
          break;
        case "2":
          badge = "fas fa-hammer";
          break;
        case "3":
          badge = "fas fa-fire-alt";
          break;
        case "4":
          badge = "far fa-compass";
          break;
        case "5":
          badge = "far fa-flag";
          break;
      }
      const temp = new Date(updatedAt);
      const date = temp.getDate() + "/" + (temp.getMonth()+1) + "/" + temp.getFullYear()

      return (
        <tr key={censcode}>
          <th scope="row">
            <Media className="align-items-center">
              <div className={colorIcons}>
                <i className={badge} />
              </div>
              <Media>
                <span className="mb-0 text-sm"><Link to={"/admin/eg/"+ censcode}>
                    {nome}{' '}{cognome}
                  </Link></span>
              </Media>
            </Media>      
          </th>
          <td className="text-left">{censcode}</td>
          <td className="text-left">{sentiero.incarico}</td>
          <td className="text-left">{sentiero.lavoraPer}</td>
          <td className="text-left">{sentiero.camminaPer}</td>
          <td className="text-left">{date}</td>          
        </tr>
      )
    })
  }

  render() {
    const temp = new Date(this.props.squad.updatedAt);
    const date = temp.getDate() + "/" + (temp.getMonth()+1) + "/" + temp.getFullYear()

    const genere = this.props.squad.genere.toUpperCase() === "F" ? "Femminile" : "Maschile";

    const imgURL=this.props.squadURL.find(x => x.squad === this.props.squad.squadriglia).URL

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              <Row>
                {/* BLOCCO "LAVORA PER" */}
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Lavora Per...
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.squad.lavoraPer}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-briefcase" />
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
                {/* BLOCCO "NOTE" */}
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Note...
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.squad.note}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="far fa-sticky-note" />
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
                
                {/* BLOCCO "SQUADRIGLIA" */}
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Squadriglia {genere}
                          </CardTitle>
                          <span className="text-green h2 font-weight-bold mb-0">{this.props.squad.squadriglia.toUpperCase()}</span>
                        </div>
                        <Col className="col-auto">
                          <Media className="align-items-center">
                            <span className="avatar avatar-xl rounded-circle">
                              <img alt="..." src={imgURL/*"assets/img/theme/squadriglie/pantere.jpg"*/} />
                            </span>
                          </Media>
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
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Membri Squadriglia</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table hover className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Persona</th>
                      <th scope="col">Codice Censimento</th>
                      <th scope="col">Incarico</th>
                      <th scope="col">Lavora Per</th>
                      <th scope="col">Cammina per</th>
                      <th scope="col">Ultimo Aggiornamento</th>
                    </tr>
                  </thead>
                  <tbody>
                        {this.renderSquadMembersTable()}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>

        {/*UPDATE SQUAD MODAL*/}
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
                        <i className="ni ni-spaceship" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder={"Lavora Per: " + this.props.squad.lavoraPer} type="text" onChange={e => this.setState({lavoraPer: e.target.value})}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup controlid="note" className="mb-3 mx-6">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-bullet-list-67" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder={"Note: " + this.props.squad.note} type="text" onChange={e => this.setState({note: e.target.value})}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup controlid="genere" className="mb-3 mx-6">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-active-40" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder={"Genere: " + this.props.squad.genere} type="select" required onChange={e => this.setState({genere: e.target.value})}>
                      <option>Femminile</option>
                      <option>Maschile</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
                <FormGroup controlid="imgSquad" className="mb-3 mx-6">
                  <Label>Immagine Squadriglia</Label>
                  <InputGroup className="input-group-alternative">
                    <Input accept="image/*" type="file" onChange={e => this.handleFileChangeImgSquad(e)}/>
                  </InputGroup>
                </FormGroup>               
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit">Modifica</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleSquadMod}>Indietro</Button>
              </ModalFooter>
            </Form> 
          </div>         
        </Modal>

        {/*DELETE SQUAD MODAL*/}
        <Modal isOpen={this.state.modalSquadDel} toggle={e => this.toggleSquadDel} className="modal-dialog modal-danger modal-dialog-centered modal-">
          <div className="modal-content bg-gradient-danger">
            <ModalHeader toggle={this.toggleSquadDel} />
            <Form role="form" onSubmit={this.handleSquadDel}>
              <ModalBody>
                <div className="py-3 text-center">
                  <i className="ni ni-settings-gear-65 ni-3x"></i>
                  <h4 className="heading mt-4">Squadriglia {this.props.squad.squadriglia}</h4>
                  <p>Sei sicuro di voler eliminare la squadriglia?</p>
                  <p>Per confermare, inserisci qui sotto la parola "delete" e invia la richiesta!</p>
                </div>
                <FormGroup controlid="lavoraPer" className="mb-3 mx-6">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-tag" />
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
      </>
    );
  }
}

export default Squad;
