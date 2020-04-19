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
import {Link} from "react-router-dom";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Collapse,
  Table,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupButtonDropdown,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

class Utils extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openAnagrafica: false,
      openMensili: false,
      openSentiero: false,
      openGenitori: false,
      openBurocrazia: false,

      anagraficaList: this.props.reparto.map((x,index) => {
        const ret = {
          nome: x.nome,
          cognome: x.cognome,
          censcode: x.censcode,
          recapiti: x.recapiti
        }
        return ret
      }),
      backupAnagraficaList: this.props.reparto.map((x,index) => {
        const ret = {
          nome: x.nome,
          cognome: x.cognome,
          censcode: x.censcode,
          recapiti: x.recapiti
        }
        return ret
      }),

      mensiliList: this.props.reparto.map((x,index) => {
        const ret = {
          nome: x.nome,
          cognome: x.cognome,
          censcode: x.censcode,
          mensili: x.mensili
        }
        return ret
      }),
      backupMensiliList: this.props.reparto.map((x,index) => {
        const ret = {
          nome: x.nome,
          cognome: x.cognome,
          censcode: x.censcode,
          mensili: x.mensili
        }
        return ret
      }),

      sentieroList: this.props.reparto.map((x,index) => {
        const ret = {
          nome: x.nome,
          cognome: x.cognome,
          censcode: x.censcode,
          sentiero: x.sentiero
        }
        return ret
      }),
      backupSentieroList: this.props.reparto.map((x,index) => {
        const ret = {nome: x.nome,cognome: x.cognome,censcode: x.censcode,sentiero: x.sentiero}
        return ret
      }),

      genitoriList: this.props.reparto.map((x,index) => {
        const ret = {nome: x.nome, cognome: x.cognome, censcode: x.censcode, mamma: x.mamma, papa: x.papa}
        return ret
      }),
      backupGenitoriList: this.props.reparto.map((x,index) => {
        const ret = {nome: x.nome, cognome: x.cognome, censcode: x.censcode, mamma: x.mamma, papa: x.papa}
        return ret
      }),

      burocraziaList: this.props.reparto.map((x,index) => {
        const ret = {nome: x.nome, cognome: x.cognome, censcode: x.censcode, burocrazia: x.burocrazia}
        return ret
      }),
      backupBurocraziaList: this.props.reparto.map((x,index) => {
        const ret = {nome: x.nome, cognome: x.cognome, censcode: x.censcode, burocrazia: x.burocrazia}
        return ret
      }),

      dropdownAnagraficaOpen: false,
      dropdownMensiliOpen: false,
      dropdownSentieroOpen: false,
      dropdownGenitoriOpen: false,
      dropdownBurocraziaOpen: false,

      anagraficaFilterType: "nome",
      mensiliFilterType: "nome",
      sentieroFilterType: "nome",
      genitoriFilterType: "nome",
      burocraziaFilterType: "nome"
    }
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


  toggleAnagrafica = () => {
    this.setState({openAnagrafica: !this.state.openAnagrafica})
  }
  toggleMensili = () => {
    this.setState({openMensili: !this.state.openMensili})
  }
  toggleSentiero = () => {
    this.setState({openSentiero: !this.state.openSentiero})
  }
  toggleGenitori = () => {
    this.setState({openGenitori: !this.state.openGenitori})
  }
  toggleBurocrazia = () => {
    this.setState({openBurocrazia: !this.state.openBurocrazia})
  }

  toggleAnagraficaDropDown = () => {
    this.setState({dropdownAnagraficaOpen: !this.state.dropdownAnagraficaOpen})
  }
  toggleMensiliDropDown = () => {
    this.setState({dropdownMensiliOpen: !this.state.dropdownMensiliOpen})
  }
  toggleSentieroDropDown = () => {
    this.setState({dropdownSentieroOpen: !this.state.dropdownSentieroOpen})
  }
  toggleGenitoriDropDown = () => {
    this.setState({dropdownGenitoriOpen: !this.state.dropdownGenitoriOpen})
  }
  toggleBurocraziaDropDown = () => {
    this.setState({dropdownBurocraziaOpen: !this.state.dropdownBurocraziaOpen})
  }

  filterAnagraficaList =(event) => {
    var updatedList = this.state.anagraficaList;
    const filterType = this.state.anagraficaFilterType.toString();
    console.log(filterType)
    updatedList = updatedList.filter(function(list){
      if(filterType === "nome" || filterType === "cognome" || filterType === "censcode"){
        return (list[filterType].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      } else {
        return (list.recapiti[filterType].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      }
      
    });
    this.setState({backupAnagraficaList: updatedList});
  };
  filterMensiliList =(event) => {
    var updatedList = this.state.mensiliList;
    const filterType = this.state.mensiliFilterType.toString();
    updatedList = updatedList.filter(function(list){
      if(filterType === "nome" || filterType === "cognome" || filterType === "censcode"){
        return (list[filterType].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      } else {
        return (list.mensili[filterType].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      }
    });
    this.setState({backupMensiliList: updatedList});
  };
  filterSentieroList =(event) => {
    var updatedList = this.state.sentieroList;
    const filterType = this.state.sentieroFilterType.toString();
    updatedList = updatedList.filter(function(list){
      if(filterType === "nome" || filterType === "cognome" || filterType === "censcode"){
        return (list[filterType].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      } else {
        return (list.sentiero[filterType].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      }
    });
    this.setState({backupSentieroList: updatedList});
  };
  filterGenitoriList =(event) => {
    var updatedList = this.state.genitoriList;
    const filterType = this.state.genitoriFilterType.toString();
    updatedList = updatedList.filter(function(list){
      if(filterType === "nome" || filterType === "cognome" || filterType === "censcode"){
        return (list[filterType].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      } else if(filterType === "nomeMamma" || filterType === "cellMamma" || filterType === "mailMamma") {
        return (list.mamma[filterType].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      } else {
        return (list.papa[filterType].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      }
    });
    this.setState({backupGenitoriList: updatedList});
  };
  filterBurocraziaList =(event) => {
    var updatedList = this.state.burocraziaList;
    const filterType = this.state.burocraziaFilterType.toString();
    console.log(filterType)
    updatedList = updatedList.filter(function(list){
      if(filterType === "nome" || filterType === "cognome" || filterType === "censcode"){
        return (list[filterType].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      } else if (filterType === "censimento"){
        return (list.burocrazia[filterType].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      } else {
        return (list.burocrazia[filterType].consegnato.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      }
    });
    this.setState({backupBurocraziaList: updatedList});
  };

  renderAnagraficaTable = () => {
    return this.state.backupAnagraficaList.sort((a,b) => (a.nome < b.nome) ? 1 : -1).map((x,i) => {
      const {nome, cognome, censcode, recapiti} = x;
      return (
        <tr key={censcode}>
          <th scope="row"><Link to={"/admin/eg/"+censcode.toLowerCase()}> {nome} {cognome} </Link></th>
          <td>{censcode}</td>
          <td>{recapiti.casa}</td>
          <td>{recapiti.cellulare}</td>
          <td>{recapiti.indirizzo}</td>
          <td>{this.birthFormat(recapiti.nascita)}</td>
        </tr>
      )
    })
  }

  renderMensiliTable = () => {
    return this.state.backupMensiliList.sort((a,b) => (a.nome < b.nome) ? 1 : -1).map((x,i) => {
      const {nome, cognome, censcode, mensili} = x;
      return (
        <tr key={censcode}>
          <th scope="row"><Link to={"/admin/eg/"+censcode.toLowerCase()}> {nome} {cognome} </Link></th>
          <td>{mensili.ottobre}</td>
          <td>{mensili.novembre}</td>
          <td>{mensili.dicembre}</td>
          <td>{mensili.gennaio}</td>
          <td>{mensili.febbraio}</td>
          <td>{mensili.marzo}</td>
          <td>{mensili.aprile}</td>
          <td>{mensili.maggio}</td>
          <td>{mensili.campoExtra}</td>
          <td>{mensili.accontoEstivo}</td>
          <td>{mensili.saldoEstivo}</td>
        </tr>
      )
    })
  }

  renderSentieroTable = () => {
    return this.state.backupSentieroList.sort((a,b) => (a.nome < b.nome) ? 1 : -1).map((x,i) => {
      const {nome, cognome, censcode, sentiero} = x;
      return (
        <tr key={censcode}>
          <th scope="row"><Link to={"/admin/eg/"+censcode.toLowerCase()}> {nome} {cognome} </Link></th>
          <td>{sentiero.squadriglia}</td>
          <td>{sentiero.anno}</td>
          <td>{sentiero.camminaPer}</td>
          <td>{sentiero.lavoraPer}</td>
          <td>{sentiero.incarico}</td>
        </tr>
      )
    })
  }

  renderGenitoriTable = () => {
    return this.state.backupGenitoriList.sort((a,b) => (a.nome < b.nome) ? 1 : -1).map((x,i) => {
      const {nome, cognome, censcode, mamma, papa} = x;
      return (
        <tr key={censcode}>
          <th scope="row"><Link to={"/admin/eg/"+censcode.toLowerCase()}> {nome} {cognome} </Link></th>
          <td>{mamma.nomeMamma}</td>
          <td>{mamma.cellMamma}</td>
          <td>{mamma.mailMamma}</td>
          <td>{papa.nomePapa}</td>
          <td>{papa.cellPapa}</td>
          <td>{papa.mailPapa}</td>
        </tr>
      )
    })
  }

  renderBurocraziaTable = () => {
    return this.state.backupBurocraziaList.sort((a,b) => (a.nome < b.nome) ? 1 : -1).map((x,i) => {
      const {nome, cognome, censcode, burocrazia} = x;
      return (
        <tr key={censcode}>
          <th scope="row"><Link to={"/admin/eg/"+censcode.toLowerCase()}> {nome} {cognome} </Link></th>
          <td>{burocrazia.censimento}</td>
          <td>{burocrazia.fogliCensimento.consegnato}</td>
          <td>{burocrazia.privacy.consegnato}</td>
          <td>{burocrazia.autorizzazione.consegnato}</td>
          <td>{burocrazia.schedaSanitaria.consegnato}</td>
          <td>{burocrazia.tesseraSanitaria.consegnato}</td>
        </tr>
      )
    })
  }


  render() {
    console.log("UTILS STATE",this.state)
    return (
      <>
        <Header {...this.props} />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">          
                <CardHeader className=" bg-transparent">
                <Row className="align-items-center">
                    <div className="col">
                      <h3 className=" mb-0" style={{cursor: "pointer"}} onClick={this.toggleAnagrafica}>Anagrafica</h3>
                    </div>
                    <div className="col md-4 text-right">
                      <InputGroup className="mb-1">
                      <Input type="text" placeholder={"Filtra: " + this.state.anagraficaFilterType} className="mb-0" onChange={this.filterAnagraficaList} />
                        <InputGroupButtonDropdown className="mb-1" addonType="append" isOpen={this.state.dropdownAnagraficaOpen} toggle={this.toggleAnagraficaDropDown}>
                          <InputGroupText style={{paddingTop: "0.03rem",paddingRight:"0.04rem",paddingBottom: "0.03rem",paddingLeft:"0.04rem"}}>
                          <DropdownToggle outline color="primary" >
                            <i className="ni ni-zoom-split-in" />
                          </DropdownToggle>
                          <DropdownMenu >
                            <DropdownItem header style={{color: "blue"}} >Seleziona Filtro</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={e => this.setState({anagraficaFilterType: "nome"})}>Nome</DropdownItem>
                            <DropdownItem onClick={e => this.setState({anagraficaFilterType: "nascita"})}>Data di Nascita</DropdownItem>
                          </DropdownMenu>
                          </InputGroupText>                                                
                        </InputGroupButtonDropdown>                                                
                      </InputGroup>
                    </div>
                  </Row>
                </CardHeader>
                <Collapse isOpen={this.state.openAnagrafica}>                
                  <Table hover className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Censimento</th>
                        <th scope="col">Casa</th>
                        <th scope="col">Cellulare</th>
                        <th scope="col">Indirizzo</th>
                        <th scope="col">Data Nascita</th>

                      </tr>
                    </thead>
                    <tbody>
                      {this.renderAnagraficaTable()}
                    </tbody>
                  </Table>               
                </Collapse>        
              </Card>

              <Card className="mt-3">          
                <CardHeader className=" bg-transparent">
                <Row className="align-items-center">
                    <div className="col">
                      <h3 className=" mb-0" style={{cursor: "pointer"}} onClick={this.toggleMensili}>Mensili</h3>
                    </div>
                    <div className="col md-4 text-right">
                      <InputGroup className="mb-1">
                      <Input type="text" placeholder={"Filtra: " + this.state.mensiliFilterType} className="mb-0" onChange={this.filterMensiliList} />
                        <InputGroupButtonDropdown className="mb-1" addonType="append" isOpen={this.state.dropdownMensiliOpen} toggle={this.toggleMensiliDropDown}>
                          <InputGroupText style={{paddingTop: "0.03rem",paddingRight:"0.04rem",paddingBottom: "0.03rem",paddingLeft:"0.04rem"}}>
                          <DropdownToggle outline color="primary" >
                            <i className="ni ni-zoom-split-in" />
                          </DropdownToggle>
                          <DropdownMenu >
                            <DropdownItem header style={{color: "blue"}} >Seleziona Filtro</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={e => this.setState({mensiliFilterType: "nome"})}>Nome</DropdownItem>
                            <DropdownItem onClick={e => this.setState({mensiliFilterType: "ottobre"})}>Ottobre</DropdownItem>
                            <DropdownItem onClick={e => this.setState({mensiliFilterType: "novembre"})}>Novembre</DropdownItem>
                            <DropdownItem onClick={e => this.setState({mensiliFilterType: "dicembre"})}>Dicembre</DropdownItem>
                            <DropdownItem onClick={e => this.setState({mensiliFilterType: "gennaio"})}>Gennaio</DropdownItem>
                            <DropdownItem onClick={e => this.setState({mensiliFilterType: "febbraio"})}>Febbraio</DropdownItem>
                            <DropdownItem onClick={e => this.setState({mensiliFilterType: "marzo"})}>Marzo</DropdownItem>
                            <DropdownItem onClick={e => this.setState({mensiliFilterType: "aprile"})}>Aprile</DropdownItem>
                            <DropdownItem onClick={e => this.setState({mensiliFilterType: "maggio"})}>Maggio</DropdownItem>
                            <DropdownItem onClick={e => this.setState({mensiliFilterType: "campoExtra"})}>Campo Extra</DropdownItem>
                            <DropdownItem onClick={e => this.setState({mensiliFilterType: "accontoEstivo"})}>Acconto Estivo</DropdownItem>
                            <DropdownItem onClick={e => this.setState({mensiliFilterType: "saldoEstivo"})}>Saldo Estivo</DropdownItem>
                          </DropdownMenu>
                          </InputGroupText>                                                
                        </InputGroupButtonDropdown>                                                
                      </InputGroup>
                    </div>
                  </Row>
                </CardHeader>
                <Collapse isOpen={this.state.openMensili}>                
                  <Table hover className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        
                        <th scope="col">Nome</th>
                        <th scope="col">Ottobre</th>
                        <th scope="col">Novembre</th>
                        <th scope="col">Dicembre</th>
                        <th scope="col">Gennaio</th>
                        <th scope="col">Febbraio</th>
                        <th scope="col">Marzo</th>
                        <th scope="col">Aprile</th>
                        <th scope="col">Maggio</th>
                        <th scope="col">Campo Extra</th>
                        <th scope="col">Acconto Estivo</th>
                        <th scope="col">Saldo Estivo</th>

                      </tr>
                    </thead>
                    <tbody>
                    {this.renderMensiliTable()}
                    </tbody>
                  </Table>               
                </Collapse>        
              </Card>

              <Card className="mt-3">          
                <CardHeader className=" bg-transparent">
                <Row className="align-items-center">
                    <div className="col">
                      <h3 className=" mb-0" style={{cursor: "pointer"}} onClick={this.toggleSentiero}>Sentiero</h3>
                    </div>
                    <div className="col md-4 text-right">
                      <InputGroup className="mb-1">
                      <Input type="text" placeholder={"Filtra: " + this.state.sentieroFilterType} className="mb-0" onChange={this.filterSentieroList} />
                        <InputGroupButtonDropdown className="mb-1" addonType="append" isOpen={this.state.dropdownSentieroOpen} toggle={this.toggleSentieroDropDown}>
                          <InputGroupText style={{paddingTop: "0.03rem",paddingRight:"0.04rem",paddingBottom: "0.03rem",paddingLeft:"0.04rem"}}>
                          <DropdownToggle outline color="primary" >
                            <i className="ni ni-zoom-split-in" />
                          </DropdownToggle>
                          <DropdownMenu >
                            <DropdownItem header style={{color: "blue"}} >Seleziona Filtro</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={e => this.setState({sentieroFilterType: "nome"})}>Nome</DropdownItem>
                            <DropdownItem onClick={e => this.setState({sentieroFilterType: "squadriglia"})}>Squadriglia</DropdownItem>
                            <DropdownItem onClick={e => this.setState({sentieroFilterType: "anno"})}>Anno</DropdownItem>
                            <DropdownItem onClick={e => this.setState({sentieroFilterType: "camminaPer"})}>Cammina Per</DropdownItem>
                            <DropdownItem onClick={e => this.setState({sentieroFilterType: "lavoraPer"})}>Lavora Per</DropdownItem>
                            <DropdownItem onClick={e => this.setState({sentieroFilterType: "incarico"})}>Incarico</DropdownItem>
                          </DropdownMenu>
                          </InputGroupText>                                                
                        </InputGroupButtonDropdown>                                                
                      </InputGroup>
                    </div>
                  </Row>
                </CardHeader>
                <Collapse isOpen={this.state.openSentiero}>                
                  <Table hover className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                      <th scope="col">Nome</th>
                        <th scope="col">Squadriglia</th>
                        <th scope="col">Anno</th>
                        <th scope="col">Cammina Per</th>
                        <th scope="col">Lavora Per</th>
                        <th scope="col">Incarico</th>

                      </tr>
                    </thead>
                    <tbody>
                    {this.renderSentieroTable()}
                    </tbody>
                  </Table>               
                </Collapse>        
              </Card>

              <Card className="mt-3">          
                <CardHeader className=" bg-transparent">
                <Row className="align-items-center">
                    <div className="col">
                      <h3 className=" mb-0" style={{cursor: "pointer"}} onClick={this.toggleGenitori}>Genitori</h3>
                    </div>
                    <div className="col md-4 text-right">
                      <InputGroup className="mb-1">
                      <Input type="text" placeholder={"Filtra: " + this.state.genitoriFilterType} className="mb-0" onChange={this.filterGenitoriList} />
                        <InputGroupButtonDropdown className="mb-1" addonType="append" isOpen={this.state.dropdownGenitoriOpen} toggle={this.toggleGenitoriDropDown}>
                          <InputGroupText style={{paddingTop: "0.03rem",paddingRight:"0.04rem",paddingBottom: "0.03rem",paddingLeft:"0.04rem"}}>
                          <DropdownToggle outline color="primary" >
                            <i className="ni ni-zoom-split-in" />
                          </DropdownToggle>
                          <DropdownMenu >
                            <DropdownItem header style={{color: "blue"}} >Seleziona Filtro</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={e => this.setState({genitoriFilterType: "nome"})}>Nome</DropdownItem>
                            <DropdownItem onClick={e => this.setState({genitoriFilterType: "nomeMamma"})}>Mamma</DropdownItem>
                            <DropdownItem onClick={e => this.setState({genitoriFilterType: "cellMamma"})}>Cell Mamma</DropdownItem>
                            <DropdownItem onClick={e => this.setState({genitoriFilterType: "mailMamma"})}>Mail Mamma</DropdownItem>
                            <DropdownItem onClick={e => this.setState({genitoriFilterType: "nomePapa"})}>Papà</DropdownItem>
                            <DropdownItem onClick={e => this.setState({genitoriFilterType: "cellPapa"})}>Cell Papà</DropdownItem>
                            <DropdownItem onClick={e => this.setState({genitoriFilterType: "mailPapa"})}>Mail Papà</DropdownItem>
                          </DropdownMenu>
                          </InputGroupText>                                                
                        </InputGroupButtonDropdown>                                                
                      </InputGroup>
                    </div>
                  </Row>
                </CardHeader>
                <Collapse isOpen={this.state.openGenitori}>                
                  <Table hover className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Mamma</th>
                        <th scope="col">Cell Mamma</th>
                        <th scope="col">Email Mamma</th>
                        <th scope="col">Papà</th>
                        <th scope="col">Cell Papà</th>
                        <th scope="col">Mail Papà</th>

                      </tr>
                    </thead>
                    <tbody>
                    {this.renderGenitoriTable()}
                    </tbody>
                  </Table>               
                </Collapse>        
              </Card>

              <Card className="mt-3">          
                <CardHeader className=" bg-transparent">
                <Row className="align-items-center">
                    <div className="col">
                      <h3 className=" mb-0" style={{cursor: "pointer"}} onClick={this.toggleBurocrazia}>Burocrazia</h3>
                    </div>
                    <div className="col md-4 text-right">
                      <InputGroup className="mb-1">
                      <Input type="text" placeholder={"Filtra: " + this.state.burocraziaFilterType} className="mb-0" onChange={this.filterBurocraziaList} />
                        <InputGroupButtonDropdown className="mb-1" addonType="append" isOpen={this.state.dropdownBurocraziaOpen} toggle={this.toggleBurocraziaDropDown}>
                          <InputGroupText style={{paddingTop: "0.03rem",paddingRight:"0.04rem",paddingBottom: "0.03rem",paddingLeft:"0.04rem"}}>
                          <DropdownToggle outline color="primary" >
                            <i className="ni ni-zoom-split-in" />
                          </DropdownToggle>
                          <DropdownMenu >
                            <DropdownItem header style={{color: "blue"}} >Seleziona Filtro</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={e => this.setState({burocraziaFilterType: "nome"})}>Nome</DropdownItem>
                            <DropdownItem onClick={e => this.setState({burocraziaFilterType: "censimento"})}>Censimento</DropdownItem>
                            <DropdownItem onClick={e => this.setState({burocraziaFilterType: "fogliCensimento"})}>Fogli</DropdownItem>
                            <DropdownItem onClick={e => this.setState({burocraziaFilterType: "privacy"})}>Privacy</DropdownItem>
                            <DropdownItem onClick={e => this.setState({burocraziaFilterType: "autorizzazione"})}>Autorizzazione</DropdownItem>
                            <DropdownItem onClick={e => this.setState({burocraziaFilterType: "schedaSanitaria"})}>Scheda</DropdownItem>
                            <DropdownItem onClick={e => this.setState({burocraziaFilterType: "tesseraSanitaria"})}>Tessera</DropdownItem>
                          </DropdownMenu>
                          </InputGroupText>                                                
                        </InputGroupButtonDropdown>                                                
                      </InputGroup>
                    </div>
                  </Row>
                </CardHeader>
                <Collapse isOpen={this.state.openBurocrazia}>                
                  <Table hover className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Censimento</th>
                        <th scope="col">Fogli</th>
                        <th scope="col">Privacy</th>
                        <th scope="col">Autorizzazione</th>
                        <th scope="col">Scheda</th>
                        <th scope="col">Tessera</th>

                      </tr>
                    </thead>
                    <tbody>
                    {this.renderBurocraziaTable()}
                    </tbody>
                  </Table>               
                </Collapse>        
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Utils;
