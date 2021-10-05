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
  UncontrolledTooltip,

  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,

} from "reactstrap";

import Header from "components/Headers/Header.js";
import Graphs from "./graphs.js"

import { connect } from 'react-redux';
import { addUserData } from 'lib/redux/actions/app';

//import moment from 'moment';

const firebase = require("firebase/app");
require("firebase/firestore");

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stressIncidents: [],
      dateSort: true,
      stressSort: true,
      showTextBox: Array(6).fill(false),
      description: '',
      curr_id:-1,

      open:false,
      reason:'',
      stress:'',
      //data:moment().format('MM/DD/YYYY'),
      //time:moment().format('hh:mm A'),
      date:'',
      time:'',
    }
  }

  db = firebase.firestore();
  uid = localStorage.getItem("uid")

  componentDidMount() {
    //const uid = localStorage.getItem("uid")
    //let db = firebase.firestore();

    //when writing code to update data (description data) from website, no need to update the component manually. the below code will make the component update
    //let docRef = db.collection("users").doc(uid).collection("stress_incidents").orderBy("index")
    let docRef = this.db.collection("users").doc(this.uid).collection("stress_incidents").orderBy("index")
    docRef.onSnapshot((doc) => {
      var data = doc.docs.map(d => d.data())
      this.setState({
        stressIncidents: data,
      })
    })

    //db.collection("users").doc(uid).get()
    this.db.collection("users").doc(this.uid).get()
    .then((doc) => {
      this.props.addUserData(doc.data())
    })
  }

  onDateToggle(e){
    e.preventDefault();
    let sort = !this.state.dateSort;
    this.setState({
      dateSort: !this.state.dateSort,
      stressIncidents: sort ?
        this.state.stressIncidents.sort(function (a, b) {
          a = a.date.split('/');
          b = b.date.split('/');
          return b[2] - a[2] || b[0] - a[0] || b[1] - a[1];
        }) : this.state.stressIncidents.sort(function (a, b) {
          a = a.date.split('/');
          b = b.date.split('/');
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
        this.state.stressIncidents.sort((a,b) => b.stress_score - a.stress_score) : this.state.stressIncidents.sort((a,b) => a.stress_score - b.stress_score),
    });
  }

  //HOW TO COMBINE THE TWO UPDATES INTO ONE FUNCTION????
updateFirestore(des, curr_id) {
  let docRef = this.db.collection("users").doc(this.uid).collection("stress_incidents").where("index", "==", curr_id)
    //update entry content in Firebase
    docRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            doc.ref.update({
                    description: des,
                })
        })
    })

    .then(() => {
        this.setState({
            description:'',
            curr_id: -1
        })
        this.forceUpdate()
    })
    .catch((error) => {
        console.log("Could not update firestore with new entry. Error =", error)
    })
}

updateReason(des, curr_id) {
  let docRef = this.db.collection("users").doc(this.uid).collection("stress_incidents").where("index", "==", curr_id)
    //update entry content in Firebase
    docRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            doc.ref.update({
                    reason: des,
                })
        })
    })
    .then(() => {
        this.setState({
            curr_id: -1
        })
        this.forceUpdate()
    })
    .catch((error) => {
        console.log("Could not update firestore with new entry. Error =", error)
    })
}


//add new incident
createIncident=()=>{
  //get ID first
  var maxx=0 //difference between "let" and "var"

 let docRef = this.db.collection("users").doc(this.uid).collection("stress_incidents") //.doc()?
 
 docRef.get().then((snapshot) => {
  snapshot.forEach((doc) => {
      if (doc.data().index > maxx) {
          maxx=doc.data().index
      }
  })
  let entry_id=parseInt(maxx)+1

  this.incidentSubmit(entry_id)
  })
}

incidentSubmit = (entry_id) => {
  this.add2Firestore(entry_id, this.state.reason, this.state.stress, this.state.date,this.state.time,
      this.state.description) 
}

add2Firestore(entry_id, reason, stress,date,time,description) {
  let db = firebase.firestore();

  const uid = localStorage.getItem("uid")
  let docRef = db.collection("users").doc(uid).collection("stress_incidents")
  docRef.add({
      index:entry_id,
      reason:reason,
      stress:stress,
      date:date,
      time:time,
      description:description
  })

  .then(() => {
      this.setState({
          open: false,
          reason: '',
          stress: '',
          date: '',
          time: '',
          description: '',
          index: '',
      })
      this.forceUpdate()
  })
  .catch((error) => {
      console.log("Could not update firestore with new incident entry. Error =", error)
  })
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
                    <Button size='sm' onClick={e=>this.setState({open:true})}>Add</Button>
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
                        <td key={String(incident.index)+String(incident.index)}>
                          <Input 
                            type="select" 
                            defaultValue={incident.reason}
                            //onChange={(e) => console.log(`stress reason changed to ${e.target.value}`)}
                            onChange={(e) => {this.updateReason(e.target.value,incident.index)}}
                          >
                            <option>Work</option>
                            <option>Social</option>
                            <option>Money</option>
                            <option>Family</option>
                            <option>Other</option>
                          </Input>
                        </td>
                        <td>{incident.stress}</td>
                        <td>{incident.date}</td>
                        <td>{incident.time}</td>
                        <td key={incident.index}>
                          <Input type="textarea"
                            //defaultValue={`${incident.description} on ${incident.date}`}
                            defaultValue={incident.description}
                            //defaultValue={this.props.description}
                            id={'Box'+incident.index}
                            plaintext={!this.state.showTextBox[incident.index]}
                            onDoubleClick={(e) => {
                              e.preventDefault();
                              this.state.showTextBox[incident.index] = true; 
                              this.state.description=`${incident.description}`; //added here
                              this.forceUpdate();
                            }}
                            onChange={e => this.setState({description: e.target.value})} //editing
                          />
                          <UncontrolledTooltip delay={0} placement='right' trigger="hover focus" target={'Box'+incident.index}>
                            Double Click Me to Edit!
                          </UncontrolledTooltip>                          
                          {
                            this.state.showTextBox[incident.index] && 
                            <div>
                            <Button
                              //style={{left:"0%"}}
                              color='default'
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault(); // what does it do?
                                this.state.description='';
                                this.state.showTextBox[incident.index] = false;
                                this.forceUpdate();
                              }}
                            >Save</Button>

                             <Button
                            style={{right:"0%"}}
                            color='default'
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault(); // what does it do?
                              this.updateFirestore(this.state.description, incident.index);
                              this.state.showTextBox[incident.index] = false;
                              this.state.description='';
                              this.forceUpdate();
                            }}
                          >Cancel</Button>
                          </div>
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



        <Modal isOpen={this.state.open} modalTransition={{timeout: 0}}>
                    <Card className="bg-secondary shadow bg-white border-0">
                        <CardHeader className="align-items-end">
                            <Row>
                                <Col xs="7" className="mt-2">
                                    <h3> New stress incident </h3>
                                </Col>
                                <Col xs="5" className="mt-2">
                                    <Button close onClick={() => {this.state.open=false; this.forceUpdate()}}/> 
                                </Col>
                            </Row>
                        </CardHeader>
                        <ModalBody>
                            <div className="pl-lg-2">
                                <Form>
                                    <FormGroup>
                                        <label>Reason</label>
                                        <Input 
                                            type="select" 
                                            defaultValue={this.state.reason}
                                            onChange={(e) => {this.setState({reason:e.target.value})}}
                                        >
                                            <option> </option>
                                            <option>Work</option>
                                            <option>Social</option>
                                            <option>Money</option>
                                            <option>Family</option>
                                            <option>Other</option>
                                        </Input>
                                        <label>Stress Score</label>
                                        <Input 
                                            type="select" 
                                            defaultValue={this.state.stress}
                                            onChange={(e) => {this.setState({stress:e.target.value})}}
                                        >
                                            <option> </option>
                                            <option>High</option>
                                            <option>Moderate</option>
                                            <option>Low</option>
                                        </Input>
                                        
                                        <label>Date</label>
                                        <Input 
                                            class="form-control"
                                            type="date" 
                                            id="date-input"

                                            defaultValue={this.state.date}
                                            onChange={(e) => {this.setState({date:e.target.value})}}
                                        />
                                        <label>Time</label>
                                        <Input 
                                            class="form-control"
                                            //format="hh:mm A"
                                            type="time" 
                                            id="time-input"
                                            defaultValue={this.state.time}
                                            onChange={(e) => {this.setState({time:e.target.value})}}
                                        />

                                    </FormGroup>
                                    <FormGroup>
                                        <label>Description</label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Start your entry here ..."
                                            rows="4"
                                            type="textarea"
                                            value={this.state.description}
                                            onChange={e => this.setState({description: e.target.value})}
                                        />
                                    </FormGroup>
                                </Form>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='primary' className='mt--2' onClick={() => {this.createIncident()}}> Save </Button>
                        </ModalFooter>
                    </Card>
                </Modal>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addUserData: (userData) => dispatch(addUserData(userData)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Index);
