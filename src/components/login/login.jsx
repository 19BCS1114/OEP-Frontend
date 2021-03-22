import React from "react";
import Cookies from "js-cookie";
import stylesCSS from "./styles.module.css";
import logo from "../resources/BiggerLogo2.png";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
    this.formChange = this.formChange.bind(this);
    this.loginButtonHandler = this.loginButtonHandler.bind(this);
  }

  formChange() {
    this.setState({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    });
  }

  async loginButtonHandler() {
    console.log(this.state.username);
    console.log(this.state.password);

    const response = await fetch(process.env.REACT_APP_API_URI + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    });

    const data = await response.json();

    // console.log(data);
    Cookies.set("jwt", data.jwt);
  }

  render() {
    return (
      <div className={stylesCSS.login}>
        <div className={stylesCSS.container}>
          <form action="">
            <img className={stylesCSS.logo} src={logo} alt="logo" />
            <h1>Examiner Login</h1>
            <div className={stylesCSS.txtfield}>
              <input
                type="text"
                name=""
                placeholder="Username"
                id="username"
                required
                onChange={this.formChange}
              />
            </div>
            <div className={stylesCSS.txtfield}>
              <input
                type="password"
                name=""
                placeholder="Password"
                id="password"
                required
                onChange={this.formChange}
              />
            </div>
            <button
              className={stylesCSS.button}
              onClick={this.loginButtonHandler}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
