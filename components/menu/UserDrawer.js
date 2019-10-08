import React, { Component } from 'react';
import { withStyles, InputAdornment } from '@material-ui/core';
import { Grid, CardMedia, CardContent } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import styles from '../../styles/common';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Create from '@material-ui/icons/Create';
import { APP_URL, API_IMAGE_URL } from '../../utils/config';
import { connect } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import validator from '../../utils/validator';
import { userAPI } from '../../services/userAPI';
import { globalAPI } from '../../services/globalAPI';
import notify from '../../utils/notifier';
import CustomInput from '../customInput/CustomInput';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import SocialLinks from '../../components/common/SocialLinks';
import actions from '../../redux/global/actions';
import request from '../../utils/request';
import EditIcon from '@material-ui/icons/Edit';
import CaptureImage from '../common/CaptureImage';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const { updateUserAndToken } = actions;

function Transition(props) {
  return <Slide direction='down' {...props} />;
}
let localStream = null;
let width = 320; // We will scale the photo width to this
let height = 0; // This will be computed based on the input stream
let canvas = null;
class UserDrawer extends Component {
  validators = {
    email: {
      required: { message: 'Please use your email' },
      email: true
    },
    password: {
      required: { message: 'Password required' },
      minLength: { length: 8 }
    },
    userName: {
      required: { message: 'User name is required' },
      validLength: { length: 50 },
      maxLength: {
        length: 50,
        message: 'User name should be 50 characters long'
      }
    }
  };
  state = {
    type: '',
    userName: '',
    email: '',
    connectedWithFacebook: '',
    password: '',
    userNameError: false,
    emailError: false,
    passwordError: false,
    userNameErrorMessage: '',
    emailErrorMessage: '',
    passwordErrorMessage: '',
    winHeight: '100vh',
    openDialog: false,
    selectedFileImage: null,
    openCaptureImageDialog: false,
    file: null,
    disabledUpload: true,
    dropzoneKey: 0,
    overlay: false,
    noCamera: false
  };

  componentDidMount() {
    const {
      global: { user }
    } = this.props;
    let userState = { userName: '', email: '' };
    if (user) {
      userState = { userName: user.userName, email: user.email };
    }
    this.setState(userState);
    console.log("inside the user drawer");
  }
  handleFieldEdit = value => {
    this.setState({
      type: value
    });
  };

  handleFieldChange = (name, value, notSetValue) => {
    notSetValue = notSetValue || false;
    const fieldError = validator(value, this.validators[name]);
    let state = null;
    if (notSetValue === false) {
      state = {};
      state[`${name}Error`] = false;
      state[`${name}ErrorMessage`] = '';
      if (fieldError.helper) {
        state[`${name}Error`] = true;
        state[`${name}ErrorMessage`] = fieldError.helperMessage;
      }
      state[name] = value;
    }
    if (fieldError.error === true) {
      state = state || {};
      state[`${name}Error`] = true;
      state[`${name}ErrorMessage`] = fieldError.errorMessage;
    }

    if (state) {
      this.setState(state);
    }
    return fieldError.error;
  };

  handleSubmit = (evt, name, value) => {
    const fieldError = validator(value, this.validators[name]);
    const {
      global: { user, token },
      updateUserAndToken
    } = this.props;
    evt.preventDefault();
    let state = null;
    if (fieldError.error === true) {
      state = {};
      state[`${name}Error`] = true;
      state[`${name}ErrorMessage`] = fieldError.errorMessage;
      this.setState(state);
    } else {
      let params = {
        fieldName: name,
        fieldValue: value,
        token
      };
      userAPI
        .updateUser({ params })
        .then(response => {
          if (response.status.toLowerCase() === 'ok') {
            notify(response.msg);
            request(
              `/user-update/callback?token=${response.data.token}`
            )
              .then(response => {
                if (response.user) {
                  updateUserAndToken({
                    user: response.user,
                    token: response.token
                  });
                  this.setState({
                    type: '',
                    connectedWithFacebook: '',
                    userNameError: false,
                    emailError: false,
                    passwordError: false,
                    userNameErrorMessage: '',
                    emailErrorMessage: '',
                    passwordErrorMessage: ''
                  });
                  if (name === 'email' || name === 'password') {
                    setTimeout(() => {
                      window.location.href = `/sign-out`;
                    }, 3000);
                  }
                }
              })
              .catch(err => {
                notify(err);
                setTimeout(() => {
                  window.location.href = `/sign-out`;
                }, 3000);
              });
          } else {
            notify(response.msg);
          }
        })
        .catch(err => {
          notify(err);
        });
    }
  };

  handleClear = () => {
    const {
      global: { user }
    } = this.props;
    this.setState({
      type: '',
      userNameError: false,
      emailError: false,
      passwordError: false,
      userNameErrorMessage: '',
      emailErrorMessage: '',
      passwordErrorMessage: '',
      userName: user.userName,
      email: user.email
    });
  };

  handleSocialDialog = () => {
    this.setState({ openDialog: true });
  };

  handleSocialDialogClose = () => {
    this.setState({ openDialog: false });
  };

  handleFileOnChange = evt => {
    evt.preventDefault();
    this.setState({ selectedFileImage: evt.target.files[0] });
  };

  handleFormSubmit = evt => {
    evt.preventDefault();
    const {
      global: { token }
    } = this.props;
    const { selectedFileImage } = this.state;
    this.handleChangeOverlay(true);
    userAPI
      .uploadProfileImage(token, { selectedFileImage })
      .then(response => {
        if (response.status.toLowerCase() === 'ok') {
          notify(response.msg);
          request(
            `/user-update/callback?token=${response.data.token}`
          )
            .then(response => {
              if (response.user) {
                updateUserAndToken({
                  user: response.user,
                  token: response.token
                });
              }
              this.handleChangeOverlay(false);
            })
            .catch(err => {
              notify(err);
              this.handleChangeOverlay(false);
            });
        } else {
          notify(response.msg);
          console.log(response);
          this.handleChangeOverlay(false);
        }
      })
      .catch(err => {
        notify(err);
        this.handleChangeOverlay(false);
      });
  };

  handleDialogClose = evt => {
    if (localStream) {
      let stream = localStream;
      let tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
      localStream = null;
    }
    const { dropzoneKey } = this.state;
    this.setState({
      openCaptureImageDialog: false,
      disabledUpload: true,
      dropzoneKey: dropzoneKey + 1
    });
  };

  handleOpenCaptureImage = evt => {
    evt.preventDefault();
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        localStream = stream;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        this.setState({ noCamera: true });
      });
    this.setState({ openCaptureImageDialog: true });
  };

  handleDropzoneChange = file => {
    if (file && file[0]) {
      let FR = new FileReader();
      FR.onload = this.handleUserUploadImage;
      FR.readAsDataURL(file[0]);
    }
  };

  handleFileSubmit = evt => {
    const {
      global: { token, user },
      updateUserAndToken
    } = this.props;
    const { file } = this.state;
    this.setState({ overlay: true });
    let params = {
      type: 'User',
      imageData: file,
      imageName: `${user.user_id}${this.genImageName(4)}`,
      imagePath: `/public/assets/images/users/${user.user_id}`
    };
    globalAPI.saveImage(token, { params }).then(response => {
      if (response.status.toLowerCase() === 'ok' && response.data) {
        notify(response.msg);
        request(`/user-update/callback?token=${response.data.token}`)
          .then(response => {
            if (response.user) {
              updateUserAndToken({
                user: response.user,
                token: response.token
              });
              this.setState({ overlay: false });
              this.handleDialogClose();
            }
          })
          .catch(err => {
            this.handleChangeOverlay(false);
            this.handleDialogClose();
            notify(err);
          });
      } else {
        notify(response.msg);
        this.handleChangeOverlay(false);
        this.handleDialogClose();
      }
    });
  };

  handleUserUploadImage = e => {
    let imageArr = e.target.result.split(',');
    this.setState({ file: imageArr[1], disabledUpload: false });
  };

  genImageName = length => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  handleChangeOverlay = value => {
    this.setState({ overlay: value });
  };

  render() {

    const {
      openDrawer,
      classes,
      closeDrawer,
      global: { user }
    } = this.props;

    console.log("global user======>", this.props.global);
    const {
      type,
      email,
      userName,
      password,
      userNameError,
      userNameErrorMessage,
      passwordError,
      passwordErrorMessage,
      emailError,
      emailErrorMessage,
      winHeight,
      openDialog,
      openCaptureImageDialog,
      captureImage,
      disabledUpload,
      dropzoneKey,
      overlay,
      noCamera
    } = this.state;
    let avatar = '/static/imgs/image-not-found-dark.png';
    
    if (user && user.userAvatar) {
      let checkSocialImage = user.userAvatar ? user.userAvatar.split(':') : [];
      if (checkSocialImage[0] !== 'https') {
        avatar = `${API_IMAGE_URL}/assets/images/users/${user.user_id}/${
          user.userAvatar
          }`;
      } else {
        avatar = user.userAvatar;
      }
    }

    return user ? (
      <React.Fragment>
        <Drawer
          className={classes.drawer}
          open={openDrawer}
          variant='persistent'
          anchor='right'
          classes={{
            paper: classes.drawerPaper,
            root: classes.userDrawerRoot
          }}
          PaperProps={{
            classes: {
              root: classes.drawerPaperRoot
            }
          }}
        >
          <Card className={classes.card}>
            <CardHeader
              className={classes.userDrawerCardHeader}
              action={
                <Grid>
                  <IconButton
                    color='inherit'
                    aria-label='User Drawer'
                    onClick={closeDrawer}
                  >
                    <ArrowBack
                      color='primary'
                      className={classes.userDrawerCloseButton}
                    />
                  </IconButton>
                </Grid>
              }
            />

            <CardContent className={classes.userDrawerContentRoot}>
              <CardMedia
                alt='background image'
                className={classes.userDrawerCardMedia}
                style={{ height: '100px' }}
                image='/static/imgs/card.png'
                title='Paella dish'
              />
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
                spacing={0}
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '22px'
                }}
              >
                <Grid item xs={3} />
                <Grid item xs={6} style={{ textAlign: 'center' }}>
                  <img
                    src={avatar || '/static/imgs/image-not-found-dark.png'}
                    alt='avatar'
                    className={classes.userDrawerUserImage}
                  />
                  <div className={classes.editUSerImage}>
                    <IconButton
                      color='inherit'
                      aria-label='User Drawer'
                      onClick={evt => this.handleOpenCaptureImage(evt)}
                    >
                      <EditIcon className={classes.colorPrimary} />
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={3} />
              </Grid>
              <Grid container direction='row'>
                <Grid item xs={3} />
                <Grid
                  item
                  xs={6}
                  style={{ marginTop: '70px', textAlign: 'center' }}
                >
                  {user.userName ? (
                    <h2 className={classes.userName}>
                      {user.userName.toUpperCase()}
                    </h2>
                  ) : null}

                  <h4 className={classes.userEmail}>{user.email}</h4>
                </Grid>
                <Grid item xs={3} />
              </Grid>
              <Grid item xs={12} style={{ margin: '0 16px' }}>
                <CustomInput
                  id='standard-name'
                  label='User name'
                  placeholder='User name'
                  value={userName || ''}
                  error={userNameError}
                  helperText={userNameErrorMessage}
                  onChange={evt =>
                    this.handleFieldChange('userName', evt.target.value)
                  }
                  margin='normal'
                  InputProps={{
                    readOnly: type != 'userName' ? true : false,
                    endAdornment: (
                      <InputAdornment position='end'>
                        {type != 'userName' ? (
                          <Create
                            className={classes.userDrawerCreateIcon}
                            onClick={evt => this.handleFieldEdit('userName')}
                          />
                        ) : (
                            <div>
                              <DoneIcon
                                onClick={evt =>
                                  this.handleSubmit(evt, 'userName', userName)
                                }
                              />
                              <ClearIcon onClick={this.handleClear} />
                            </div>
                          )}
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} style={{ margin: '0 16px' }}>
                <CustomInput
                  id='connectedWithFacebook'
                  label={`Connected with ${
                    user.signUpFrom === 'Self' ? 'Email' : user.signUpFrom
                    }`}
                  placeholder={`Connected with ${
                    user.signUpFrom === 'Self' ? 'Email' : user.signUpFrom
                    }`}
                  margin='normal'
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position='end'>
                        {
                          <Create
                            className={classes.userDrawerCreateIcon}
                            onClick={this.handleSocialDialog}
                          />
                        }
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{ margin: '0 16px' }}>
                <CustomInput
                  id='userEmail'
                  label='User e-mail'
                  placeholder='User e-mail'
                  value={email || ''}
                  type='email'
                  error={emailError}
                  helperText={emailErrorMessage}
                  onChange={evt =>
                    this.handleFieldChange('email', evt.target.value)
                  }
                  margin='normal'
                  InputProps={{
                    readOnly: type != 'email' ? true : false,
                    endAdornment: (
                      <InputAdornment position='end'>
                        {type != 'email' ? (
                          <Create
                            className={classes.userDrawerCreateIcon}
                            onClick={evt => this.handleFieldEdit('email')}
                          />
                        ) : (
                            <div>
                              <DoneIcon
                                onClick={evt =>
                                  this.handleSubmit(evt, 'email', email)
                                }
                              />
                              <ClearIcon onClick={this.handleClear} />
                            </div>
                          )}
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{ margin: '0 16px' }}>
                <CustomInput
                  id='password'
                  label='Password'
                  placeholder='Password'
                  defaultValue=''
                  onChange={evt =>
                    this.handleFieldChange('password', evt.target.value)
                  }
                  margin='normal'
                  type='password'
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  InputProps={{
                    readOnly: type != 'password' ? true : false,
                    endAdornment: (
                      <InputAdornment position='end'>
                        {type != 'password' ? (
                          <Create
                            className={classes.userDrawerCreateIcon}
                            onClick={evt => this.handleFieldEdit('password')}
                          />
                        ) : (
                            <div>
                              <DoneIcon
                                onClick={evt =>
                                  this.handleSubmit(evt, 'password', password)
                                }
                              />
                              <ClearIcon onClick={this.handleClear} />
                            </div>
                          )}
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </CardContent>
            <Dialog
              open={openDialog}
              keepMounted
              TransitionComponent={Transition}
            >
              <DialogTitle disableTypography>
                <Grid container direction='row'>
                  <Grid
                    item
                    xs={11}
                    className={classes.reviewDialogTitle}
                    style={{ textAlign: 'center' }}
                  >
                    {`Connected with ${
                      user.signUpFrom === 'Self' ? 'Email' : user.signUpFrom
                      }`}{' '}
                  </Grid>
                  <Grid item xs={1} style={{ textAlign: 'right' }}>
                    <ClearIcon onClick={this.handleSocialDialogClose} />
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent style={{ textAlign: 'center' }}>
                <SocialLinks />
              </DialogContent>
            </Dialog>
            <Dialog
              open={openCaptureImageDialog}
              keepMounted
              TransitionComponent={Transition}
            >
              <DialogTitle style={{ textAlign: 'right' }}>
                <Button onClick={evt => this.handleDialogClose(evt)}>
                  <ClearIcon
                    className={classes.dishDetailSecColor}
                    style={{ paddingBottom: '8px' }}
                  />
                </Button>
              </DialogTitle>
              <DialogContent>
                <Grid container direction='row'>
                  <Grid item xs={12}>
                    <CaptureImage
                      dishData={user}
                      type='User'
                      onCaptureImageSave={this.handleDialogClose}
                      onCaptureImage={this.handleChangeOverlay}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {noCamera ? <h3>No camera found</h3> : ''}
                  </Grid>
                  <Grid item xs={12}>
                    <DropzoneArea
                      onChange={file => this.handleDropzoneChange(file)}
                      acceptedFiles={['image/*']}
                      filesLimit={1}
                      key={dropzoneKey}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      onClick={evt => this.handleFileSubmit(evt)}
                      variant='contained'
                      color='default'
                      className={classes.button}
                      disabled={disabledUpload}
                    >
                      <CloudUploadIcon className={classes.rightIcon} />
                    </Button>
                  </Grid>
                  {overlay ? (
                    <div className={classes.overlay}>
                      <div className={classes.showLoading}>
                        <CircularProgress className={classes.progress} />
                      </div>
                    </div>
                  ) : null}
                </Grid>
              </DialogContent>
            </Dialog>
          </Card>
        </Drawer>
      </React.Fragment>
    ) : null;
  }
}
export default connect(
  state => ({
    global: state.global.toJSON()
  }),
  { updateUserAndToken }
)(withStyles(styles)(UserDrawer));
