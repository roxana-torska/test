import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CustomInput from '../components/customInput/CustomInput';
import Button from '@material-ui/core/Button';
import AppLayout from '../components/layouts/AppLayout';
import { Typography } from '@material-ui/core';
import styles from '../styles/common';
import classnames from 'classnames';
import validator from '../utils/validator';
import { userAPI } from '../services/userAPI';
import notify from '../utils/notifier';
import { APP_URL } from '../utils/config';
import FooterActions from '../components/common/FooterActions';
import WindowResizeListener from 'react-window-size-listener';
import { DishinMashroomIcon } from '../components/customIcon/customIcon';
import { css, cx } from 'emotion'
import CustumCard from '../components/common/CustumCard';
class Thankyou extends PureComponent {


    static getInitialProps({ store, isServer, query }) {
        let redirectUrl = query && query.redirect ? query.redirect : '';
        return { isServer, redirectUrl };
    }

    state = {
        winHeight: '100vh',
        winWidth: '100vw'
    };
    render() {
        const { classes } = this.props;
        const {

            winHeight,
            winWidth
        } = this.state;
        let adjustHeightGridOne = 10;
        let adjustHeightGridThree = 8;
        let adjustHeightGridFive = 3;
        let adjustHeightGridSeven = 5;
        let adjustHeightGridNine = 2;
        let rootHeight = winHeight - 56;
        let minVisibleHeight = 361;
        if (winWidth <= 312) {
            minVisibleHeight = 312;
        }
        if (rootHeight < minVisibleHeight) {
            rootHeight = minVisibleHeight;
        } else {
            adjustHeightGridOne = ((rootHeight - minVisibleHeight) * 30) / 100;
            adjustHeightGridThree = ((rootHeight - minVisibleHeight) * 15) / 100;
            adjustHeightGridFive = ((rootHeight - minVisibleHeight) * 20) / 100;
            adjustHeightGridSeven = ((rootHeight - minVisibleHeight) * 25) / 100;
            adjustHeightGridNine = ((rootHeight - minVisibleHeight) * 10) / 100;
        }
        return (
            <AppLayout {...this.props}>
                <WindowResizeListener
                    onResize={windowSize => {
                        this.setState({ winHeight: windowSize.windowHeight });
                    }}
                />
                <Grid
                    container
                    direction='column'
                    justify='space-between'
                    alignItems='center'
                    spacing={0}
                    style={{
                        margin: '0px',
                        minHeight: `${rootHeight}px`
                    }}
                >
                    <Grid
                        item
                        style={{
                            // backgroundColor: '#999',
                            height: `${adjustHeightGridOne}px`,
                            width: '100%'
                        }}
                    />
                    <Grid item className={classes.adjustHeightSignTwo}>
                        <div
                            className={classes.dihsinBackground}
                            style={{ margin: '0 14px' }}
                        >
                            <DishinMashroomIcon className={classes.topBgIconRight} />
                        </div>
                        <div style={{ margin: '0 16px', textAlign: 'center' }}>
                            <Typography
                                variant='h1'
                                align='center'
                                className={classes.pageTitleRed}
                            >

                            </Typography>
                        </div>
                    </Grid>
                    <Grid
                        item
                        style={{
                            //  backgroundColor: '#f0f0f0',
                            height: `${adjustHeightGridThree}px`,
                            width: '100%'
                        }}
                    />
                    <Grid
                        item
                        style={{ width: '100%' }}
                        className={classes.adjustHeightSigninFour}
                    >
                        <div className={css`
                            display:flex;
                            justify-content:center;
                            align-item:center;
                        `}>
                            <CustumCard />
                        </div>
                    </Grid>
                    <Grid
                        item
                        style={{
                            //  backgroundColor: '#555',
                            height: `${adjustHeightGridFive}px`,
                            width: '100%'
                        }}
                    />
                    <Grid item className={classes.adjustHeightGridSix}>

                    </Grid>
                    <Grid
                        item
                        style={{
                            //backgroundColor: '#a4a4a4',
                            height: `${adjustHeightGridSeven}px`,
                            width: '100%'
                        }}
                    />
                    <Grid item className={classes.adjustHeightGridEight}>
                        <div className={classes.footerBgIconLeft} />
                        <div className={classes.footerBgIconRight} />
                    </Grid>
                    <Grid
                        item
                        style={{
                            // backgroundColor: '#e9e9e9',
                            height: `${adjustHeightGridNine}px`,
                            width: '100%'
                        }}
                    />
                </Grid>

            </AppLayout>
        );
    }
}

export default withStyles(styles)(Thankyou);
