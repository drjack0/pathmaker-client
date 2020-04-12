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
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import { API } from "aws-amplify";

import routes from "routes.js";

import Squad from "views/examples/Squad.js"

class Admin extends React.Component {
  
  /*componentDidMount() {
    Auth.currentUserInfo().then(data =>{
      console.log(data);
      this.setState({
        username: this.data.username,

      })
    }).catch(err => console.log("CURRENT USER INFO: ", err))
  }*/

  /*constructor(props){
    super(props)
  }*/

  constructor(props){
    super(props)
    this.state = {
      squad: [],
      budget: [],
      reparto: [],
      loaded: false
    }
  }

  componentDidMount(){
    console.log("COMPONENT DID MOUNT");
    this.onLoad()
  }

  componentDidUpdate(e) {
    console.log("COMPONENT DID UPDATE");
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    (this.refs.mainPanel || {}).scrollTop = 0;
  }

  loadSquad = async () => {
    try{
      this.state.squad = await API.get("pathMaker","/squadriglie/scan")        
    } catch(err){
      alert(err);
      console.log(err);
    } 
  }

  loadBudget = async () => {
    try{
      this.state.budget = await API.get("pathMaker","/budget/scan")        
    } catch(err){
      alert(err);
      console.log(err);
    }  
  }

  loadRagazzi = async () => {
    try{
      this.state.reparto = await API.get("pathMaker","/reparto/scan")
    } catch(err){
      alert(err);
      console.log(err);
    }
  }

  onLoad = async () => {
    await this.loadBudget();
    await this.loadSquad();
    await this.loadRagazzi();
    this.setState({loaded: true});
  }

  filterBySquad = (squadNome) => {
    const repartoList = this.state.reparto;
    console.log(repartoList);
    const filteredList = [];
    repartoList.map(member =>{
      if(member.sentiero.squadriglia !== undefined && member.sentiero.squadriglia === squadNome){
        filteredList.push(member);
      }
    });
    console.log(filteredList);
    return filteredList;
  }

  getRoutes = routes => {
    console.log("PROPS IN GETROUTES",this.props);
    return routes.map((prop, key) => {
      if (prop.layout === "/admin" && prop.path !== '/squadriglia' && prop.path !== '/eg') {
        return (
          <Route 
            path={prop.layout + prop.path}
            render = {props => <prop.component 
                                  squad = {this.state.squad}
                                  budget = {this.state.budget} {...this.props}/>}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  getSquadRoutes = () => {
    return this.state.squad.map((sq,key) => {
      return (
        <Route
          path={"/admin/squadriglia/"+sq.squadriglia.toLowerCase()}
          render = {props => <Squad squad= {sq} squadMembers={this.filterBySquad(sq.squadriglia)} {...this.props}/> } key={key} />
      )
    })
  }

  getEgRoutes = () => {
    return this.state.reparto.map((eg,key) => {
      return (
        <Route
          path={"/admin/eg/"+eg.censcode}
          render = {props => <Squad eg= {eg} {...this.props}/> } key={key} />
      )
    })
  }

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return this.props.location.pathname.split("/")[2];
  };

  
  
  render() {
    console.log("ADMIN PROPS", this.props);
    console.log("STATE",this.state);
      return  (this.state.loaded && 
        <>
          <Sidebar
            {...this.props}
            routes={routes}
            logo={{
              innerLink: "/admin/index",
              imgSrc: require("assets/img/brand/PathMaker_logo.png"),
              imgAlt: "..."
            }}
          />
          <div className="main-content" ref="mainContent">
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
            />
            <Switch>
              {this.getRoutes(routes)}
              {this.getSquadRoutes()}
              <Redirect from="*" to="/admin/index" />
            </Switch>
            <Container fluid>
              <AdminFooter />
            </Container>
          </div>
        </>
      );
    
  }
}

export default withRouter(Admin);
