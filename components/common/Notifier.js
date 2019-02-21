import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';

let openSnackbarFn;

class Notifier extends React.PureComponent {
  state = {
    open: false,
    message: ''
  };

  constructor(props) {
    super(props);
    openSnackbarFn = this.openSnackbar;
  }

  render() {
    const message = (
      <span
        id='snackbar-message-id'
        dangerouslySetInnerHTML={{ __html: this.state.message }}
      />
    );

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={message}
        autoHideDuration={5000}
        onClose={this.handleSnackbarClose}
        open={this.state.open}
        ContentProps={{
          'aria-describedby': 'snackbar-message-id'
        }}
      />
    );
  }

  handleSnackbarClose = () => {
    this.setState({
      open: false,
      message: ''
    });
  };

  openSnackbar = ({ message }) => {
    this.setState({ open: true, message });
  };
}

export function openSnackbar({ message }) {
  if (openSnackbarFn) {
    openSnackbarFn({ message });
  }
}

export default Notifier;
