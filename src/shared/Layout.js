import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Container
} from 'reactstrap';


export default class Dash extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    getUserInfo() {
        // const CurPage = this;
        // axios.post(configData.API + 'login', this.state,
        //     {
        //         headers: {
        //             'Access-Control-Allow-Origin': '*',
        //             'Access-Control-Allow-Credentials': true
        //         }
        //     })
        //     .then(response => {
        //         if (response.data !== 'fail') {

        //             console.log(response);
        //             CurPage.setState({ redirect: true, profile: response.data });
        //             localStorage.setItem('data', JSON.stringify(response.data));
        //         }
        //     })
        //     .catch(function (response) {
        //         console.log(response);
        //     });
    }

    render() {
        return (
            <div>
                <Navbar color="transparent" light expand="md" className="border-top border-info">
                    <Container>
                        <NavbarBrand href="/">E-Balance</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret> Logged In User </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem> Logout </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem> Reset Password </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

                {this.props.children}
            </div>
        );
    }
}