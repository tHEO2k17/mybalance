import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import {
    Container, Row, Col,
    Card, CardBody,
    Form, FormGroup, Input, Label, Button
} from 'reactstrap';

const configData = require('../../assets/config.json');



export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            profile: '',
            redirect: false
        }
    }

    getFormInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleUserLogin() {
        const CurPage = this;
        axios.post(configData.API + 'login', this.state,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }
            })
            .then(response => {
                if (response.data !== 'fail') {

                    console.log(response);
                    CurPage.setState({ redirect: true});
                    localStorage.setItem('data', JSON.stringify(response.data));
                }
            })
            .catch(function (response) {
                console.log(response);
            });
    }

    render() {
        const { redirect } = this.state

        if (redirect)
            return (<Redirect to={{
                pathname: '/dash',
                state: { referrer: this.state.profile }
            }} />)
        return (
            <div>
                <Container>
                    <Row className="pt-3">
                        <Col className="content">
                            <img src={require('../../assets/img/graph.svg')} className="width-100" alt="sth" />
                        </Col>
                        <Col md={7}>
                            <h4>E-Balance Portal</h4>
                            <h5 className="text-muted">Login</h5>
                            <Card>
                                <CardBody>
                                    <Form>
                                        <FormGroup>
                                            <Label for="exampleEmail">Email</Label>
                                            <Input type="email" name="email" placeholder="Email eg.(me@mail.com)" onChange={this.getFormInput.bind(this)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="exampleEmail">Password</Label>
                                            <Input type="password" name="password" placeholder="*******" onChange={this.getFormInput.bind(this)} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col className="pt-2"> <p>Don't have an account? <Link to="/">Register</Link></p></Col>
                                            <Col className="text-right">
                                                <Button color="info" onClick={() => this.handleUserLogin(this)}>LOGIN</Button>
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