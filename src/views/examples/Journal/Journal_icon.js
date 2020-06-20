import React from 'react';

import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    FormGroup,
    Label,
    Form,
    Col,
    Input,
    Card,
    Container,
    CardHeader,
    Row
} from 'reactstrap';

class JournalIcon extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
        }
    }

    render(){
        return(
            <div style={{position: "fixed",  left: "289px",  bottom: "25px"}}>
                {!this.state.open &&
                    <Button onClick={() => {this.state.open=true; this.forceUpdate()}}>
                        <img
                        alt="..."
                        className="avatar avatar-xs mr-2"
                        src={require("assets/img/theme/journal.png")}
                        />
                    </Button>
                }
                <Modal isOpen={this.state.open}>
                    <Card className="bg-secondary shadow bg-white border-0">
                        <CardHeader>
                            <ModalHeader><h3> Create a Journal Entry! </h3> </ModalHeader>
                        </CardHeader>
                        <ModalBody>
                            <div className="pl-lg-2">
                                <FormGroup>
                                    <label>Subject</label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="Subject"
                                        rows="1"
                                        type="textarea"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Content</label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="Start your entry here ..."
                                        rows="4"
                                        type="textarea"
                                    />
                                </FormGroup>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button className='mt--2' onClick={() => {this.state.open=false; this.forceUpdate()}}> Save </Button>
                        </ModalFooter>
                    </Card>
                </Modal>
            </div>
        )
    }
}

export default JournalIcon;