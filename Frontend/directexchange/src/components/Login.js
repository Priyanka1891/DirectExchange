import React, { Component } from 'react';
import Headers from './Header';
import Footer from './Footer';

class Login extends Component {
    constructor() {
        super();
        this.state = {

            redirectPage: '',
            showError: false,
        };
    }

    componentDidMount() {

    }

  
    render() {

        return (
            <div>
                {this.state.redirectPage}
                <div>
                    <Headers selectedKey={['3']} />
                </div>
             
                <div>
                    <Footer />
                </div>

            </div>
        );
    }
}

export default Login;