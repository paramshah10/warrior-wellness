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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
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
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav1: 1,
      activeNav2: 1,
      chartExample1Data: "data1",
      chartExample2Data: "data1",
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  toggleNavs = (e, col, data) => {
    e.preventDefault();
    if (col == 1){ //stress
      this.setState({
        activeNav1: data
      });
      if (data == 1){
        this.setState({
          chartExample1Data:
            this.state.chartExample1Data = "data1"
        });
      }
      else if (data == 2){
        this.setState({
          chartExample1Data:
            this.state.chartExample1Data = "data2"
        });
      }
      else{
        this.setState({
          chartExample1Data:
            this.state.chartExample1Data = "data3"
        });
      }
    }
    else{ //sleep
      this.setState({
        activeNav2: data
      });
      if (data == 1){
        this.setState({
          chartExample2Data:
            this.state.chartExample2Data = "data1"
        });
      }
      else {
        this.setState({
          chartExample2Data:
            this.state.chartExample2Data = "data2"
        });
      }
    }
  };

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Stress Score</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav1 === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1, 1)}
                          >
                            <span className="d-none d-md-block">Day</span>
                            <span className="d-md-none">D</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav1 === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav1 === 3
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1, 3)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={chartExample1[this.state.chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="mb-0">Sleep</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav2 === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2, 1)}
                            >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav2 === 2
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2, 2)}
                            >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={chartExample2[this.state.chartExample2Data]}
                      options={chartExample2.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
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
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Work</th>
                      <td>04/11/2020</td>
                      <td>2:00 PM</td>
                      <td>
                        {/* <i className="fas fa-arrow-up text-success mr-3" />{" "} */}
                        Heard a rumour in the office that the higher authorities were cutting jobs.
                        <br/>
                        Scared that I would be let go from the company.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Work</th>
                      <td>02/11/2020</td>
                      <td>3:40 PM</td>
                      <td>
                        {/* <i className="fas fa-arrow-up text-success mr-3" />{" "} */}
                        Boss assigned me more work when I was already drowing in the current work.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Family</th>
                      <td>01/11/2020</td>
                      <td>7:20 PM</td>
                      <td>
                        {/* <i className="fas fa-arrow-down text-warning mr-3" />{" "} */}
                        Daughter broke her new iphone and demanded to buy her a new one.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Money</th>
                      <td>18/03/2020</td>
                      <td>4:20 PM</td>
                      <td>
                        {/* <i className="fas fa-arrow-down text-warning mr-3" />{" "} */}
                        Rent due in 2 days but haven't been able to gather the money yet.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Work</th>
                      <td>12/03/2020</td>
                      <td>4:12 PM</td>
                      <td>
                        {/* <i className="fas fa-arrow-down text-danger mr-3" />{" "} */}
                        Project due at the end of the month but worried will meet all deadlines.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Family</th>
                      <td>02/03/2020</td>
                      <td>8:19 PM</td>
                      <td>
                        {/* <i className="fas fa-arrow-down text-danger mr-3" />{" "} */}
                        Just got in a fight with my wife over small a issue.
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
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
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
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
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
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
                      <th scope="row">Google</th>
                      <td>4,807</td>
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
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
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
                      <th scope="row">twitter</th>
                      <td>2,645</td>
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
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
