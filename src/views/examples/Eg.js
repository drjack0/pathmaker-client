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
  CardTitle,
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

      mainModal: false,
      deleteModal: false,
      mammaModal: false,
      papaModal: false,
      recapitiModal: false,
      sentieroModal: false,
      mensiliModal: false,

      nomeEG:  this.props.eg.nome,
      cognomeEG:  this.props.eg.cognome,

      cellMammaEG: this.props.eg.mamma.cellMamma,
      mailMammaEG: this.props.eg.mamma.mailMamma,
      nomeMammaEG: this.props.eg.mamma.nomeMamma,
      
      cellPapaEG: this.props.eg.papa.cellPapa,
      mailPapaEG: this.props.eg.papa.mailPapa,
      nomePapaEG: this.props.eg.papa.nomePapa,

      censimentoEG: this.props.eg.burocrazia.censimento,

      ottobreEG: this.props.eg.mensili.ottobre,
      novembreEG: this.props.eg.mensili.novembre,
      dicembreEG: this.props.eg.mensili.dicembre,
      gennaioEG: this.props.eg.mensili.gennaio,
      febbraioEG: this.props.eg.mensili.febbraio,
      marzoEG: this.props.eg.mensili.marzo,
      aprileEG: this.props.eg.mensili.aprile,
      maggioEG: this.props.eg.mensili.maggio,
      campoExtraEG: this.props.eg.mensili.campoExtra,
      accontoEstivoEG: this.props.eg.mensili.accontoEstivo,
      saldoEstivoEG: this.props.eg.mensili.saldoEstivo,
      
      casaEG: this.props.eg.recapiti.casa,
      cellulareEG: this.props.eg.recapiti.cellualre,
      indirizzoEG: this.props.eg.recapiti.indirizzo,
      nascitaEG: this.props.eg.recapiti.nascita,
        
      annoEG: this.props.eg.sentiero.anno,
      camminaPerEG: this.props.eg.sentiero.camminaPer,
      incaricoEG: this.props.eg.sentiero.incarico,
      lavoraPerEG: this.props.eg.sentiero.lavoraPer,
      noteSentieroEG: this.props.eg.sentiero.noteSentiero,
      squadrigliaEG: this.props.eg.sentiero.squadriglia,

      nomeObiettivo: "",
      noteObiettivo: "",

      nomeCompetenza: "",
      annoCompetenza: ""
    }
  }

  //MODAL MODIFICA MAIN
  toggleMainModal = () => {
    
  }

  renderMainModal = () => {

  }

  handleMainMod = () => {

  }

  //MODAL ELIMINA

  toggleDeleteModal = () => {

  }

  renderDeleteModal = () => {

  }

  handleDeleteMod = () => {

  }

  //MODAL MODIFICA MAMMA
  toggleMammaModal = () => {

  }

  renderMammaModal = () => {

  }

  handleMammaMod = () => {

  }

  //MODAL MODIFICA PAPA
  togglePapaModal = () => {

  }

  renderPapaModal = () => {

  }

  handlePapaMod = () => {

  }

  //MODAL MODIFICA RECAPITI
  toggleRecapitiModal = () => {

  }

  renderRecapitiModal = () => {

  }

  handleRecapitiMod = () => {

  }

  //MODAL MODIFICA SENTIERO
  toggleSentieroModal = () => {

  }

  renderSentieroModal = () => {

  }

  handleSentieroMod = () => {

  }

  //MODAL MODIFICA MENSILI
  toggleMensiliModal = () => {

  }

  renderMensiliModal = () => {

  }

  handleMensiliMod = () => {

  }

  //UTILS
  birthFormat = (date) => {
    const splitted = date.split("-");
    return splitted[2] + "/" + splitted[1] + "/" + splitted[0];
  }

  updateDateFormat = (date) => {
    const stringDate = new Date(date);
    return stringDate.getDate() + "/" + stringDate.getMonth() + "/" + stringDate.getFullYear();
  }

  renderCompetenze = () => {
    if(this.props.eg.sentiero.competenze.length === 0){
      return "N/A"
    }
    const sortedlist = this.props.eg.sentiero.competenze.sort((a,b) => (a.anno > b.anno) ? 1 : (a.anno === b.anno) ? ((a.nomeCompetenza > b.nomeCompetenza) ? 1 : -1) : -1);
    let ret = "";
    for(var i = 0; i < sortedlist.length; i++){
      let compRet = sortedlist[i].nomeCompetenza + " " + sortedlist[i].anno + ", ";
      ret = ret + compRet;
    }
    return ret.substr(0,ret.length-2)
  }

  renderObiettivi = () => {
    if(this.props.eg.sentiero.obiettivi.length === 0){
      return "N/A"
    }
    const sortedlist = this.props.eg.sentiero.obiettivi.sort((a,b) => (a.nomeObiettivo > b.nomeObiettivo) ? 1 : (a.nomeObiettivo === b.nomeObiettivo) ? ((a.noteObiettivo > b.noteObiettivo) ? 1 : -1) : -1);
    let ret = "";
    for(var i = 0; i < sortedlist.length; i++){
      let compRet = sortedlist[i].nomeObiettivo + " (Note: " + sortedlist[i].noteObiettivo + "), ";
      ret = ret + compRet;
    }
    return ret.substr(0,ret.length-2)
  }


 
  render() {
    console.log("EG PROPS", this.props)
    return (
      <>
      {/* HEADER EG */}
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/squadriglie/tigri.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <span className="mask bg-gradient-default opacity-8" />
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-4 text-white">Scheda Personale</h1>
                <h1 className="display-2 text-white">{this.props.eg.nome} {this.props.eg.cognome}</h1>
                <p className="text-white mt-0 mb-5">
                  Questa è la scheda personale dell'EG. Qui puoi verificare o modificare le
                  informazioni su di lui, aggiungere o modificare mensili o eliminarlo dal sistema.
                </p>                
              </Col>
            </Row>
          </Container>
        </div>

        {/* EG PAGE CONTENT */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">

              {/* MAIN INFORMATION CARD */}
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
                </CardHeader>
                <CardBody className="pt-0 pt-md-4 pb-1">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading text-lg">{this.props.eg.nome} {this.props.eg.cognome}</span>
                          <span className="description h3">{this.props.eg.censcode}</span>
                          <p className="mt-2 description">
                            <span className="description text-success">
                              <i className="fa fa-user-edit" /> Ultimo Aggiornamento {" "}
                            </span>
                             {this.updateDateFormat(this.props.eg.updatedAt)}
                          </p>
                          <p>
                          <span style={{cursor: "pointer"}} className="description text-warning" onClick={this.toggleMainModal}>
                          Modifica
                        </span> {' '}
                        <span style={{cursor: "pointer"}} className="ml-2 description text-primary" onClick={this.toggleDeleteModal}>
                          Elimina
                        </span>
                          </p>
                          
                        </div>
                        
                             
                      </div>
                    </div>
                  </Row>
                </CardBody>
              </Card>

              {/* CARD MAMMA */}
              <Card className="card-stats shadow mt-4 mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Mamma
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mamma.nomeMamma}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Cellulare
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mamma.cellMamma}
                          </span>
                        </div>
                      </Row>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Email
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mamma.mailMamma}
                          </span>
                        </div>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-user-edit" /> Aggiornato al
                        </span>{" "}
                        <span className="text-nowrap">{this.updateDateFormat(this.props.eg.mamma.updateMamma)}</span>
                        <span style={{cursor: "pointer"}} className="ml-4 text-warning" onClick={this.toggleSquadMod}>
                          Modifica
                        </span>
                      </p>
                    </CardBody>
                  </Card>
              
              {/* CARD PAPA */}
              <Card className="card-stats shadow mt-4 mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Papà
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.papa.nomePapa}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Cellulare
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.papa.cellPapa}
                          </span>
                        </div>
                      </Row>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Email
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.papa.mailPapa}
                          </span>
                        </div>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-user-edit" /> Aggiornato al
                        </span>{" "}
                        <span className="text-nowrap">{this.updateDateFormat(this.props.eg.papa.updatePapa)}</span>
                        <span style={{cursor: "pointer"}} className="ml-4 text-warning" onClick={this.toggleSquadMod}>
                          Modifica
                        </span>
                      </p>
                    </CardBody>
                  </Card>
                  
              {/* CARD RECAPITI */}
              <Card className="card-stats shadow mt-4 mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Numero Casa
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.recapiti.casa}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Numero Cellulare
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.recapiti.cellulare}
                          </span>
                        </div>
                      </Row>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Indirizzo
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.recapiti.indirizzo}
                          </span>
                        </div>
                      </Row>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Data di Nascita
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.birthFormat(this.props.eg.recapiti.nascita)}
                          </span>
                        </div>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-user-edit" /> Aggiornato al
                        </span>{" "}
                        <span className="text-nowrap">{this.updateDateFormat(this.props.eg.recapiti.updateRecapiti)}</span>
                        <span style={{cursor: "pointer"}} className="ml-4 text-warning" onClick={this.toggleSquadMod}>
                          Modifica
                        </span>
                      </p>
                    </CardBody>
                  </Card>

              {/* CARD RECAPITI */}
               <Card className="card-stats shadow mt-4 mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Censimento
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.burocrazia.censimento}
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
                          <i className="fa fa-user-edit" /> Aggiornato al
                        </span>{" "}
                        <span className="text-nowrap">{this.updateDateFormat(this.props.eg.burocrazia.updateBurocrazia)}</span>
                        <span style={{cursor: "pointer"}} className="ml-4 text-warning" onClick={this.toggleSquadMod}>
                          Modifica
                        </span>
                      </p>
                    </CardBody>
                  </Card>

            </Col>

            
            <Col className="order-xl-1" xl="8">

              {/* CARD SENTIERO */}
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className ="align-items-center">
                    <div className="col">
                      <h3 className="mb-0 text-success">Sentiero</h3>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col>                  
                  </Row>
                </CardHeader>                
                <CardBody>
                      <Row>
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Squadriglia
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.sentiero.squadriglia}
                          </span>
                        </div>
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Cammina Per
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.sentiero.camminaPer}
                          </span>
                        </div> 
                           
                      </Row>
                      <Row className="mt-4">         
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Incarico
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.sentiero.incarico}
                          </span>
                        </div>
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Anno
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.sentiero.anno}
                          </span>
                        </div>                                
                      </Row>

                      <hr/>

                      <Row className="mt-4">         
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Lavora Per
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.sentiero.lavoraPer}
                          </span>
                        </div>                             
                      </Row>
                      <Row className="mt-4">         
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Obiettivi
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.renderObiettivi()}
                          </span>
                        </div>                              
                      </Row>
                      <Row className="mt-4">         
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Competenze
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.renderCompetenze()}
                          </span>
                        </div>                              
                      </Row>

                      <Row className="mt-4">         
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Note
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.sentiero.noteSentiero}
                          </span>
                        </div>                              
                      </Row>

                      <hr/>

                      <Row >
                    <Col>
                      <div className="card-profile-stats d-flex justify-content-center">
                        <Button type="button" color="success" size="lg" outline className="btn mb-3 mr-3" >Modifica Sentiero</Button>
                        <Button type="button" color="warning" size="lg" outline className="btn mb-3 ml-3" >Aggiungi Obiettivo</Button>
                        <Button type="button" color="warning" size="lg" outline className="btn mb-3 ml-3" >Aggiungi Competenza</Button>
                      </div>
                    </Col>
                  </Row>

                  <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-user-edit" /> Sentiero Aggiornato al
                        </span>{" "}
                        <span className="text-nowrap">{this.updateDateFormat(this.props.eg.sentiero.updateSentiero)}</span>
                      </p>
                    </CardBody>
                
              </Card>
            
            {/* CARD MENSILI */}
              <Card className="bg-secondary shadow mt-4">
                <CardHeader className="bg-white border-0">
                  <Row className ="align-items-center">
                    <div className="col">
                      <h3 className="mb-0 text-warning">Mensili</h3>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col>                  
                  </Row>
                </CardHeader>                
                <CardBody>
                      <Row>
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Ottobre
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mensili.ottobre}
                          </span>
                        </div>
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Novembre
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mensili.novembre}
                          </span>
                        </div>
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Dicembre
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mensili.dicembre}
                          </span>
                        </div> 
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Gennaio
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mensili.gennaio}
                          </span>
                        </div>     
                      </Row>
                      <Row className="mt-4">
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Febbraio
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mensili.febbraio}
                          </span>
                        </div>
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Marzo
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mensili.marzo}
                          </span>
                        </div>
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Aprile
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mensili.aprile}
                          </span>
                        </div> 
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Maggio
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mensili.maggio}
                          </span>
                        </div>     
                      </Row>

                      <hr/>

                      <Row className="mt-4">
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Campo Extra
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mensili.campoExtra}
                          </span>
                        </div>
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Acconto Campo Estivo
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mensili.accontoEstivo}
                          </span>
                        </div>
                        <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Saldo Campo Estivo
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.eg.mensili.saldoEstivo}
                          </span>
                        </div>     
                      </Row>

                      <hr/>

                      <Row className="pb-0">
                    <Col>
                      <div className="card-profile-stats d-flex justify-content-center">
                        <Button type="button" color="success" size="lg" outline className="btn mb-3 mr-3" >Modifica Mensili</Button>
                        <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-user-edit" /> Mensili Aggiornati al
                        </span>{" "}
                        <span className="text-nowrap">{this.updateDateFormat(this.props.eg.mensili.updateMensili)}</span>
                      </p>
                      </div>
                      
                    </Col>
                  </Row>

                  
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
