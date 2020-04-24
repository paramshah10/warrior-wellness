import React, { useState } from "react";

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
  UncontrolledTooltip,
  Collapse,
  CardBody,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import Graphs from "./graphs.js"
import stressIncidents from "./stress_incidents.js";

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stressIncidents: stressIncidents.sort((a,b) => parseInt(b.Date) - parseInt(a.Date)),
      dateSort: true,
      stressSort: true,
      showTextBox: Array(6).fill(false),
    }
  }

  onDateToggle(e){
    e.preventDefault();
    let sort = !this.state.dateSort;
    this.setState({
      dateSort: !this.state.dateSort,
      stressIncidents: sort ?
        this.state.stressIncidents.sort(function (a, b) {
          a = a.Date.split('/');
          b = b.Date.split('/');
          return b[2] - a[2] || b[0] - a[0] || b[1] - a[1];
        }) : this.state.stressIncidents.sort(function (a, b) {
          a = a.Date.split('/');
          b = b.Date.split('/');
          return a[2] - b[2] || a[0] - b[0] || a[1] - b[1];
        })
    });
  }

  onStressToggle(e){
    e.preventDefault();
    let sort = !this.state.stressSort;
    this.setState({
      stressSort: !this.state.stressSort,
      stressIncidents: sort ? 
        this.state.stressIncidents.sort((a,b) => b.StressScore - a.StressScore) : this.state.stressIncidents.sort((a,b) => a.StressScore - b.StressScore),
    });
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }
  
  render() {
    let descriptions = Array(6).fill(""); //this.state.stressIncidents.Description.slice();
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
                      <th scope="col"><Button onClick={e => this.onDateToggle(e)}>Date</Button></th>
                      <th scope="col"><Button>Time</Button></th>
                      <th scope="col"><Button>Description</Button></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.stressIncidents.map(incident => 
                      <tr>
                        <td key={incident.Reason}>
                          <Input 
                            type="select" 
                            defaultValue={incident.Reason}
                            onChange={(e) => console.log(`stress reason changed to ${e.target.value}`)}
                          >
                            <option>Work</option>
                            <option>Social</option>
                            <option>Money</option>
                            <option>Family</option>
                            <option>Other</option>
                          </Input>
                        </td>
                        <td>{incident.Stress}</td>
                        <td>{incident.Date}</td>
                        <td>{incident.Time}</td>
                        <td key={incident.Index}>
                          <Input type="textarea"
                            defaultValue={`${incident.Description} on ${incident.Date}`}
                            id={'Box'+incident.Index}
                            plaintext={!this.state.showTextBox[incident.Index]}
                            onDoubleClick={(e) => {
                              e.preventDefault();
                              this.state.showTextBox[incident.Index] = true; 
                              this.forceUpdate();
                            }}
                            // onChange={(e) => {console.log(`changed to ${e.target.value}`); descriptions[incident.Index] = e.target.value;}}
                          />
                          <UncontrolledTooltip delay={0} placement='right' trigger="hover focus" target={'Box'+incident.Index}>
                            Double Click Me to Edit!
                          </UncontrolledTooltip>                          
                          {
                            this.state.showTextBox[incident.Index] && 
                            <Button
                              color='default'
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                this.state.showTextBox[incident.Index] = false;
                                this.forceUpdate();
                              }}
                            >Save</Button>
                          }
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