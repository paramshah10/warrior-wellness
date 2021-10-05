import React from 'react';
import {
    Container,
    Card,
    CardHeader,
    Button,
    ListGroupItem,
    ListGroup,
    Row,
    Col,
    Nav,
    NavItem,
    //added
    Modal,
    ModalBody,
    ModalFooter,
    FormGroup,
    Form,
    Input
} from 'reactstrap'

//redux
import { connect } from 'react-redux';
import { receiveEntries } from 'lib/redux/actions/journal';
import { removeEntry } from 'lib/redux/actions/journal';

const firebase = require("firebase/app");
require("firebase/firestore");

class Journal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            subject: '',
            content: '',
            showED: {},
            open: false,
            curr_id: -1
        }
      }

    db = firebase.firestore();
    uid = localStorage.getItem("uid")


    componentDidMount() {
        if (!this.props.fetchedInitial){        
            let docRef = this.db.collection("users").doc(this.uid).collection("journal").orderBy('id')
            docRef.get().then((doc) => {
                var data = doc.docs.map(doc => doc.data())
                this.props.receiveEntries(data, data.length)
                this.setState({
                    fetchedInitial: true
                })
            })
            .catch((error) => {
                console.log("Couldn't fetch journal entries. Error: ", error)
            })
        }
    }

    onEntryDelete(id) {
        let docRef = this.db.collection("users").doc(this.uid).collection("journal").where("id", "==", id)
        docRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.ref.delete()
            })
            //this part id, entry number needs to be fixed!!!!
            this.props.removeEntry(id)
            this.forceUpdate()
        })
        .catch((error) => {
            console.log("Could not delete the entry! ERROR:", error);
        })
    }

    onEntryEdit(id) {
        let docRef = this.db.collection("users").doc(this.uid).collection("journal").where("id", "==", id)

        docRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                //  HOW TO RETRIEVE DATA FROM FIREBASE?? THIS CODE IS WORKING BUT I FEEL THERE'S SOMETHING WRONG
                //  HOW DO I GET SPECIFIC COMPONENT IN THIS DOCREF??????
                //  WOULD I BE ABLE TO ONLY EXTRACT "SUBJECT" FOR EXAMPLE???????
                this.setState(doc.data()) 
            })
            //this.forceUpdate()
        })

        console.log("Edited");
    }

    journalSubmit = (curr_id) => {
        const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        var date = new Date()
        var today = monthName[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        this.updateFirestore(this.state.subject, this.state.content, today, curr_id)
    }

    updateFirestore(subject, content, today, curr_id) {
        let docRef = this.db.collection("users").doc(this.uid).collection("journal").where("id", "==", curr_id)
        //update entry content in Firebase
        docRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.ref.update({
                        content: content,
                        date_edited: today,
                        subject: subject,
                    })
            })
            //this.forceUpdate()
        })

        .then(() => {
            this.setState({
                subject: '',
                content: '',
                open: false,
                curr_id: -1
            })
        })
        .catch((error) => {
            console.log("Could not update firestore with new journal entry. Error =", error)
        })
    }

    reload=()=>window.location.reload() // won't store new edits, would reload to 

    render() {
      return(
        <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"/>
        <Container className="mt--7" fluid>
            <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">Recent Notes</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                        <Nav className="justify-content-end" pills>
                            <NavItem className="py-3 px-3">
                            <h5 className="mb-0">Sort by:</h5>
                            </NavItem>
                            <NavItem className="py-2 px-3">
                            <Button
                                color="primary"
                                onClick={e => {e.preventDefault();  this.forceUpdate()}}
                                size="sm"
                            >
                                Date Created
                            </Button>
                            </NavItem>
                            <NavItem className="py-2 px-3">
                            <Button
                                color="primary"
                                onClick={e => e.preventDefault()}
                                size="sm"
                            >
                                Date Edited
                            </Button>
                            </NavItem>
                        </Nav>
                    </Col>
                    </Row>
                </CardHeader>
                <ListGroup flush>
                    {/* Add hover over feature to display an edit and delete button */}
                    { this.props.entries.length != 0 && this.props.entries.map(entry =>
                    <ListGroupItem
                    className="list-group-item-action flex-column align-items-start py-4 px-4"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    onMouseEnter={() => {this.state.showED[entry.id] = true; this.forceUpdate()}}
                    onMouseLeave={() => {this.state.showED[entry.id] = false; this.forceUpdate()}}
                    >
                        <div className="d-flex w-100 justify-content-between">
                        <div>
                            <div className="d-flex w-100 align-items-center">
                            <img
                                alt="..."
                                className="avatar avatar-xs mr-2"
                                src={require("assets/img/theme/journal.png")}
                            />
                            {/*subject display!!!*/}
                            <h4 className="mb-1">{entry.subject}</h4>
                            </div>
                        </div>
                        <small>Last Edited {entry.date_edited}</small>
                        </div>
                        <Row>
                            <Col xs="11">
                                {/* content display */}
                                <h6 className="mt-4 mb-2">Created {entry.date_created} </h6>
                                <p className="text-sm mb-0">{entry.content}</p> 
                            </Col>
                        {
                            this.state.showED[entry.id] &&
                            <Col xs="1">
                                <Button className="col mt-4 d-none d-md-block" style={{bottom: 5}} color="default" size="sm" onClick={() => {this.onEntryEdit(entry.id); this.state.curr_id=entry.id; this.state.open=true}}>Edit</Button>
                                <Button className="col mt-4 d-md-none" style={{bottom: 2}} color="default" size="sm" onClick={() => this.onEntryEdit(entry.id)}>E</Button>

                                <Button className="col mt-1 d-none d-md-block" style={{bottom: 0}} color="default" size="sm" onClick={() => this.onEntryDelete(entry.id)}>Delete</Button>
                                <Button className="col mt-1 d-md-none" style={{bottom: 0}} color="default" size="sm" onClick={() => this.onEntryDelete(entry.id)}>D</Button>
                            </Col>
                        }
                        </Row>
                    </ListGroupItem>
                    )}

                    {this.props.entries.length == 0 &&
                    <ListGroupItem
                        className="list-group-item-action flex-column align-items-start py-4 px-4"
                    >
                        <p className="text-md mb-0">Notes created will be displayed here!</p>
                    </ListGroupItem>
                    }
                </ListGroup>
            </Card>

            <Modal isOpen={this.state.open} modalTransition={{timeout: 0}}>
                    <Card className="bg-secondary shadow bg-white border-0">
                        <CardHeader className="align-items-end">
                            <Row>
                                <Col xs="7" className="mt-2">
                                    <h3> Edit the entry </h3>
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
                                        <label>Subject</label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Subject"
                                            rows="1"
                                            type="textarea"
                                            value={this.state.subject} //{"warrior"} //fixed "warrior", can't change
                                            onChange={e => this.setState({subject: e.target.value})}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Content</label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Edit your entry here ..."
                                            rows="4"
                                            type="textarea"
                                            value={this.state.content}
                                            onChange={e => this.setState({content: e.target.value})}
                                        />
                                    </FormGroup>
                                </Form>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='primary' className='mt--2' onClick={() => {this.journalSubmit(this.state.curr_id)}}> Save </Button>
                        </ModalFooter>
                    </Card>
                </Modal>

        </Container>

        </>
      )
  }
}
const mapStateToProps = (state) => {
    return {
      entries: state.journal.entries,
      fetchedInitial: state.journal.fetchedInitial,
      num_entries: state.journal.num_entries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        receiveEntries: (entries, num_entries) => dispatch(receiveEntries(entries, num_entries)),
        removeEntry: (id) => dispatch(removeEntry(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Journal)


// export default Journal;