import React from 'react';

import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    FormGroup,
    Form,
    Col,
    Input,
    Card,
    CardHeader,
    Row
} from 'reactstrap';
import { connect } from 'react-redux';
import { addEntry } from 'lib/redux/actions/journal';

class JournalIcon extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            subject: '',
            content: '',
        }
    }

    journalSubmit = () => {
        const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        var date = new Date()
        var today = monthName[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()

        let entry_num = localStorage.getItem('num_journal_entries') ? parseInt(localStorage.getItem('num_journal_entries')) : (0)
        localStorage.setItem('num_journal_entries', entry_num + 1)
        
        this.props.addEntry(entry_num, this.state.subject, this.state.content, today)

        this.setState({
            subject: '',
            content: '',
            open: false,
        })
    }

    render(){
        return(
            <>
                <div style={{position: "fixed", left: "289px",  bottom: "25px", zIndex: '1'}}>
                    <Button style={{borderRadius: "40%"}} className="py-0 px-0" onClick={() => {this.state.open=true; this.forceUpdate()}}>
                        <img
                        alt="..."
                        className="avatar avatar-xs"
                        src={require("assets/img/theme/journal.png")}
                        />
                    </Button>
                </div>
                
                <Modal isOpen={this.state.open} modalTransition={{timeout: 0}}>
                    <Card className="bg-secondary shadow bg-white border-0">
                        <CardHeader className="align-items-end">
                            <Row>
                                <Col xs="7" className="mt-2">
                                    <h3> Create a Journal Entry! </h3>
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
                                            value={this.state.subject}
                                            onChange={e => this.setState({subject: e.target.value})}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Content</label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Start your entry here ..."
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
                            <Button color='primary' className='mt--2' onClick={() => this.journalSubmit()}> Save </Button>
                        </ModalFooter>
                    </Card>
                </Modal>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEntry: (id, subject, content, date) => dispatch(addEntry(id, subject, content, date))
    }
}
  
export default connect(
    null,
    mapDispatchToProps
)(JournalIcon)

// export default JournalIcon;