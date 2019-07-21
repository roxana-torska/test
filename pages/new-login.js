import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CustomInput from "../components/customInput/CustomInput";
import Button from "@material-ui/core/Button";
import AppLayout from "../components/layouts/AppLayout";
import { Typography } from "@material-ui/core";
import styles from "../styles/common";
import classnames from "classnames";
import validator from "../utils/validator";
import { userAPI } from "../services/userAPI";
import notify from "../utils/notifier";
import { APP_URL } from "../utils/config";
import SocialLinks from "../components/common/SocialLinks";
import WindowResizeListener from "react-window-size-listener";

class Login extends PureComponent {
  validators = {
    email: {
      required: { message: "Please use your email" },
      email: true
    },
    password: {
      required: { message: "Password required" }
    }
  };
  state = {
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    emailErrorMessage: "",
    passwordErrorMessage: "",
    winHeight: "100vh"
  };

  static getInitialProps({ store, isServer, query }) {
    let redirectUrl = query && query.redirect ? query.redirect : "";
    return { isServer, redirectUrl };
  }

  handleFieldChange = (name, value, notSetValue) => {
    notSetValue = notSetValue || false;
    const fieldError = validator(value, this.validators[name]);
    let state = null;
    if (fieldError.error === true) {
      state = {};
      state[`${name}Error`] = true;
      state[`${name}ErrorMessage`] = fieldError.errorMessage;
    } else if (notSetValue === false) {
      state = {};
      state[`${name}Error`] = false;
      state[`${name}ErrorMessage`] = "";
      state[name] = value;
    }
    if (state) {
      this.setState(state);
    }
    return fieldError.error;
  };

  validateForm = () => {
    const result = Object.keys(this.validators).map(field => {
      return this.handleFieldChange(field, this.state[field], true);
    });
    return !result.includes(true);
  };

  handleSubmit = evt => {
    const { redirectUrl } = this.props;
    evt.preventDefault();
    if (this.validateForm()) {
      const { email, password } = this.state;
      userAPI
        .login({
          params: {
            email,
            password
          }
        })
        .then(response => {
          if (response.status.toUpperCase() === "OK") {
            let url = `/auth/callback?token=${
              response.data.token
            }&redirect=${escape(redirectUrl)}`;
            window.location.href = url;
          } else {
            notify(response.error);
          }
        });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      emailError,
      passwordError,
      emailErrorMessage,
      passwordErrorMessage,
      winHeight
    } = this.state;
    let rootHeight = winHeight - 100;
    return (
      <AppLayout {...this.props}>
        <WindowResizeListener
          onResize={windowSize => {
            this.setState({ winHeight: windowSize.windowHeight });
          }}
        />
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            spacing={0}
            style={{
              margin: "0px 16px",
              height: `${rootHeight}px`
            }}
          >
            <Grid item>{"  "}</Grid>
            <Grid item>
              <Typography
                variant="h1"
                align="center"
                className={classes.pageTitleRed}
              >
                LOGIN
              </Typography>
            </Grid>
            <Grid item style={{ width: "100%" }}>
              <div style={{ margin: "0 26px" }}>
                <CustomInput
                  id="email"
                  label="Email"
                  error={emailError}
                  helperText={<span>{emailErrorMessage}</span>}
                  onChange={event =>
                    this.handleFieldChange("email", event.target.value)
                  }
                  fullWidth
                />
                <CustomInput
                  id="password"
                  label="Password"
                  type="password"
                  error={passwordError}
                  helperText={<span>{passwordErrorMessage}</span>}
                  fullWidth
                  onChange={event =>
                    this.handleFieldChange("password", event.target.value)
                  }
                />
              </div>
            </Grid>
            <Grid item style={{ width: "100%" }}>
              <div style={{ margin: "0 40px" }}>
                <Button
                  size="medium"
                  className={classes.btnRaisedLightNormalRed}
                  fullWidth
                  onClick={this.handleSubmit}
                >
                  Log In
                </Button>
              </div>
            </Grid>
            <Grid item style={{ textAlign: "center" }}>
              <Typography>&#160;</Typography>
              <div className={classes.footerLatoTextNormal}>
                New User?{" "}
                <a
                  href={`/sign-up`}
                  className={classnames(
                    classes.footerLatoTextBold,
                    classes.footerLink1
                  )}
                >
                  Sign Up
                </a>{" "}
                to the app
              </div>
              <Typography>&#160;</Typography>
              <div className={classes.footerLatoTextNormal}>
                Or Connect with
              </div>
              <Typography>&#160;</Typography>
              <SocialLinks />
            </Grid>
            <Grid item>
              <div className={classes.footerLatoTextNormal}>
                Forgot Password?{" "}
                <a
                  href={`/recover-password`}
                  className={classnames(
                    classes.footerLatoTextBold,
                    classes.footerLink1
                  )}
                >
                  Recover Password
                </a>
              </div>
            </Grid>
          </Grid>
        </form>
      </AppLayout>
    );
  }
}

export default withStyles(styles)(Login);
