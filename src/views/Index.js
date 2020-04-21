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

import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Input,
  CustomInput,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import Graphs from "./graphs.js"
import stressIncidents from "./stress_incidents.js";

class DropDown extends React.Component {
  render() {
      return (
          <CustomInput type="select" defaultValue={this.props.option}>
              <option>Work</option>
              <option>Social</option>
              <option>Money</option>
              <option>Family</option>
              <option>Other</option>
          </CustomInput>
      );
  }
};

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stressIncidents: stressIncidents.sort((a,b) => parseInt(b.Date) - parseInt(a.Date)),
      dateSort: true,
      stressSort: true,
    }
  }

  onDataToggle(e){
    e.preventDefault();
    let sort = !this.state.dateSort;
    this.setState({
      dateSort: !this.state.dateSort,
      stressIncidents: sort ? stressIncidents.sort((a,b) => parseInt(b.Date) - parseInt(a.Date)) : stressIncidents.sort((a,b) => parseInt(a.Date) - parseInt(b.Date)),
    });
  }

  onStressToggle(e){
    e.preventDefault();
    let sort = !this.state.stressSort;
    this.setState({
      stressSort: !this.state.stressSort,
      stressIncidents: sort ? stressIncidents.sort((a,b) => b.StressScore - a.StressScore) : stressIncidents.sort((a,b) => a.StressScore - b.StressScore),
    });
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }
  
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Graphs />
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Recent High Stress Incidents</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"><Button>Reason</Button></th>
                      <th scopr="col"><Button onClick={e => this.onStressToggle(e)}>Stress Score</Button></th>
                      <th scope="col"><Button onClick={e => this.onDataToggle(e)}>Date</Button></th>
                      <th scope="col"><Button>Time</Button></th>
                      <th scope="col"><Button>Description</Button></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.stressIncidents.map(incident => 
                      <tr>
                        <td>
                          <DropDown option={incident.Reason}/>
                        </td>
                        <td>{incident.Stress}</td>
                        <td>{incident.Date}</td>
                        <td>{incident.Time}</td>
                        <td>
                          <Input type="textarea"
                          defaultValue={incident.Description + incident.Date}>
                          </Input>
                          {/* {incident.Description} */}
                        </td>
                      </tr>
                      )}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;