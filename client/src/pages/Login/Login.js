import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import API from "../../lib/API";
import AuthContext from "../../contexts/AuthContext";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./login.css";
class Login extends Component {
  static contextType = AuthContext;

  state = {
    redirectToReferrer: false,
    error: "",
  };

  handleSubmit = (email, password) => {
    API.Users.login(email, password)
      .then((response) => response.data)
      .then(({ user, token }) => {
        this.context.onLogin(user, token);
        this.setState({ redirectToReferrer: true, error: "" });
      })
      .catch((err) => {
        let message;

        switch (err.response.status) {
          case 401:
            message =
              "Sorry, that email/password combination is not valid. Please try again.";
            break;
          case 500:
            message = "Server error. Please try again later.";
            break;
          default:
            message = "Unknown error.";
        }

        this.setState({ error: message });
      });
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/member" },
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="container animate__animated animate__fadeIn animate__delay-1s">
        <div className="Login">
          <div className="row">
            <div className="col">
            <h1 className="font"> Login </h1>
            </div>
          </div>
          {this.state.error && (
            <div className="row">
              <div className="col">
                <div className="alert alert-danger mb-3" role="alert">
                  {" "}
                  {this.state.error}
                </div>
              </div>
            </div>
          )}
          <div className="row align-items-center">
            <div className="col">
              <div div className="mt-3">
                <LoginForm onSubmit={this.handleSubmit} />
                
                Don't have an account? <Link to="/register">Click here to register.</Link>
                </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Login;
