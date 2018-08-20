import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container, Row, Col,
    Card, CardBody,
    Form, FormGroup, Input, Label, Button
} from 'reactstrap';

const configData = require('../../assets/config.json');

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            id_type: "",
            id_number: "",
            phone_number: "",
            next_of_kin: ""
        }
    }

    getFormInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleUserRegisteration() {
        // console.log(this.state);

        axios.post(configData.API + 'signup', this.state,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }
            })
            .then(function (response) {
                console.log(response);
                window.location.href = "/login";
            })
            .catch(function (response) {
                console.log(response);
                alert("User registeration failed", response);
            });
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="pt-3">
                        <Col className="content">
                            <img src={require('../../assets/img/pie-chart.svg')} className="width-100" alt="sth" />
                        </Col>
                        <Col md={7}>
                            <h4>E-Balance Portal</h4>
                            <h5 className="text-muted">Sign Up</h5>
                            <Card>
                                <CardBody>
                                    <Form>
                                        <FormGroup>
                                            <Label for="exampleEmail">Name</Label>
                                            <Input type="text" name="name" placeholder="Full Name eg.(John Ato)" onChange={this.getFormInput.bind(this)} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md={7}>
                                                <Label for="exampleEmail">Email</Label>
                                                <Input type="email" name="email" placeholder="Email eg.(me@mail.com)" onChange={this.getFormInput.bind(this)} />
                                            </Col>
                                            <Col>
                                                <Label for="exampleEmail">Phone Number</Label>
                                                <Input type="phone" name="phone_number" placeholder="eg.(0202070981)" onChange={this.getFormInput.bind(this)} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="exampleEmail">Password</Label>
                                            <Input type="password" name="password" placeholder="*******" onChange={this.getFormInput.bind(this)} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md={4}>
                                                <Label for="exampleSelect">ID Type</Label>
                                                <Input type="select" name="id_type" onChange={this.getFormInput.bind(this)}>
                                                    <option value=""> Select ID Type </option>
                                                    <option value="Voters">Voters</option>
                                                    <option value="NHIS">NHIS</option>
                                                    <option value="Drivers License">Drivers License</option>
                                                    <option value="Passport">Passport</option>
                                                </Input>
                                            </Col>
                                            <Col>
                                                <Label for="exampleEmail">ID Number</Label>
                                                <Input type="text" name="id_number" placeholder="ID Card Number eg.(A3D3029)" onChange={this.getFormInput.bind(this)} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="exampleEmail">Next of Kin</Label>
                                            <Input type="text" name="next_of_kin" placeholder="Next of kin name eg.(Carl Vin)" onChange={this.getFormInput.bind(this)} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col className="pt-2"> <p>Already have an account? <Link to="/login">Login</Link></p></Col>
                                            <Col className="text-right">
                                                <Button color="info" onClick={() => this.handleUserRegisteration(this)}>SIGN UP NOW</Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}