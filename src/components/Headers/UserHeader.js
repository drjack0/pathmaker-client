/*!

=========================================================
* PathMaker DashBoard React
=========================================================

*/
import React from "react";
import { withRouter } from "react-router-dom";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

class UserHeader extends React.Component {

  render() {
    
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage: "url(" + require("assets/img/theme/nature-cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Ciao {this.props.user.nome}</h1>
                <p className="text-white mt-0 mb-5">
                  Questa è la tua pagina del profilo. Qui puoi verificare o modificare le
                  informazioni su di te e accettare le richieste d'iscrizione.
                </p>                
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(UserHeader);
