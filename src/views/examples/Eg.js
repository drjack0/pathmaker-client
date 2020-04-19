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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col,
  Collapse,
  ListGroup,
  ListGroupItem,
  Label
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { Auth, API, Storage } from "aws-amplify";

import {s3UploadAutorizzazione,s3UploadCensimento,s3UploadPrivacy,s3UploadSS, s3UploadTS} from "libs/awsLib.js";

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {

      mainModal: false,
      mammaModal: false,
      papaModal: false,
      recapitiModal: false,
      sentieroModal: false,
      mensiliModal: false,
      burocraziaModal: false,

      deleteModal: false,
      delConfirm: "",

      nomeEG:  "",
      cognomeEG:  "",

      cellMammaEG: "",
      mailMammaEG: "",
      nomeMammaEG: "",
      
      cellPapaEG: "",
      mailPapaEG: "",
      nomePapaEG: "",

      censimentoEG: "",

      ottobreEG: "",
      novembreEG: "",
      dicembreEG: "",
      gennaioEG: "",
      febbraioEG: "",
      marzoEG: "",
      aprileEG: "",
      maggioEG: "",
      campoExtraEG: "",
      accontoEstivoEG: "",
      saldoEstivoEG: "",
      
      casaEG: "",
      cellulareEG: "",
      indirizzoEG: "",
      nascitaEG: "",
        
      annoEG: "",
      camminaPerEG: "",
      incaricoEG: "",
      lavoraPerEG: "",
      noteSentieroEG: "",
      squadrigliaEG: "",

      nomeObiettivo: "",
      noteObiettivo: "",

      nomeCompetenza: "",
      annoCompetenza: "",

      burocraziaCollapse: false,
      competenzeCollapse: false,
      obiettiviCollapse: false,
      addObiettivo: false,
      addCompetenza: false,

      nomeCompetenza: "",
      annoCompetenza: "",

      nomeObiettivo: "",
      noteObiettivo: ""
    }

    this.fileAutorizzazione = React.createRef();
    this.fileCensimento = React.createRef();
    this.filePrivacy = React.createRef();
    this.fileSS = React.createRef();
    this.fileTS = React.createRef();
  }

  toggleCompetenzeCollapse = () => {
    this.setState({competenzeCollapse: !this.state.competenzeCollapse})
  }
  toggleObiettiviCollapse = () => {
    this.setState({obiettiviCollapse: !this.state.obiettiviCollapse})
  }
  toggleBurocraziaCollapse = () => {
    this.setState({burocraziaCollapse: !this.state.burocraziaCollapse});
  }

  //MODAL MODIFICA MAIN
  toggleMainModal = () => {
    this.setState({mainModal: !this.state.mainModal})
  }
  handleMainModal = async (event) => {
    event.preventDefault();
    try{
      const response = await API.put("pathMakerReparto", `/reparto/${this.props.eg.censcode}`, {
        body: {
          nome: this.state.nomeEG.length > 0 ? this.state.nomeEG : this.props.eg.nome,
          cognome: this.state.cognomeEG.length > 0 ? this.state.cognomeEG : this.props.eg.cognome
        }
      });
      console.log(response);
      this.props.history.go(`admin/eg/${this.props.eg.censcode}`)
    } catch(err) {
      alert(err);
      console.log(err);
    }
  }

  //MODAL ELIMINA
  toggleDeleteModal = () => {
    this.setState({deleteModal: !this.state.deleteModal})
  }

  validateDeleteForm = () => {
    return this.state.delConfirm === "delete";
  }

  handleDeleteModal = async (event) => {
    event.preventDefault();
    try{
      await this.removeMemberDocuments();
      const response = await API.del("pathMakerReparto",`/reparto/${this.props.eg.censcode}`);
      console.log(response);
      this.props.history.go(`/admin/squadriglie`);
    } catch(err){
      alert(err);
      console.log(err);
    }
  }

  //MODAL MODIFICA MAMMA
  toggleMammaModal = () => {
    this.setState({mammaModal: !this.state.mammaModal})
  }

  handleMammaModal = async (event) => {
    event.preventDefault();
    try{
      const response = await API.put("pathMakerReparto", `/reparto/mamma/${this.props.eg.censcode}`, {
        body: {
          nomeMamma: this.state.nomeMammaEG.length > 0 ? this.state.nomeMammaEG : this.props.eg.mamma.nomeMamma,
          cellMamma: this.state.cellMammaEG.length > 0 ? this.state.cellMammaEG : this.props.eg.mamma.cellMamma,
          mailMamma: this.state.mailMammaEG.length > 0 ? this.state.mailMammaEG : this.props.eg.mamma.mailMamma         
        }
      });
      console.log(response);
      this.props.history.go(`admin/eg/${this.props.eg.censcode}`)
    } catch(err) {
      alert(err);
      console.log(err);
    }
  }

  //MODAL MODIFICA PAPA
  togglePapaModal = () => {
    this.setState({papaModal: !this.state.papaModal})
  }

  handlePapaModal = async (event) => {
    event.preventDefault();
    try{
      const response = await API.put("pathMakerReparto", `/reparto/papa/${this.props.eg.censcode}`, {
        body: {
          nomePapa: this.state.nomePapaEG.length > 0 ? this.state.nomePapaEG : this.props.eg.papa.nomePapa,
          cellPapa: this.state.cellPapaEG.length > 0 ? this.state.cellPapaEG : this.props.eg.papa.cellPapa,
          mailPapa: this.state.mailPapaEG.length > 0 ? this.state.mailPapaEG : this.props.eg.papa.mailPapa         
        }
      });
      console.log(response);
      this.props.history.go(`admin/eg/${this.props.eg.censcode}`)
    } catch(err) {
      alert(err);
      console.log(err);
    }
  }

  //MODAL MODIFICA RECAPITI
  toggleRecapitiModal = () => {
    this.setState({recapitiModal: !this.state.recapitiModal})
  }

  handleRecapitiModal = async (event) => {
    event.preventDefault();
    try{
      const response = await API.put("pathMakerReparto", `/reparto/recapiti/${this.props.eg.censcode}`, {
        body: {
          casa: this.state.casaEG.length > 0 ? this.state.casaEG : this.props.eg.recapiti.casa,
          cellulare: this.state.cellulareEG.length > 0 ? this.state.cellulareEG : this.props.eg.recapiti.cellulare,
          indirizzo: this.state.indirizzoEG.length > 0 ? this.state.indirizzoEG : this.props.eg.recapiti.indirizzo,
          dataNascita: this.state.nascitaEG.length > 0 ? this.state.nascitaEG : this.props.eg.recapiti.nascita,          
        }
      });
      console.log(response);
      this.props.history.go(`admin/eg/${this.props.eg.censcode}`)
    } catch(err) {
      alert(err);
      console.log(err);
    }
  }

  //MODAL MODIFICA SENTIERO
  toggleSentieroModal = () => {
    this.setState({sentieroModal: !this.state.sentieroModal})
  }

  handleSentieroModal = async (event) => {
    event.preventDefault();
    try{
      const response = await API.put("pathMakerReparto", `/reparto/sentiero/${this.props.eg.censcode}`, {
        body: {
          squadriglia: this.state.squadrigliaEG.length > 0 ? this.state.squadrigliaEG : this.props.eg.sentiero.squadriglia,
          camminaPer: this.state.camminaPerEG.length > 0 ? this.state.camminaPerEG : this.props.eg.sentiero.camminaPer,
          incarico: this.state.incaricoEG.length > 0 ? this.state.incaricoEG : this.props.eg.sentiero.incarico,
          anno: this.state.annoEG.length > 0 ? this.state.annoEG : this.props.eg.sentiero.anno,
          lavoraPer: this.state.lavoraPerEG.length > 0 ? this.state.lavoraPerEG : this.props.eg.sentiero.lavoraPer,
          noteSentiero: this.state.noteSentieroEG.length > 0 ? this.state.noteSentieroEG : this.props.eg.sentiero.noteSentiero
        }
      });
      console.log(response);
      this.props.history.go(`admin/eg/${this.props.eg.censcode}`)
    } catch(err) {
      alert(err);
      console.log(err);
    }
  }

  //MODAL MODIFICA MENSILI
  toggleMensiliModal = () => {
    this.setState({mensiliModal: !this.state.mensiliModal})
  }

  handleMensiliModal = async (event) => {
    event.preventDefault();
    try{
      const response = await API.put("pathMakerReparto", `/reparto/mensili/${this.props.eg.censcode}`, {
        body: {
          ottobre: this.state.ottobreEG.length > 0 ? this.state.ottobreEG : this.props.eg.mensili.ottobre,
          novembre: this.state.novembreEG.length > 0 ? this.state.novembreEG : this.props.eg.mensili.novembre,
          dicembre: this.state.dicembreEG.length > 0 ? this.state.dicembreEG : this.props.eg.mensili.dicembre,
          gennaio: this.state.gennaioEG.length > 0 ? this.state.gennaioEG : this.props.eg.mensili.gennaio,
          febbraio: this.state.febbraioEG.length > 0 ? this.state.febbraioEG : this.props.eg.mensili.febbraio,
          marzo: this.state.marzoEG.length > 0 ? this.state.marzoEG : this.props.eg.mensili.marzo,
          aprile: this.state.aprileEG.length > 0 ? this.state.aprileEG : this.props.eg.mensili.aprile,
          maggio: this.state.maggioEG.length > 0 ? this.state.maggioEG : this.props.eg.mensili.maggio,
          campoExtra: this.state.campoExtraEG.length > 0 ? this.state.campoExtraEG : this.props.eg.mensili.campoExtra,
          accontoEstivo: this.state.accontoEstivoEG.length > 0 ? this.state.accontoEstivoEG : this.props.eg.mensili.accontoEstivo,
          saldoEstivo: this.state.saldoEstivoEG.length > 0 ? this.state.saldoEstivoEG : this.props.eg.mensili.saldoEstivo,
        }
      });
      console.log(response);
      this.props.history.go(`admin/eg/${this.props.eg.censcode}`)
    } catch(err) {
      alert(err);
      console.log(err);
    }
  }

  //MODAL MODIFICA BUROCRAZIA

  toggleBurocraziaModal = () => {
    this.setState({burocraziaModal: !this.state.burocraziaModal})
  }

  handleBurocraziaModal = async (event) => {
    event.preventDefault();
    const autorizzazioneKey = await this.handleFileSubmitAutorizzazione(event);
    const censimentoKey = await this.handleFileSubmitCensimento(event);
    const privacyKey= await this.handleFileSubmitPrivacy(event);
    const ssKey = await this.handleFileSubmitSS(event);
    const tsKey = await this.handleFileSubmitTS(event);

    console.log(autorizzazioneKey,censimentoKey,privacyKey,ssKey,tsKey);

    try{
      const response = await API.put("pathMakerReparto", `/reparto/burocrazia/${this.props.eg.censcode}`, {
        body: {
          censimento: this.state.censimentoEG.length > 0 ? this.state.censimentoEG : this.props.eg.burocrazia.censimento,
          autorizzazioneDocumento: autorizzazioneKey !== null ? autorizzazioneKey : "link",
          censimentoDocumento: censimentoKey !== null ? censimentoKey : "link",
          privacyDocumento: privacyKey !== null ? privacyKey : "link",
          ssDocumento: ssKey !== null ? ssKey : "link",
          tsDocumento: tsKey !== null ? tsKey : "link"
        }
      });
      console.log(response);
      this.props.history.go(`admin/eg/${this.props.eg.censcode}`)
    } catch(err) {
      alert(err);
      console.log(err);
    }
  }

  handleFileChangeAutorizzazione = (event) => {
    this.fileAutorizzazione.current = event.target.files[0]
  }
  handleFileSubmitAutorizzazione = async () => {
    
    try{
      const autorizzazione = this.fileAutorizzazione.current ? await s3UploadAutorizzazione(this.fileAutorizzazione.current,this.props.eg.censcode,this.props.eg.cognome,this.props.eg.nome) : null;
      console.log(autorizzazione);
      return autorizzazione;
    } catch(err) {
      console.log(err);
    }
  }

  handleFileChangeCensimento = (event) => {
    this.fileCensimento.current = event.target.files[0]
  }

  handleFileSubmitCensimento = async () => {
    
    try{
      const censimento = this.fileCensimento.current ? await s3UploadCensimento(this.fileCensimento.current,this.props.eg.censcode,this.props.eg.cognome,this.props.eg.nome) : null;
      console.log(censimento);
      return censimento;
    } catch(err) {
      console.log(err);
    }
  }

  handleFileChangePrivacy = (event) => {
    this.filePrivacy.current = event.target.files[0]
  }

  handleFileSubmitPrivacy = async () => {
    
    try{
      const privacy = this.filePrivacy.current ? await s3UploadPrivacy(this.filePrivacy.current,this.props.eg.censcode,this.props.eg.cognome,this.props.eg.nome) : null;
      console.log(privacy);
      return privacy;
    } catch(err) {
      console.log(err);
    }
  }

  handleFileChangeScheda = (event) => {
    this.fileSS.current = event.target.files[0]
  }

  handleFileSubmitSS = async () => {
    
    try{
      const scheda = this.fileSS.current ? await s3UploadSS(this.fileSS.current,this.props.eg.censcode,this.props.eg.cognome,this.props.eg.nome) : null;
      console.log(scheda);
      return scheda;
    } catch(err) {
      console.log(err);
    }
  }

  handleFileChangeTessera = (event) => {
    this.fileTS.current = event.target.files[0]
  }

  handleFileSubmitTS = async () => {
    
    try{
      const tessera = this.fileTS.current ? await s3UploadTS(this.fileTS.current,this.props.eg.censcode,this.props.eg.cognome,this.props.eg.nome) : null;
      console.log(tessera);
      return tessera;
    } catch(err) {
      console.log(err);
    }
  }

  getDocument = async (event, type,format) => {
    event.preventDefault()
    const typeString = type.toString();
    const formatString = format.toString();
    const res = await Storage.get(`${typeString}/${formatString}-${this.props.eg.censcode}-${this.props.eg.cognome}-${this.props.eg.nome}`).then(data => {return data});
    console.log(res);
    window.open(res.toString());
  }
  removeMemberDocuments = async() => {
    const censimentoString = `censimenti/Censimento-${this.props.eg.censcode}-${this.props.eg.cognome}-${this.props.eg.nome}`;
    const autorizzazioneString = `autorizzazioni/Autorizzazione-${this.props.eg.censcode}-${this.props.eg.cognome}-${this.props.eg.nome}`;
    const privacyString = `privacy/Privacy-${this.props.eg.censcode}-${this.props.eg.cognome}-${this.props.eg.nome}`;
    const ssString = `schede/SS-${this.props.eg.censcode}-${this.props.eg.cognome}-${this.props.eg.nome}`;
    const tsString = `tessere/TS-${this.props.eg.censcode}-${this.props.eg.cognome}-${this.props.eg.nome}`;

    const resCensimento = await Storage.remove(censimentoString).then(data => {return data});
    const resAutorizzazione = await Storage.remove(autorizzazioneString).then(data => {return data});
    const resPrivacy = await Storage.remove(privacyString).then(data => {return data});
    const resSS = await Storage.remove(ssString).then(data => {return data});
    const resTS = await Storage.remove(tsString).then(data => {return data});

    console.log(resCensimento,resAutorizzazione,resPrivacy,resSS, resTS);
  } 

  //UTILS
  birthFormat = (date) => {
    const splitted = date.split("-");
    return splitted[2] + "/" + splitted[1] + "/" + splitted[0];
  }

  updateDateFormat = (date) => {
    const stringDate = new Date(date);
    return stringDate.getDate() + "/" + (stringDate.getMonth()+1) + "/" + stringDate.getFullYear();
  }

  setBackIcon = () => {
    let colorIcons;
    switch(this.props.eg.sentiero.squadriglia){
      case "Tigri":
        colorIcons= "icon icon-shape bg-pink text-dark rounded-circle shadow mr-3";
        break
      case "Squali":
        colorIcons= "icon icon-shape bg-green text-dark rounded-circle shadow mr-3";
        break;
      case "Pantere":
        colorIcons= "icon icon-shape bg-yellow text-dark rounded-circle shadow mr-3";
        break;
      case "Lupi":
        colorIcons= "icon icon-shape bg-dark text-yellow rounded-circle shadow mr-3";
        break;
      case "Condor":
        colorIcons= "icon icon-shape bg-blue text-white rounded-circle shadow mr-3";
        break;
      case "Cobra":
        colorIcons= "icon icon-shape bg-orange text-dark rounded-circle shadow mr-3";
        break;
      case "Cerbiatti":
        colorIcons= "icon icon-shape bg-pink text-dark rounded-circle shadow mr-3";
        break;
      case "Castori":
        colorIcons = "icon icon-shape bg-yellow text-blue rounded-circle shadow mr-3";
        break;
    }
    return colorIcons
  }


  //OBIETTIVI E COMPETENZE -> CRUD OPERATIONS
  toggleAddObiettivoModal = () => {
    this.setState({addObiettivo: !this.state.addObiettivo})
  }
  toggleAddCompetenzaModal = () => {
    this.setState({addCompetenza: !this.state.addCompetenza})
  }

  renderCompetenzeList = () => {
    if(this.props.eg.sentiero.competenze.length === 0){
      return (<p>Nessuna Competenza Registrata</p>);
    }
    return this.props.eg.sentiero.competenze.map((comp,index) => {
      const {anno, nomeCompetenza} = comp;
      return (
        <ListGroupItem key={index} className="h2 font-weight-bold mb-0">
          {anno} - {nomeCompetenza} {' '}
          <span className="ml-4 text-red">
          <i className="far fa-trash-alt" style={{cursor: "pointer"}} onClick={e => this.deleteCompetenza(e,index)}/>
          </span>
        </ListGroupItem>
      );
    });
  }

  renderObiettiviList = () => {
    if(this.props.eg.sentiero.obiettivi.length === 0){
      return (<p>Nessun Obiettivo Registrato</p>);
    }
    return this.props.eg.sentiero.obiettivi.map((ob,index) => {
      const {nomeObiettivo, noteObiettivo} = ob;
      return (
        <ListGroupItem key={index} className="h2 font-weight-bold mb-0">
          {nomeObiettivo} - Note: {noteObiettivo} {' '}
          <span className="ml-4 text-red">
          <i className="far fa-trash-alt" style={{cursor: "pointer"}} onClick={e => this.deleteObiettivo(e,index)}/>
          </span>
        </ListGroupItem>
      );
    });
  }

  deleteObiettivo = async (event,index) => {
    console.log(index);
    event.preventDefault();
    try{
      const res = await API.put("pathMakerReparto",`/reparto/sentiero/deleteobiettivo/${this.props.eg.censcode}`, {
        body: {
          obIndex: index
        }
      });
      console.log(res);
      this.props.history.go(`/admin/eg/${this.props.eg.censcode}`)
    } catch(err){
      console.log(err)
    }
  }

  deleteCompetenza = async (event,index) => {
    console.log(index);
    event.preventDefault();
    try{
      const res = await API.put("pathMakerReparto",`/reparto/sentiero/deletecompetenza/${this.props.eg.censcode}`, {
        body: {
          compIndex: index
        }
      });
      console.log(res);
      this.props.history.go(`/admin/eg/${this.props.eg.censcode}`)
    } catch(err){
      console.log(err)
    }
  }

  handleAddObiettivo = async (event) => {
    event.preventDefault();
    try{
      const res = await API.put("pathMakerReparto", `/reparto/sentiero/addobiettivo/${this.props.eg.censcode}`, {
        body: {
          nomeObiettivo: this.state.nomeObiettivo.length > 0 ? this.state.nomeObiettivo : "N/A",
          noteObiettivo: this.state.noteObiettivo.length > 0 ? this.state.noteObiettivo : "N/A"
        }
      });
      console.log(res);
      this.props.history.go(`/admin/eg/${this.props.eg.censcode}`)
    } catch(err) {
      console.log(err);
    }
  }

  handleAddCompetenza = async (event) => {
    event.preventDefault();
    try{
      const res = await API.put("pathMakerReparto", `/reparto/sentiero/addcompetenza/${this.props.eg.censcode}`, {
        body: {
          nomeCompetenza: this.state.nomeCompetenza.length > 0 ? this.state.nomeCompetenza : "N/A",
          anno: this.state.annoCompetenza.length > 0 ? this.state.annoCompetenza : "N/A"
        }
      });
      console.log(res);
      this.props.history.go(`/admin/eg/${this.props.eg.censcode}`)
    } catch(err) {
      console.log(err);
    }
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
            backgroundImage: "url(" + this.props.squadURL.find(x => x.squad === this.props.eg.sentiero.squadriglia).URL.toString() + ")",
              //"url(" + require("assets/img/theme/squadriglie/" + this.props.eg.sentiero.squadriglia.toLowerCase() + ".jpg") + ")",
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
                          src={require("assets/img/theme/img-800.jpg")}
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
                          <div className={this.setBackIcon()}>
                            <i className="fas fa-female" />
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
                        <span style={{cursor: "pointer"}} className="ml-4 text-warning" onClick={this.toggleMammaModal}>
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
                          <div className={this.setBackIcon()}>
                            <i className="fas fa-male" />
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
                        <span style={{cursor: "pointer"}} className="ml-4 text-warning" onClick={this.togglePapaModal}>
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
                          <div className={this.setBackIcon()}>
                            <i className="far fa-id-card" />
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
                        <span style={{cursor: "pointer"}} className="ml-4 text-warning" onClick={this.toggleRecapitiModal}>
                          Modifica
                        </span>
                      </p>
                    </CardBody>
                  </Card>

              {/* CARD BUROCRAZIA */}
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
                          <div className={this.setBackIcon()}>
                            <i className="fas fa-file-contract" />
                          </div>
                        </Col>
                      </Row>
                      
                      <Row className="mt-4">         
                        <div className="col">
                        <CardTitle tag="h5" style={{cursor: "pointer"}} className="text-uppercase text-muted mb-0" onClick={this.toggleBurocraziaCollapse}>
                            Burocrazia
                          </CardTitle>
                          <span style={{cursor: "pointer"}} className="h4 font-weight-bold mb-0" onClick={this.toggleBurocraziaCollapse}>
                            Clicca qui per sapere di più
                          </span>
                          <Collapse isOpen={this.state.burocraziaCollapse}>
                            <ListGroup flush={true}>
                              <ListGroupItem className="h3 font-weight-bold mb-0">
                              Censimento:  {this.props.eg.burocrazia.fogliCensimento.consegnato} {' '}
                               {this.props.eg.burocrazia.fogliCensimento.documento !== "link" ? 
                                  (<div>
                                  <span className="ml-4 text-primary">
                                    <i className="far fa-eye" style={{cursor: "pointer"}} onClick={e => this.getDocument(e,"censimenti","Censimento")}/>
                                  </span>
                                  <p>Consegnato il {this.updateDateFormat(this.props.eg.burocrazia.fogliCensimento.dataConsegna)}</p>
                                  </div>) : 
                                  <span>{' '}</span>
                                 }
                              </ListGroupItem>
                              <ListGroupItem className="h3 font-weight-bold mb-0">
                              Privacy:   {this.props.eg.burocrazia.privacy.consegnato} {' '}
                              {this.props.eg.burocrazia.privacy.documento !== "link" ?
                                  (<div>
                                  <span className="ml-4 text-primary">
                                    <i className="far fa-eye" style={{cursor: "pointer"}} onClick={e => this.getDocument(e,"privacy","Privacy")}/>
                                  </span>
                                  <p>Consegnato il {this.updateDateFormat(this.props.eg.burocrazia.privacy.dataConsegna)}</p>
                                  </div>) : 
                                  <span>{' '}</span>
                                 }
                              </ListGroupItem>
                              <ListGroupItem className="h3 font-weight-bold mb-0">
                              Autorizzazione:  {this.props.eg.burocrazia.autorizzazione.consegnato} {' '}
                              {this.props.eg.burocrazia.autorizzazione.documento !== "link" ? 
                                  (<div>
                                  <span className="ml-4 text-primary">
                                    <i className="far fa-eye" style={{cursor: "pointer"}} onClick={e => this.getDocument(e,"autorizzazioni","Autorizzazione")}/>
                                  </span>
                                  <p>Consegnato il {this.updateDateFormat(this.props.eg.burocrazia.autorizzazione.dataConsegna)}</p>
                                  </div>) : 
                                  <span>{' '}</span>
                                 }
                              </ListGroupItem>
                              <ListGroupItem className="h3 font-weight-bold mb-0">
                              Scheda:  {this.props.eg.burocrazia.schedaSanitaria.consegnato} {' '}
                              {this.props.eg.burocrazia.schedaSanitaria.documento !== "link" ? 
                                  (<div><span className="ml-4 text-primary">
                                    <i className="far fa-eye" style={{cursor: "pointer"}} onClick={e => this.getDocument(e,"schede","SS")}/>
                                  </span>
                                  <p>Consegnato il {this.updateDateFormat(this.props.eg.burocrazia.schedaSanitaria.dataConsegna)}</p>
                                  </div> ): 
                                  <span>{' '}</span>            
                                 }  
                              </ListGroupItem>
                              <ListGroupItem className="h3 font-weight-bold mb-0">
                              Tessera:  {this.props.eg.burocrazia.tesseraSanitaria.consegnato} {' '}
                              {this.props.eg.burocrazia.tesseraSanitaria.documento !== "link" ? 
                                  (<div>
                                    <span className="ml-4 text-primary">
                                      <i className="far fa-eye" style={{cursor: "pointer"}} onClick={e => this.getDocument(e,"tessere","TS")}/>
                                    </span>
                                    <p>Consegnato il {this.updateDateFormat(this.props.eg.burocrazia.tesseraSanitaria.dataConsegna)}</p>
                                  </div>) : 
                                  <span>{' '}</span>
                                 }
                              </ListGroupItem>
                            </ListGroup>
                          </Collapse>
                        </div>                              
                      </Row>
                      
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-user-edit" /> Aggiornato al
                        </span>{" "}
                        <span className="text-nowrap">{this.updateDateFormat(this.props.eg.burocrazia.updateBurocrazia)}</span>
                        <span style={{cursor: "pointer"}} className="ml-4 text-warning" onClick={this.toggleBurocraziaModal}>
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
                      <div className={this.setBackIcon()}>
                        <i className="far fa-compass" />
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
                        <CardTitle tag="h5" style={{cursor: "pointer"}} className="text-uppercase text-muted mb-0" onClick={this.toggleObiettiviCollapse}>
                            Obiettivi
                          </CardTitle>
                          <span style={{cursor: "pointer"}} className="h4 font-weight-bold mb-0" onClick={this.toggleObiettiviCollapse}>
                            Clicca qui per sapere di più
                          </span>
                          <Collapse isOpen={this.state.obiettiviCollapse}>
                            <ListGroup flush={true}>
                              {this.renderObiettiviList()}
                              <ListGroupItem>
                                <Button outline color="primary" onClick={this.toggleAddObiettivoModal}>Aggiungi Obiettivo</Button>
                              </ListGroupItem>
                            </ListGroup>
                          </Collapse>
                        </div>                              
                      </Row>

                      <Row className="mt-4">         
                        <div className="col">
                        <CardTitle style={{cursor: "pointer"}} tag="h5" className="text-uppercase text-muted mb-0" onClick={this.toggleCompetenzeCollapse}>
                            Competenze
                          </CardTitle>
                          
                          <span style={{cursor: "pointer"}} className="h4 font-weight-bold mb-0" onClick={this.toggleCompetenzeCollapse}>
                            Clicca qui per sapere di più
                          </span>
                          <Collapse isOpen={this.state.competenzeCollapse}>
                            <ListGroup>
                              {this.renderCompetenzeList()}
                              <ListGroupItem>
                                <Button outline color="primary" onClick={this.toggleAddCompetenzaModal}>Aggiungi Competenza</Button>
                              </ListGroupItem>
                            </ListGroup>
                          </Collapse>
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
                        <Button type="button" color="success" size="lg" outline className="btn mb-3 mr-3" onClick={this.toggleSentieroModal}>Modifica Sentiero</Button>
                        <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-user-edit" /> Sentiero Aggiornato al
                        </span>{" "}
                        <span className="text-nowrap">{this.updateDateFormat(this.props.eg.sentiero.updateSentiero)}</span>
                      </p>
                      </div>
                    </Col>
                  </Row>

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
                      <div className={this.setBackIcon()}>
                        <i className="fas fa-credit-card" />
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
                        <Button type="button" color="success" size="lg" outline className="btn mb-3 mr-3" onClick={this.toggleMensiliModal}>Modifica Mensili</Button>
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

          {/* MODAL MAIN INFORMATION */}
          <Modal isOpen={this.state.mainModal} toggle={e => this.toggleMainModal} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleMainModal} />
              <Form role="form" onSubmit={this.handleMainModal}>
              <ModalBody>
                <div className="py-3 text-center">
                  <i className="ni ni-button-power ni-3x"></i>
                  <h4 className="heading mt-4">{this.props.eg.nome} {this.props.eg.cognome}</h4>
                  <p>Modifica i Dati Principali</p>
                  <p>Per non modificare un campo, lascialo così com'è!</p>
                </div>          
                    <FormGroup controlid="nomeEG" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-ghost" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Nome: " + this.props.eg.nome} type="text" onChange={e => this.setState({nomeEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="cognomeEG" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-signature" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Cognome: " + this.props.eg.cognome} type="text" onChange={e => this.setState({cognomeEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>                    
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit">Modifica</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleMainModal}>Indietro</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>

          
          {/* MODAL DELETE INFORMATION */}
          <Modal isOpen={this.state.deleteModal} toggle={e => this.toggleDeleteModal} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleDeleteModal} />
              <Form role="form" onSubmit={this.handleDeleteModal}>
              <ModalBody>
                <div className="py-3 text-center">
                  <i className="ni ni-settings-gear-65 ni-3x"></i>
                  <h4 className="heading mt-4">{this.props.eg.nome} {this.props.eg.cognome}</h4>
                  <p>Sei sicuro di voler eliminare questo EG?</p>
                  <p>Per confermare, inserisci qui sotto la parola "delete" e invia la richiesta!</p>
                </div>
                  
                    <FormGroup controlid="lavoraPer" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-signature" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" onChange={e => this.setState({delConfirm: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>

                    </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit" disabled={!this.validateDeleteForm()}>Rimuovi {this.props.eg.nome}</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleDeleteModal}>Indietro</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>
          
          {/* MODAL MAMMA INFORMATION */}
          <Modal isOpen={this.state.mammaModal} toggle={e => this.toggleMammaModal} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleMammaModal} />
              <Form role="form" onSubmit={this.handleMammaModal}>
              <ModalBody>
                <div className="py-3 text-center">
                  <i class="far fa-user-circle fa-3x"></i>
                  <h4 className="heading mt-4">{this.props.eg.nome} {this.props.eg.cognome}</h4>
                  <p>Modifica i Dati della Mamma</p>
                  <p>Per non modificare un campo, lascialo così com'è!</p>
                </div>          
                    <FormGroup controlid="nomeMamma" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-signature" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Nome Mamma: " + this.props.eg.mamma.nomeMamma} type="text" onChange={e => this.setState({nomeMammaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="cellMamma" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-phone" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Cellulare Mamma: " + this.props.eg.mamma.cellMamma} type="text" onChange={e => this.setState({cellMammaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="cognomeEG" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-envelope" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Mail Mamma: " + this.props.eg.mamma.mailMamma} type="text" onChange={e => this.setState({mailMammaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>                     
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit">Modifica</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleMammaModal}>Indietro</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>


          {/* MODAL PAPA INFORMATION */}
          <Modal isOpen={this.state.papaModal} toggle={e => this.togglePapaModal} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.togglePapaModal} />
              <Form role="form" onSubmit={this.handlePapaModal}>
              <ModalBody>
                <div className="py-3 text-center">
                  <i class="far fa-user-circle fa-3x"></i>
                  <h4 className="heading mt-4">{this.props.eg.nome} {this.props.eg.cognome}</h4>
                  <p>Modifica i Dati del Papà</p>
                  <p>Per non modificare un campo, lascialo così com'è!</p>
                </div>          
                    <FormGroup controlid="nomePapa" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-signature" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Nome Papà: " + this.props.eg.papa.nomePapa} type="text" onChange={e => this.setState({nomePapaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="cellPapa" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-phone" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Cellulare Papà: " + this.props.eg.papa.cellPapa} type="text" onChange={e => this.setState({cellPapaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="cognomeEG" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-envelope" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Mail Papà: " + this.props.eg.papa.cellPapa} type="text" onChange={e => this.setState({mailPapaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>                     
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit">Modifica</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.togglePapaModal}>Indietro</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>
        
          
          {/* MODAL RECAPITI INFORMATION */}
          <Modal isOpen={this.state.recapitiModal} toggle={e => this.togglerecapitiModal} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleRecapitiModal} />
              <Form role="form" onSubmit={this.handleRecapitiModal}>
              <ModalBody>
                <div className="py-3 text-center">
                <i className="far fa-address-card fa-3x"></i>
                  <h4 className="heading mt-4">{this.props.eg.nome} {this.props.eg.cognome}</h4>
                  <p>Modifica i Recapiti</p>
                  <p>Per non modificare un campo, lascialo così com'è!</p>
                </div>          
                    <FormGroup controlid="casa" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-voicemail" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Numero Telefono di Casa: " + this.props.eg.recapiti.casa} type="text" onChange={e => this.setState({casaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="cellEG" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-phone" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Cellulare EG: " + this.props.eg.recapiti.cellulare} type="text" onChange={e => this.setState({cellulareEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="indirizzoEG" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-home" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Indirizzo: " + this.props.eg.recapiti.indirizzo} type="text" onChange={e => this.setState({indirizzoEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="nascitaEG" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-birthday-cake" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Data di Nascita: " + this.birthFormat(this.props.eg.recapiti.nascita)} type="date" onChange={e => this.setState({nascitaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>                     
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit">Modifica</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleRecapitiModal}>Indietro</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>


          {/* MODAL BUROCRAZIA INFORMATION */}
          <Modal isOpen={this.state.burocraziaModal} toggle={e => this.toggleBurocraziaModal} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleBurocraziaModal} />
              <Form role="form" onSubmit={this.handleBurocraziaModal}>
              <ModalBody>
                <div className="py-3 text-center">
                <i className="fas fa-file-signature fa-3x" />
                  <h4 className="heading mt-4">{this.props.eg.nome} {this.props.eg.cognome}</h4>
                  <p>Modifica i Dati Burocratici</p>
                  <p>Per non modificare un campo, lascialo così com'è!</p>
                </div>          
                    <FormGroup controlid="censimentoEG" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-file-signature" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Importo Censimento: " + this.props.eg.burocrazia.censimento} type="text" onChange={e => this.setState({censimentoEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    {/* CARICAMENTO FILE */}
                    <FormGroup controlid="fogliCensimento" className="mb-3 mx-6">
                      <Label>Fogli Censimento</Label>
                      <InputGroup className="input-group-alternative">
                        <Input accept="application/pdf" type="file" onChange={e => this.handleFileChangeCensimento(e)}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="privacy" className="mb-3 mx-6">
                      <Label>Foglio Privacy</Label>
                      <InputGroup className="input-group-alternative">
                        <Input accept="application/pdf" type="file" onChange={e => this.handleFileChangePrivacy(e)}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="autorizzazione" className="mb-3 mx-6">
                      <Label>Autorizzazione Branca EG</Label>
                      <InputGroup className="input-group-alternative">
                        <Input accept="application/pdf" type="file" onChange={e => this.handleFileChangeAutorizzazione(e)}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="SS" className="mb-3 mx-6">
                      <Label>Scheda Sanitaria</Label>
                      <InputGroup className="input-group-alternative">
                        <Input accept="application/pdf" type="file" onChange={e => this.handleFileChangeScheda(e)}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="TS" className="mb-3 mx-6">
                      <Label>Tessera Sanitaria</Label>
                      <InputGroup className="input-group-alternative">
                        <Input accept="application/pdf" type="file" onChange={e => this.handleFileChangeTessera(e)}/>
                      </InputGroup>
                    </FormGroup>                     
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit">Modifica</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleBurocraziaModal}>Indietro</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>



           {/* MODAL SENTIERO INFORMATION */}
           <Modal isOpen={this.state.sentieroModal} toggle={e => this.toggleSentieroModal} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleSentieroModal} />
              <Form role="form" onSubmit={this.handleSentieroModal}>
              <ModalBody>
                <div className="py-3 text-center">
                <i className="fas fa-street-view fa-3x"></i>
                  <h4 className="heading mt-4">{this.props.eg.nome} {this.props.eg.cognome}</h4>
                  <p>Modifica il Sentiero</p>
                  <p>Per non modificare un campo, lascialo così com'è!</p>
                </div>          
                    <FormGroup controlid="squadrigliaEG" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-home" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Squadriglia: " + this.props.eg.sentiero.squadriglia} type="text" onChange={e => this.setState({squadrigliaEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="camminaPer" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-shoe-prints" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Cammina Per: " + this.props.eg.sentiero.camminaPer} type="text" onChange={e => this.setState({camminaPerEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="incarico" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-briefcase" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Incarico: " + this.props.eg.sentiero.incarico} type="text" onChange={e => this.setState({incaricoEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="annoEG" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-calendar" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Anno: " + this.props.eg.sentiero.anno} type="text" onChange={e => this.setState({annoEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="lavoraPer" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-wrench" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Lavora Per: " + this.props.eg.sentiero.lavoraPer} type="text" onChange={e => this.setState({lavoraPerEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="noteSentiero" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Note Sentiero: " + this.props.eg.sentiero.noteSentiero} type="text" onChange={e => this.setState({noteSentieroEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>                    
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit">Modifica</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleSentieroModal}>Indietro</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>



          {/* MODAL MENSILI INFORMATION */}
          <Modal isOpen={this.state.mensiliModal} toggle={e => this.toggleMensiliModal} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleMensiliModal} />
              <Form role="form" onSubmit={this.handleMensiliModal}>
              <ModalBody>
                <div className="py-3 text-center">
                <i class="fab fa-slack-hash fa-3x"></i>
                  <h4 className="heading mt-4">{this.props.eg.nome} {this.props.eg.cognome}</h4>
                  <p>Modifica la Scheda Mensili</p>
                  <p>Per non modificare un campo, lascialo così com'è!</p>
                </div>          
                    <FormGroup controlid="ottobre" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fas fa-wallet"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Ottobre: " + this.props.eg.mensili.ottobre} type="number" min="0" onChange={e => this.setState({ottobreEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="novembre" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fas fa-wallet"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Novembre: " + this.props.eg.mensili.novembre} type="number" min="0" onChange={e => this.setState({novembreEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="dicembre" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fas fa-wallet"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Dicembre: " + this.props.eg.mensili.dicembre} type="number" min="0" onChange={e => this.setState({dicembreEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="gennaio" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fas fa-wallet"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Gennaio: " + this.props.eg.mensili.gennaio} type="number" min="0" onChange={e => this.setState({gennaioEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="Febbraio" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fas fa-wallet"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Febbraio: " + this.props.eg.mensili.febbraio} type="number" min="0" onChange={e => this.setState({febbraioEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="marzo" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fas fa-wallet"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Marzo: " + this.props.eg.mensili.marzo} type="number" min="0" onChange={e => this.setState({marzoEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="aprile" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fas fa-wallet"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Aprile: " + this.props.eg.mensili.aprile} type="number" min="0" onChange={e => this.setState({aprileEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="maggio" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fas fa-wallet"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Maggio: " + this.props.eg.mensili.maggio} type="number" min="0" onChange={e => this.setState({maggioEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>

                    <hr/>

                    <FormGroup controlid="campoExtra" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fab fa-fort-awesome"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Campo Extra: " + this.props.eg.mensili.campoExtra} type="number" min="0" onChange={e => this.setState({campoExtraEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="accontoEstivo" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fab fa-fort-awesome"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Acconto Campo Estivo: " + this.props.eg.mensili.accontoEstivo} type="number" min="0" onChange={e => this.setState({accontoEstivoEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="saldoEstivo" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fab fa-fort-awesome"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder={"Saldo Campo Estivo: " + this.props.eg.mensili.saldoEstivo} type="number" min="0" onChange={e => this.setState({saldoEstivoEG: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>                    
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit">Modifica</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleMensiliModal}>Indietro</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>

          {/* MODAL ADD OBIETTIVO */}
          <Modal isOpen={this.state.addObiettivo} toggle={e => this.toggleAddObiettivoModal} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleAddObiettivoModal} />
              <Form role="form" onSubmit={this.handleAddObiettivo}>
              <ModalBody>
                <div className="py-3 text-center">
                  <i className="fas fa-bullseye fa-3x"></i>
                  <h4 className="heading mt-4">{this.props.eg.nome} {this.props.eg.cognome}</h4>
                  <p>Inserisci un obiettivo</p>
                  <p>Per non modificare un campo, lascialo così com'è!</p>
                </div>          
                    <FormGroup controlid="nomeObiettivo" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-crosshairs" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Obiettivo" type="text" onChange={e => this.setState({nomeObiettivo: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="noteObiettivo" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Note Obiettivo" type="text" onChange={e => this.setState({noteObiettivo: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>                    
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit">Aggiungi</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleAddObiettivoModal}>Indietro</Button>
              </ModalFooter>
              </Form> 
            </div>         
          </Modal>
        
          {/* MODAL ADD COMPETENZA */}
          <Modal isOpen={this.state.addCompetenza} toggle={e => this.toggleAddCompetenzaModal} className="modal-dialog modal-danger modal-dialog-centered modal-">
            <div className="modal-content bg-gradient-danger">
              <ModalHeader toggle={this.toggleAddCompetenzaModal} />
              <Form role="form" onSubmit={this.handleAddCompetenza}>
              <ModalBody>
                <div className="py-3 text-center">
                  <i className="far fa-compass fa-3x"></i>
                  <h4 className="heading mt-4">{this.props.eg.nome} {this.props.eg.cognome}</h4>
                  <p>Inserisci Competenza Acquisita</p>
                  <p>Per non modificare un campo, lascialo così com'è!</p>
                </div>          
                    <FormGroup controlid="nomeObiettivo" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-crosshairs" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Comptenza Acquisita" type="text" onChange={e => this.setState({nomeCompetenza: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup controlid="noteObiettivo" className="mb-3 mx-6">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="far fa-sticky-note" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Anno" type="number" min="0" onChange={e => this.setState({annoCompetenza: e.target.value})}/>
                      </InputGroup>
                    </FormGroup>                    
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-white" type="submit">Aggiungi</Button>
                <Button className="btn btn-link text-white ml-auto" /*color="secondary"*/ onClick={this.toggleAddCompetenzaModal}>Indietro</Button>
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
