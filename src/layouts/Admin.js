/*!

=========================================================
* PathMaker DashBoard React
=========================================================

*/

import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

// reactstrap components
import { Container } from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

//amplify library
import { API,Storage } from "aws-amplify";

//route component
import routes from "routes.js";

//other components
import Squad from "views/examples/Squad.js"
import EG from "views/examples/Eg.js";

class Admin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      squad: [],
      budget: [],
      reparto: [],
      loaded: false,
    };
    this.squadURL = []
  }

  componentDidMount(){
    this.onLoad()
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    (this.refs.mainPanel || {}).scrollTop = 0;
  }

  loadSquad = async () => {
    try{
      this.state.squad = await API.get("pathMakerReparto","/squadriglie/scan");
      for(var i=0; i < this.state.squad.length; i++){
        var imgString = "imgSquad/IMG-"+this.state.squad[i].squadriglia.toString();
        this.squadURL.push({
          squad: this.state.squad[i].squadriglia,
          URL: await Storage.get(imgString)
        })
      }    
    } catch(err){
      alert(err);
      console.log(err);
    } 
  }

  loadBudget = async () => {
    try{
      this.state.budget = await API.get("pathMakerUtils","/budget/scan")        
    } catch(err){
      alert(err);
      console.log(err);
    }  
  }

  loadRagazzi = async () => {
    try{
      this.state.reparto = await API.get("pathMakerReparto","/reparto/scan")
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

  //filter function for squad table (filter by user input)
  filterBySquad = (squadNome) => {
    const repartoList = this.state.reparto;
    const filteredList = [];
    repartoList.map(member =>{
      if(member.sentiero.squadriglia !== undefined && member.sentiero.squadriglia === squadNome){
        filteredList.push(member);
      }
    });
    return filteredList;
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin" && prop.path !== '/squadriglia' && prop.path !== '/eg') {
        return (
          <Route 
            path={prop.layout + prop.path}
            render = {props => <prop.component 
                                  squad = {this.state.squad}
                                  budget = {this.state.budget}
                                  reparto= {this.state.reparto} 
                                  squadURL={this.squadURL} {...this.props}/>}
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
          render = {props => <Squad squad= {sq} squadURL={this.squadURL} squadMembers={this.filterBySquad(sq.squadriglia)} {...this.props}/> } key={key} />
      )
    })
  }

  getEgRoutes = () => {
    return this.state.reparto.map((eg,key) => {
      return (
        <Route
          path={"/admin/eg/"+eg.censcode}
          render = {props => <EG eg= {eg} squadList={this.state.squad} squadURL={this.squadURL} {...this.props}/> } key={key} />
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
              {this.getEgRoutes()}
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
