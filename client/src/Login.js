import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            dob: ''
        };
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleDob = this.handleDob.bind(this);
        this.clearvalues = this.clearvalues.bind(this);
    }

    handleName(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    handleDob(event) {
        this.setState({
            dob: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        this.clearvalues()
        fetch('/api/users', requestOptions)
            .then(response => {
                if (response.ok) {
                    response.json()
                } else {
                    alert('Oops! Some error occured.')
                    return Promise.reject(response.status);
                }
            })
            .then(data => alert('Form submitted.'))
            .finally(this.clearvalues)
    }

    clearvalues() {
        console.log('Called clearvalues')
        this.setState({
            name: '',
            email: '',
            dob: ''
        });
        console.log(this.state)
    }

    render() {

        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="FEBA" showMenuIconButton={false} />
                        <form onSubmit={this.handleSubmit}>
                            <TextField id="name" type="name" floatingLabelText="Name" hintText="Enter your Name"
                                value={this.state.name}
                                onChange={this.handleName} /><br />
                            <TextField id="email" type="email" hintText="Enter your Email" floatingLabelText="Email"
                                value={this.state.email}
                                onChange={this.handleEmail} /><br />
                            <TextField id="dob" type="date"
                                value={this.state.dob}
                                onChange={this.handleDob} /><br />
                            <RaisedButton type="submit" label="Submit" primary={true} />
                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default Login;