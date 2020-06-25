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
    NavItem
} from 'reactstrap'

//redux
import { connect } from 'react-redux';
import { receiveEntries } from 'lib/redux/actions/journal';

const firebase = require("firebase");
require("firebase/firestore");

class Journal extends React.Component {
    constructor(props){
        super(props);
      }

    componentDidMount() {
        if (!this.props.fetchedInitial){
            let db = firebase.firestore();

            const email = localStorage.getItem("email")
            let docRef = db.collection("users").doc(email).collection("journal")
            docRef.get().then((doc) => {
                var data = doc.docs.map(doc => doc.data())
                this.props.receiveEntries(data)
                this.setState({
                    fetchedInitial: true
                })
            })
            .catch((error) => {
                console.log("Couldn't fetch journal entries. Error: ", error)
            })
        }
    }

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
                    >
                        <div className="d-flex w-100 justify-content-between">
                        <div>
                            <div className="d-flex w-100 align-items-center">
                            <img
                                alt="..."
                                className="avatar avatar-xs mr-2"
                                src={require("assets/img/theme/journal.png")}
                            />
                            <h4 className="mb-1">{entry.subject}</h4>
                            </div>
                        </div>
                        <small>Last Edited {entry.date_edited}</small>
                        </div>
                        <h6 className="mt-4 mb-2">Created {entry.date_created} </h6>
                        <p className="text-sm mb-0">{entry.content}</p>
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
        </Container>
        </>
      )
  }
}
const mapStateToProps = (state) => {
    return {
      entries: state.entries,
      fetchedInitial: state.fetchedInitial,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        receiveEntries: (entries) => dispatch(receiveEntries(entries))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Journal)


// export default Journal;