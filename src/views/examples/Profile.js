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
//import "./profile-pic.scss";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import * as firebase from "firebase/app";
import "firebase/firestore";

//var pic = document.getElementById('input-image');
//var pic=new Image();
//var pp="";
//var pic = document.getElementsByClassName("card-profile-image");
/*
function changeImage(a) {
  document.getElementById("img").src=a;
}

function imageClick(e) {
  changeImage(e)
}
*/

//var curr_pic=5;


const SearchContext = React.createContext();

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      profilePic:1,
    }
  }

  componentDidMount() {
    let db = firebase.firestore();

    let getUserData = async () => {
      const uid = localStorage.getItem("uid");
      let docRef = db.collection("users").doc(uid);

      await docRef.get()
        .then(doc => {
          this.setState(doc.data());
        });
      
      console.log(this.state);
     // console.log("TESTING HERE!!!");
     // console.log(this.state.profilePic);
    }

    // need to create a separate function to fetch user data since we cannot have an sync componentDidMount function
    // this is basically a dummy function
    getUserData();
  }
  
  saveAccountInfo(e) {
    e.preventDefault();
    let db = firebase.firestore();
    const uid = localStorage.getItem("uid");
    
    void db.collection("users").doc(uid).update(this.state);
  }

  chooseAvatar(index) {
    console.log("find ID: "+index)
    document.getElementById("dog"+this.state.profilePic.toString()).className="pic";
    document.getElementById("dog"+index.toString()).className="green";
    //curr_pic=index;
    this.forceUpdate();
  }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          id="img"
                          src={require("assets/img/avatar/dog"+this.state.profilePic+".jpeg")}
                          //src={pic}
                          //src={require("assets/img/avatar/ppl1.png")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    {/* <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button> */}
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        {/* <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div> */}
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {this.state.firstName + " " + this.state.lastName}
                      {/*<span className="font-weight-light">, 19</span>*/}
                    </h3>
                    
                    {/* 
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Los Angeles, United States
                    </div>

                    <hr className="my-4" />
                    <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      Show more
                    </a> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => this.saveAccountInfo(e)}
                        size="sm"
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="example@example.com"
                              type="email"
                              value={this.state.email}
                              // email should not be a modifiable value
                              // onChange={e => this.setState({email: e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              value={this.state.firstName}
                              onChange={e => this.setState({firstName: e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              value={this.state.lastName}
                              onChange={e => this.setState({lastName: e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>


                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">Profile Picture</h6>
                    <row>
                    <div class="pic-group">
                    <div id="dog1" class="pic" >
                      <img
                          src={require("assets/img/avatar/dog1.jpeg")}
                          onClick={()=>{
                            this.chooseAvatar(1);
                            this.setState({profilePic:1})}}
                        />
                    </div>
                    <div class="pic" id="dog2">
                        <img
                          src={require("assets/img/avatar/dog2.jpeg")}
                          onClick={()=>{
                            this.chooseAvatar(2);
                            this.setState({profilePic:2})}}
                        />
                    </div>
                    <div className="pic"id="dog3">
                        <img
                          src={require("assets/img/avatar/dog3.jpeg")}
                          onClick={()=>{
                            this.chooseAvatar(3);
                            this.setState({profilePic:3})}}
                        />
                    </div>
                    <div className="pic"id="dog4">
                        <img
                          src={require("assets/img/avatar/dog4.jpeg")}
                          onClick={()=>{
                            this.chooseAvatar(4);
                            this.setState({profilePic:4})}}
                        />
                    </div>
                    <div className="pic" id="dog5">
                      <img
                          src={require("assets/img/avatar/dog5.jpeg")}
                          onClick={()=>{
                            this.chooseAvatar(5);
                            this.setState({profilePic:5})}}
                        />
                    </div>
                    </div>

                    <div class="pic-group">
                    <div className="pic" id="dog6">
                        <img
                          src={require("assets/img/avatar/dog6.jpeg")}
                          onClick={()=>{
                            this.chooseAvatar(6);
                            this.setState({profilePic:6})}}
                        />
                    </div>
                    <div className="pic"id="dog7">
                        <img
                          src={require("assets/img/avatar/dog7.jpeg")}
                          onClick={()=>{
                            this.chooseAvatar(7);
                            this.setState({profilePic:7})}}
                        />
                    </div>
                    <div className="pic"id="dog8">
                        <img
                          src={require("assets/img/avatar/dog8.jpeg")}
                          onClick={()=>{
                            this.chooseAvatar(8);
                            this.setState({profilePic:8})}}
                        />
                    </div>
                    <div className="pic" id="dog9">
                      <img
                          src={require("assets/img/avatar/dog9.jpeg")}
                          onClick={()=>{
                            this.chooseAvatar(9);
                            this.setState({profilePic:9})}}
                        />
                    </div>
                    <div className="pic" id="dog10">
                      <img
                          src={require("assets/img/avatar/dog10.jpeg")}
                          onClick={()=>{
                            this.chooseAvatar(10);
                            this.setState({profilePic:10})}}
                        />
                    </div>
                    </div>
                    </row>


                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}


export default Profile;
//export {firstName,lastName};