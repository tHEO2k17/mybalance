import React, { Component } from 'react';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import {
    Container, Row, Col,
    Card, CardBody, Jumbotron
} from 'reactstrap';

const configData = require('../assets/config.json');

export default class Dash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: localStorage.getItem('data'),
            data: []
        }
    }

    componentWillMount() {
        this.getBalance(JSON.parse(this.state.token));
    }

    getBalance(inc) {
        const CurPage = this;

        axios.get(configData.API + 'accounts',
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + inc.token,
                    'Access-Control-Allow-Credentials': true,
                    'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            })
            .then(response => {
                if (response.data !== 'fail') {
                    console.log(response.data);
                    CurPage.setState({ data: response.data });
                    // localStorage.setItem('data', JSON.stringify(response.data));
                }
            })
            .catch(function (response) {
                console.log(response);
            });
    }
    render() {
        const options = {
            items: 3,
            nav: true,
            navText: ["<i className='icon-arrow-left'></i>", "<i className='icon-arrow-right'></i>"],
            rewind: true,
            autoplay: true
        };

        const display = this.state.data.map((elem, index) => {
            var sub = elem.transactions.map((dt, ind) => {
                return (
                    <div key={ind} className="pb-4">
                        <Card className="mr-3">
                            <CardBody>
                                <p className="text-muted fs-16"> {dt.kind}</p>
                                <h3><small className="fs-16">GHS.&nbsp;</small>{dt.amount} <br />
                                    <small className="text-muted fs-16">
                                        {new Intl.DateTimeFormat('en-GB', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: '2-digit'
                                        }).format(new Date(dt.created_at))}
                                    </small>
                                </h3>
                            </CardBody>
                        </Card>
                    </div>

                );
            })
            return (
                <li key={index}>
                    <h5 className="text-right"><small className="text-uppercase text-muted">{elem.name}</small>&nbsp;{elem.balance}</h5>
                    <OwlCarousel ref="car" options={options}>
                        {sub}
                    </OwlCarousel>
                </li>
            )
        });
        return (
            <div>
                <Jumbotron className="bg-info text-white rounded-0" fluid>
                    <Container >
                        <h1 className="text-light">Hello, User!</h1>
                        <p className="lead">Welcome to the E-Balance App</p>
                    </Container>
                </Jumbotron>
                <Container className="pt-3">
                    <Row>
                        <Col>
                            <ul className="list-unstyled">
                                {display}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}