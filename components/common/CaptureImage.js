import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/common';
import { Grid } from '@material-ui/core';
import notify from '../../utils/notifier';
import { connect } from 'react-redux';
import actions from '../../redux/global/actions';
import Button from '@material-ui/core/Button';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import { globalAPI } from '../../services/globalAPI';
import { API_IMAGE_URL, APP_URL } from '../../utils/config';
import request from '../../utils/request';
const { updateUserAndToken } = actions;

let width = 320; // We will scale the photo width to this
let height = 0; // This will be computed based on the input stream

let streaming = false;

let video = null;
let canvas = null;

class CaptureImage extends Component {
  state = {
    displayVideo: 'none'
  };
  componentDidMount() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    video.addEventListener(
      'canplay',
      ev => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
          this.setState({
            displayVideo: 'block'
          });
        }
      },
      false
    );
  }

  handleCaptureImage = evt => {
    evt.stopPropagation();
    const {
      global: { token, user },
      dishData,
      type,
      updateUserAndToken,
      onCaptureImageSave,
      onCaptureImage
    } = this.props;
    onCaptureImage(true);
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      var imageArr = data.split(',');
      let params = {};
      if (type === 'Review') {
        params = {
          dishId: dishData.id || dishData._id,
          slug: dishData.slug,
          type: type,
          imageName: `${dishData.slug}-${user.user_id}`,
          imageData: imageArr[1],
          imagePath: `/public/assets/images/reviews/${dishData.slug}/${
            user.user_id
          }`
        };
      }
      if (type === 'User') {
        params = {
          type: type,
          imageData: imageArr[1],
          imageName: `${user.user_id}${this.genImageName(4)}`,
          imagePath: `/public/assets/images/users/${user.user_id}`
        };
      }

      globalAPI.saveImage(token, { params }).then(response => {
        if (response.status.toLowerCase() === 'ok') {
          if (type === 'User') {
            notify(response.msg);
            request(
              `${APP_URL}/user-update/callback?token=${response.data.token}`
            )
              .then(response => {
                if (response.user) {
                  updateUserAndToken({
                    user: response.user,
                    token: response.token
                  });
                  onCaptureImageSave();
                  onCaptureImage(false);
                }
              })
              .catch(err => {
                notify(err);
                onCaptureImage(false);
              });
          }
        } else {
          notify(response.msg);
          onCaptureImage(false);
        }
      });
    } else {
      this.handleClearPhoto(evt);
    }
  };

  handleClearPhoto = evt => {
    evt.stopPropagation();

    var context = canvas.getContext('2d');
    context.fillStyle = '#AAA';
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    //photo.setAttribute('src', data);
  };

  genImageName = length => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  render() {
    const { classes } = this.props;
    const { displayVideo } = this.state;

    return (
      <Grid container direction='row'>
        <Grid item xs={12} style={{ display: displayVideo }}>
          <video id='video'>Video stream not available.</video>
          <Button onClick={evt => this.handleCaptureImage(evt)}>
            <AddAPhoto className={classes.colorPrimary} />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <canvas id='canvas' style={{ display: 'none' }} />
          {/* <div class='output'>
            <img id='photo' alt='The screen capture will appear in this box.' />
            >
          </div> */}
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  state => ({
    global: state.global.toJSON()
  }),
  { updateUserAndToken }
)(withStyles(styles)(CaptureImage));
