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
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  InputGroup,
  CustomInput,
} from "reactstrap";


import Header from "components/Headers/Header.js";
import Graphs from "./graphs.js"

class Index extends React.Component {
  
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
                    {/* <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div> */}
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Reason</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scopr="col">Stress Score</th> 
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                      <CustomInput type="select" className="mr-3" id="stressSelect">
                        <option>Work</option>
                        <option>Social</option>
                        <option>Money</option>
                        <option>Family</option>
                        <option>Other</option>
                      </CustomInput>
                      </th>
                      <td>04/11/2020</td>
                      <td>2:00 PM</td>
                      <td>
                        <span className="mt-3 text-md">
                          High
                        </span>
                      </td>
                      <td>
                        {/* <i className="fas fa-arrow-up text-success mr-3" />{" "} */}
                        {/* Heard a rumour in the office that the higher authorities were cutting jobs.
                        <br/>
                        Scared that I would be let go from the company. */}
                        {/* <FormGroup>
                          <Label for="exampleText" />
                          <Input type="textarea" name="text" id="exampleText" />
                        </FormGroup> */}
                        <Input type="textarea" defaultValue="Heard a rumour in the office that the higher authorities were cutting jobs.
                        Scared that I would be let go from the company."/>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <CustomInput type="select" className="mr-3" id="stressSelect" plaintext="false" defaultValue="Work">
                        <option>Work</option>
                        <option>Social</option>
                        <option>Money</option>
                        <option>Family</option>
                        <option>Other</option>
                        </CustomInput>
                      </th>
                      <td>02/11/2020</td>
                      <td>3:40 PM</td>
                      <td>
                        <span className="mt-3 text-md">
                        High
                        </span>
                      </td>
                      <td>
                        {/* <i className="fas fa-arrow-up text-success mr-3" />{" "} */}
                        {/* Boss assigned me more work when I was already drowing in the current work. */}
                        <Input type="textarea" plaintext
                          //onChange={(e) => console.log(e.target.value)}
                          defaultValue="Boss assigned me more work when I was already drowning in the current work."
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <CustomInput type="select" className="mr-3" id="stressSelect" defaultValue="Family">
                        <option>Work</option>
                        <option>Social</option>
                        <option>Money</option>
                        <option>Family</option>
                        <option>Other</option>
                        </CustomInput>
                      </th>
                      <td>01/11/2020</td>
                      <td>7:20 PM</td>
                      <td>
                      <span className="mt-3 text-md">
                        Moderate
                        </span>
                      </td>
                      <td>
                        {/* <i className="fas fa-arrow-down text-warning mr-3" />{" "} */}
                        Daughter broke her new iphone and demanded to buy her a new one.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <CustomInput type="select" className="mr-3" id="stressSelect" defaultValue="Money">
                        <option>Work</option>
                        <option>Social</option>
                        <option>Money</option>
                        <option>Family</option>
                        <option>Other</option>
                        </CustomInput>
                      </th>
                      <td>18/03/2020</td>
                      <td>4:20 PM</td>
                      <td>
                        <span className="mt-3 text-md">
                        Very High
                        </span>
                      </td>
                      <td>
                        {/* <i className="fas fa-arrow-down text-warning mr-3" />{" "} */}
                        Rent due in 2 days but haven't been able to gather the money yet.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <CustomInput type="select" className="mr-3" id="stressSelect" defaultValue="work">
                        <option>Work</option>
                        <option>Social</option>
                        <option>Money</option>
                        <option>Family</option>
                        <option>Other</option>
                        </CustomInput>
                      </th>
                      <td>12/03/2020</td>
                      <td>4:12 PM</td>
                      <td>
                        <span className="mt-3 text-md">
                        Very High
                        </span>
                      </td>
                      <td>
                        {/* <i className="fas fa-arrow-down text-danger mr-3" />{" "} */}
                        Project due at the end of the month but worried will meet all deadlines.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <CustomInput type="select" className="mr-3" id="stressSelect" defaultValue="Family">
                        <option>Work</option>
                        <option>Social</option>
                        <option>Money</option>
                        <option>Family</option>
                        <option>Other</option>
                        </CustomInput>
                      </th>
                      <td>02/03/2020</td>
                      <td>8:19 PM</td>
                      <td>
                        <span className="mt-3 text-md">
                        High
                        </span>
                      </td>
                      <td>
                        {/* <i className="fas fa-arrow-down text-danger mr-3" />{" "} */}
                        Just got in a fight with my wife over small a issue.
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            {/* <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Additional Analysis</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Feature 1</th>
                      <th scope="col">Feature 2</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Label #1</th>
                      <td>Data #1</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Label #2</th>
                      <td>Data #2</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Label #3</th>
                      <td>Data #3</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Label #4</th>
                      <td>Data #4</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Label #5</th>
                      <td>Data #5</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
