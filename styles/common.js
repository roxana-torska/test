const rootFontSize = 14;
const getRemFontSizeByPx = function(px) {
  let remValue = px / rootFontSize;
  return remValue.toFixed(3) + 'rem';
};
const styles = theme => {
  return {
    root: {
      flexGrow: 1
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    pageTitleRed: {
      fontFamily: "'BebasNeue', 'sans-serif'",
      fontSize: getRemFontSizeByPx(30),
      color: theme.palette.primary.main,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      ['@media (max-width:320px)']: {
        fontSize: getRemFontSizeByPx(25)
      }
    },
    textInDish: {
      fontSize: '2em',
      color: theme.palette.primary.main
      // ['@media (max-width:320px)']: {
      //   fontSize: '1.4rem'
      // }
    },
    pageSpacing: {
      padding: '16px'
    },
    pageTitle: {
      fontFamily: "'BebasNeue', 'sans-serif'",
      fontSize: '1.5em',
      textAlign: 'center'
      // ['@media (max-width:320px)']: {
      //   fontSize: '1rem'
      // }
    },

    reviewDish: {
      fontFamily: ' sans-serif',
      fontSize: '0.7em',
      textAlign: 'center'
    },
    btnRaisedLightNormalRed: {
      backgroundColor: theme.palette.primary.main,
      fontFamily: '"Lato"',
      textTransform: 'capitalize',
      fontSize: getRemFontSizeByPx(12),
      color: '#FFFFFF',
      padding: '6px',
      boxShadow: '0 2px 2px 1px rgba(0, 0, 0, .2)',
      fontWeight: '900',
      borderRadius: '3px',
      letterSpacing: '0.5px',
      objectFit: 'contain',
      width: '100%',
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      },
      ['@media (max-width:320px)']: {
        fontSize: getRemFontSizeByPx(10)
      }
    },
    inputFieldGrey: {
      color: '#757575',
      fontFamily: "'Lato'",
      fontSize: getRemFontSizeByPx(15),
      ['@media (max-width:320px)']: {
        fontSize: getRemFontSizeByPx(12)
      },
      lineHeight: 1,
      '& input': {
        color: '#757575'
      }
    },
    inputWhiteField: {
      color: '#fff',
      fontFamily: "'Lato'",
      fontSize: '1em'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    fontInherit: {
      font: 'inherit'
    },
    inputUnderline: {
      font: 'inherit',
      // ['@media (max-width:320px)']: {
      //   marginTop: '13px'
      // },
      '&:hover:not($disabled):before,&:before': {
        borderColor: '#aeaeae !important',
        borderWidth: '1px !important'
      },
      '&:after': {
        borderBottomColor: '#aeaeae',
        borderBottomWidth: '1px'
      }
    },
    cssFocused: {},
    inputLabel: {
      '&$cssFocused': {
        color: '#757575'
      }
    },
    footerLatoTextNormal: {
      color: '#717171',
      fontSize: getRemFontSizeByPx(13),
      fontFamily: "'Lato'",
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1,
      ['@media (max-width:320px)']: {
        fontSize: getRemFontSizeByPx(11)
      }
    },
    footerLatoTextBold: {
      fontWeight: '600'
    },
    btnContainer: {
      margin: '89px 40px 50px'
    },
    footerLink1: {
      color: theme.palette.primary.main,
      textDecoration: 'none'
    },
    footerBgIconContainer: {
      position: 'relative',
      fontSize: '0px',
      lineHeight: '0px',
      height: '0px'
    },
    footerBgIconLeft: {
      position: 'absolute',
      left: '0px',
      top: '41px',
      backgroundImage: 'url(/static/imgs/frame-left.png)',
      backgroundPosition: 'right',
      backgroundRepeat: 'no-repeat',
      zIndex: -1,
      width: '35px',
      height: '89px'
      // ['@media (max-width:320px)']: {
      //   top: '-140px'
      // }
    },
    footerBgIconRight: {
      position: 'absolute',
      right: '0px',
      top: '0px',
      backgroundImage: 'url(/static/imgs/frame-right.png)',
      backgroundPosition: 'left',
      backgroundRepeat: 'no-repeat',
      zIndex: -1,
      width: '55px',
      height: '85px'
      // ['@media (max-width:320px)']: {
      //   top: '-176px'
      // }
    },
    socialIcon: {
      width: '40px',
      height: '40px',
      ['@media (max-width:320px)']: {
        width: '35px',
        height: '35px'
      }
    },
    topBarLogoContainer: {
      textAlign: 'center',
      width: '100%'
    },
    topBgIconContainer: {
      position: 'relative',
      height: '56px',
      [theme.breakpoints.up('sm')]: {
        height: '64px'
      }
    },
    topBgIconRight: {
      position: 'absolute',
      width: '110px',
      height: '110px',
      top: '-22px',
      right: '0px',
      zIndex: -1,
      // [theme.breakpoints.up('sm')]: {
      //   width: '129px',
      //   height: '129px',
      //   top: '75px'
      // },
      ['@media (max-width:320px)']: {
        height: '80px',
        right: '0px'
      }
    },
    headerMarginSuppress: {
      marginTop: '78px'
    },
    recoverPasswordDialog: {
      padding: '20px',
      borderRadius: '0px'
    },
    recoverPasswordDialogTitle: {
      color: theme.palette.primary.main,
      fontFamily: "'Lato'",
      fontSize: '1.5em',
      fontWeight: '600'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.9rem'
      // }
    },
    recoverPasswordText: {
      fontFamily: "'Lato'",
      fontSize: '1em'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    modalFooter: {
      padding: '15px',
      textAlign: 'right',
      paddingTop: '0',
      margin: '0'
    },
    inputHelperText: {
      textAlign: 'right'
      // ['@media (max-width:320px)']: {
      //   marginTop: '0px'
      // }
    },
    iconRoot: {
      color: theme.palette.primary.main
    },
    listRoot: {
      width: '100%'
    },
    listRootItem: {
      '&:hover': {
        backgroundColor: '#f5f5f5'
      },
      fontFamily: "'Lato'",
      fontSize: '1em'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    listItemTextPrimary: {
      fontFamily: "'Lato'",
      fontSize: '1em'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    listScroll: {},
    pageInfo: {
      fontFamily: "'Lato'",
      fontSize: '2em',
      lineHeight: 3,
      color: '#999'
      // ['@media (max-width:320px)']: {
      //   fontSize: '1.7rem'
      // }
    },
    appBarShadowNone: {
      boxShadow: 'none'
    },
    searchFilterIcon: {
      width: '20px',
      height: '20px'
    },
    searchFilterIconColor: {
      color: '#fff'
    },
    drawerIcon: {
      textAlign: 'right'
    },
    drawerPaper: {
      width: '90%'
    },
    drawerPaperRoot: {
      boxShadow: 'none',
      borderRadius: '0px'
    },
    drawerCloseIcon: {
      color: '#000'
    },
    inputSearchField: {
      color: '#757575',
      fontFamily: "'Lato'",
      fontSize: '1.5em',
      margin: '0px'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.9rem'
      // }
    },
    drawerIconOpen: {
      padding: '0px',
      margin: '0px',
      textAlign: 'right'
    },
    filterDrawerHead: {
      backgroundColor: '#fff'
    },
    drawerClose: {
      fontSize: '1em'
    },
    drawerCloseButton: {
      padding: '3px'
    },
    restaurantsListItem: {
      borderColor: '#757575 !important',
      borderWidth: '1px !important',
      boxShadow: '0.1px 1px 1px .2px rgba(0, 0, 0, .4)',
      marginBottom: '20px',
      paddingLeft: '10px',
      paddingRight: '10px'
    },
    textColorPrimary: {
      color: '#444'
    },
    tabSelected: {
      color: '#999'
    },
    drawerOpenButton: {
      padding: '0px',
      borderRadius: '0px'
    },
    inputWhiteLabel: {
      color: '#fff',
      '&$cssFocused': {
        color: '#fff'
      }
    },
    inputWhiteUnderline: {
      '&:hover:not($disabled):before,&:before': {
        //borderColor: '#F9D7D6 !important',
        borderWidth: '0px !important'
      },
      '&:after': {
        // borderBottomColor: '#F9D7D6',
        borderBottomWidth: '0px'
      }
    },
    iconWhite: {
      color: '#FFF'
    },
    searchBarMargin: {
      margin: '16px 0px 0px 0px'
    },
    topSearchTabRoot: {
      minHeight: '48px',
      backgroundColor: '#eeeeee',
      color: theme.palette.primary.main,
      fontFamily: 'Roboto',
      fontSize: '1rem',
      textTransform: 'none !important'
    },
    topSearchTabsRoot: {
      minHeight: '48px'
    },
    btnIcon: {
      padding: '0px',
      margin: '0px'
    },
    restaurantSort: {
      marginBottom: '30px',
      paddingLeft: '24px',
      paddingRight: '24px',
      marginTop: '20px'
    },
    restaurantDistanceSort: {
      marginBottom: '30px;',
      borderColor: '#757575 !important',
      borderWidth: '1px !important',
      paddingLeft: '24px',
      paddingRight: '24px'
    },
    selectedDirection: {
      color: '#4a4a4a'
    },
    filterRestaurantCount: {
      textAlign: 'right'
    },
    listItemRectAvatar: {
      borderRadius: 0,
      marginTop: 0,
      width: '100px',
      height: '100px'
    },
    reviewListAvatar: {
      height: '40px',
      width: '40px'
    },
    listMultiItem: {
      width: '100%'
    },
    fabMenu: {
      position: 'fixed',
      '&$fabDirectionUp, &$fabDirectionLeft': {
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3
      },
      '&$fabDirectionDown, &$fabDirectionRight': {
        top: theme.spacing.unit * 2,
        left: theme.spacing.unit * 3
      }
    },
    fabDirectionUp: {},
    fabDirectionRight: {},
    fabDirectionDown: {},
    fabDirectionLeft: {},
    filterMenuIcon: {
      width: '20px',
      height: '20px'
    },
    filterIcon: {
      backgroundColor: '#fff'
    },
    filterClear: {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      color: '#a9a9a9'
    },
    filterContainerMargin: {
      marginTop: '56px',
      [theme.breakpoints.up('sm')]: {
        marginTop: '64px'
      }
    },
    filterTabsRoot: {
      width: '100%'
    },
    filterLabelFont: {
      fontSize: '1.2rem',
      fontWeight: 600
      // ['@media (max-width:320px)']: {
      //   fontSize: '.8rem'
      // }
    },
    filterTabRoot: {
      fontSize: '1.2rem',
      fontWeight: 600,
      minHeight: '56px',
      [theme.breakpoints.up('sm')]: {
        minHeight: '64px'
      }
      // ['@media (max-width:320px)']: {
      //   fontSize: '.8rem'
      // }
    },
    userDrawerCardHeader: {
      position: 'absolute',
      zIndex: '999',
      top: '1px',
      padding: '0px'
    },
    userDrawerCloseButton: {
      color: '#fff',
      textAlign: 'left'
    },
    userDrawerCardMedia: {
      height: '100%',
      backgroundColor: theme.palette.primary.main
    },
    userDrawerContentRoot: {
      padding: '0px'
    },
    userDrawerUserImage: {
      height: '150px',
      width: '150px',
      border: '3px solid #fff',
      borderRadius: '50%'
    },
    userDrawerTextField: {
      width: '100%'
    },
    userDrawerCreateIcon: {
      color: '#a9a9a9'
    },
    notFoundDesc: {
      fontFamily: "'Lato'",
      fontSize: '.9em',
      color: '#757575'
    },
    notFoundHeading: {
      fontFamily: "'Lato'",
      fontSize: '1.2em',
      color: theme.palette.primary.main,
      fontWeight: '600'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.8rem'
      // }
    },
    reviewsListImg: {
      height: '317px',
      width: '100%'
    },
    moodIcon: {
      color: 'red',
      marginRight: '10px'
    },
    userAvatar: {
      position: 'absolute',
      top: '22px'
    },
    userName: {
      color: '#4a4a4a',
      fontFamily: "'Lato'",
      fontSize: '1.2em',
      fontWeight: '600'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.8rem'
      // }
    },
    userEmail: {
      color: '#979797',
      fontFamily: "'Lato'",
      fontSize: '.7em'
    },
    listCardItem: {
      borderColor: '#757575 !important',
      boxShadow: '0.1px 1px 3px .2px rgba(0, 0, 0, .4)',
      height: '160px'
    },
    listCardImage: {
      height: '100%',
      width: '100%',
      padding: '10px',
      objectFit: 'cover'
    },
    listCardImageFullWidth: {
      height: '100%',
      width: '100%',
      padding: '10px',
      marginRight: '5px',
      objectFit: 'cover'
    },
    listCardTitle: {
      fontFamily: "'BebasNeue'",
      fontSize: '1.3em',
      marginBottom: '10px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.9rem'
      // }
    },
    listCardDescription: {
      fontFamily: "'Lato'",
      fontSize: '.8em',
      color: '#838383',
      height: '48px',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    reviewListIcon: {
      textAlign: 'right'
    },
    reviewFooterItem: {
      fontFamily: "'Lato'",
      fontSize: '.6em',
      color: '#838383',
      marginTop: '24px'
    },
    listItem: {
      '&:hover, &:focus, &:active, &:visited': {
        backgroundColor: '#fff'
      }
    },
    iconsInReviewsList: {
      textAlign: 'center'
    },
    dishDetailsTabs: {
      backgroundColor: 'gray',
      textAlign: 'center'
    },

    valueForMoney: {
      color: '#ffcdd2',
      height: '20px',
      backgroundColor: '#f1f0f1'
    },
    taste: {
      color: '#e57373',
      height: '20px',
      backgroundColor: '#f1f0f1'
    },
    lookAndFeel: {
      color: '#d32f2f',
      height: '20px',
      backgroundColor: '#f1f0f1'
    },
    reviewsListCard: {
      margin: '16px',
      padding: '16px'
    },
    marginNormal: {
      margin: '0px'
    },
    couponCardItemRight: {
      fontFamily: "'Lato'",
      fontSize: '.9em',
      textAlign: 'center',
      paddingTop: '36px'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },

    downloadCoupon: {
      color: theme.palette.primary.main,
      border: '1px solid',
      borderColor: theme.palette.primary.main
    },
    redeemContent: {
      fontFamily: "'Lato'",
      fontSize: '1em',
      textAlign: 'center'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    redeemEmailText: {
      fontSize: '1em',
      textAlign: 'left',
      color: '#878787'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    redeemEmail: {
      padding: '10px',
      backgroundColor: '#fafafa',
      fontSize: '.9em'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    addAnotherEmail: {
      fontSize: '1em',
      textAlign: 'center',
      color: '#878787'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    redeemFooter: {
      textAlign: 'center'
    },

    redeemUserEmail: {
      color: '#878787',
      fontSize: '.8em'
    },
    emailCheck: {
      textAlign: 'right'
    },
    reviewFooterItemIcon: {
      verticalAlign: 'middle',
      fontSize: '1.5em'
      // ['@media (max-width:320px)']: {
      //   fontSize: '1rem'
      // }
    },
    listCardFooterPrice: {
      fontFamily: "'BebasNeue'",
      fontSize: '1em',
      fontWeight: '600',
      color: '#000'
      // ['@media (max-width:320px)']: {
      //   fontSize: '1rem'
      // }
    },
    listCardRestaurant: {
      fontSize: '1.1em',
      textDecoration: 'underline',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverFlow: 'ellipsis'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.8rem'
      // }
    },
    listCardRating: {
      fontFamily: "'BebasNeue'",
      fontSize: '1.4em',
      color: theme.palette.primary.main
      // ['@media (max-width:320px)']: {
      //   fontSize: '1rem'
      // }
    },
    listCardActionButton: {
      // width: '40px',
      // height: '40px',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '0px'
      // ['@media (max-width:320px)']: {
      //   width: '30px',
      //   height: '30px'
      // }
    },
    overlay: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      right: '0px',
      bottom: '0px',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
      cursor: 'pointer'
    },
    filterClearLabel: {
      textDecoration: 'capitalize',
      padding: '0 25px'
    },
    dishDescription: {
      fontFamily: "'Lato'",
      fontSize: '1em',
      paddingTop: '10px',
      lineHeight: '24px'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    dishHeadings: {
      fontSize: '1.6em',
      fontFamily: "'BebasNeue', 'bold'"
      // ['@media (max-width:320px)']: {
      //   fontSize: '.9rem'
      // }
    },
    dishDetailIconSize: {
      color: '#838383',
      height: '24px',
      width: '24px',
      padding: '0px'
    },

    dishDetailTagHeading: {
      fontFamily: 'Lato Bold',
      fontSize: '1em',
      fontWeight: '600'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    contactMeButton: {
      textAlign: 'center'
    },
    autoCompleteContainer: {
      position: 'relative'
    },
    autoCompletePaper: {
      // position: 'absolute',
      // zIndex: 1,
      // left: 0,
      // right: 0,
      height: '144px',
      overflow: 'hidden',
      overflowY: 'scroll',
      ['@media (max-width:320px)']: {
        height: '84px'
      }
    },
    autoCompleteMenuItem: {
      fontSize: getRemFontSizeByPx(15), //'0.7rem',
      padding: '12px',
      lineHeight: 1.33,
      color: '#494949',
      ['@media (max-width:320px)']: {
        fontSize: getRemFontSizeByPx(12),
        padding: '2px'
      }
    },
    autoCompleteAvatar: {
      width: '24px',
      height: '24px'
    },
    labelCapitalTransform: {
      textTransform: 'capitalize',
      paddingLeft: '15px',
      paddingRight: '15px'
    },
    userDrawerRoot: {
      borderRadius: '0px',
      boxShadow: 'none'
    },
    floatingFilterSubmit: {
      position: 'fixed',
      zIndex: 999,
      bottom: '20px',
      width: '100%'
    },
    restaurantMenu: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    restaurantMenuItem: {
      minWidth: 120,
      maxWidth: 300
    },
    restaurantMenuLabel: {
      '&:focus': {
        color: '#fff'
      },
      color: '#fff'
    },

    couponCardItem: {
      borderColor: '#757575 !important',
      boxShadow: '0.1px 1px 3px .2px rgba(0, 0, 0, .4)',
      height: '116px',
      borderRadius: '3px'
      // ['@media (max-width:320px)']: {
      //   height: '100px'
      // }
    },
    couponCardItemLeft: {
      textAlign: 'center',
      height: '100%',
      width: '100%',
      borderRight: '1px dotted #c3c2c1',
      paddingTop: '25px',
      backgroundImage: 'url(/static/imgs/back.png)',
      backgroundPosition: 'left',
      backgroundRepeat: 'repeat'
    },
    couponCardItemDecNo: {
      fontFamily: "'Montserrat'",
      fontSize: '1.9rem',
      color: theme.palette.primary.main,
      textAlign: 'center',
      fontWeight: 600
      // ['@media (max-width:320px)']: {
      //   fontSize: '1.2rem'
      // }
    },
    couponCardItemDec: {
      fontFamily: "'Lato'",
      fontSize: '.7em',
      color: '#757575'
    },

    activeCoupon: {
      color: theme.palette.primary.main
    },
    inactiveCoupon: {
      color: '#c3c2c1'
    },
    roundBorderTop: {
      borderBottom: '1px solid #eee',
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#fff',
      boxShadow: ' 0px -1px 0px rgba(0, 0, 0, 0.2) inset'
    },
    roundBorderBottom: {
      borderTop: '1px solid #eee',
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      bottom: '-8px',
      right: '-8px',
      backgroundColor: '#fff',
      boxShadow: ' 0px 1px 0px rgba(0, 0, 0, 0.2) inset'
    },
    rewardHeading: {
      fontFamily: "'Lato'",
      fontSize: '1em',
      fontWeight: '600',
      textAlign: 'center',
      color: '#878787',
      marginBottom: '10px'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.8rem'
      // }
    },
    rewardProgress: {
      height: '0.5em',
      borderRadius: '13px',
      backgroundColor: '#f1f0f1'
    },
    pointToGainText: {
      fontFamily: "'Lato'",
      fontSize: '1em'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    pointToGain: {},
    rewardCount: {
      top: '50%',
      left: '-32px',
      width: '20px',
      backgroundColor: '#fff',
      color: theme.palette.primary.main
    },
    redeemHead: {
      textAlign: 'center',
      fontFamily: "'Lato'",
      fontSize: '1em'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    redeemHeading: {
      color: theme.palette.primary.main,
      fontFamily: "'BebasNeue'",
      fontSize: '1.9em'
      // ['@media (max-width:320px)']: {
      //   fontSize: '1rem'
      // }
    },
    redeemDesc: {
      fontSize: '1em',
      color: '#878787'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    redeemUserName: {
      fontSize: '.9em'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    redeemVerticalSpacer: {
      // ['@media (max-width:320px)']: {
      //   display: 'none'
      // }
    },
    restaurantMenuSelect: {
      color: '#fff',
      fontSize: '1rem'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
      // ['@media (max-width:768px)']: {
      //   fontSize: '.8rem'
      // }
    },
    restaurantMenuOutlined: {
      color: theme.palette.primary.main
    },
    dishDescTags: {
      '& li': {
        display: 'inline-block'
      },
      padding: '0px'
    },
    colorPrimary: {
      color: theme.palette.primary.main
    },
    dishDescLi: {
      fontSize: '15px'
    },
    dishDetailSecColor: {
      color: '#979797'
    },
    roomServiceTitle: {
      color: '#626262',
      padding: '5px'
    },
    distDetailFooter: {
      marginTop: '10px',
      marginBottom: '10px'
    },
    futureTime: {
      color: '#626262',
      fontSize: '1em',
      fontFamily: 'Lato',
      marginTop: '10px',
      fontWeight: '600',
      textDecoration: 'underline'
    },
    reviewRating: {
      fontFamily: "'BebasNeue'",
      fontSize: getRemFontSizeByPx(21),
      color: '#fff',
      width: '100%'
      // ['@media (max-width:320px)']: {
      //   fontSize: '1rem',
      //   width: '30px'
      // }
    },
    makeAReview: {
      color: theme.palette.primary.main,
      fontSize: getRemFontSizeByPx(14),
      fontFamily: 'Lato',
      textDecoration: 'underline',
      lineHeight: '17px'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    roomServiceIcon: {
      height: '20px',
      width: '28px'
    },
    dishDescriptionReview: {
      fontSize: '0.5em',
      fontFamily: 'Lato',
      textDecoration: 'underline',
      padding: '0px'
    },
    dishDetailTagValue: {
      fontFamily: 'Lato',
      fontSize: '1em'

      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    tagIconSize: {
      fontSize: '15px',

      '& svg': {
        fontSize: '15px',
        verticalAlign: 'middle'
      }
    },
    allReviews: {
      fontFamily: "'Roboto', 'medium'",
      fontSize: '1em',
      color: 'red'
    },
    reserverTable: {
      fontFamily: "'BebasNeue'",
      fontSize: '1.6em'
    },
    subscriptRating: {
      color: '#acacac',
      verticalAlign: 'sub',
      fontFamily: 'Montserrat',
      fontSize: '18px'
    },
    slashRating: {
      color: '#c4c4c4',

      fontFamily: 'Montserrat',
      fontSize: '18px'
    },
    superscriptRating: {
      color: '#acacac',
      fontFamily: 'Montserrat',
      fontSize: '18px'
    },
    cardRatingAction: {
      marginTop: '0px',
      marginRight: '0px'
    },
    reviewDialogTitle: {
      color: theme.palette.primary.main,
      fontFamily: 'Roboto',
      fontSize: '1.3em'
    },
    reviewDialogCheck: {
      color: '#979797',
      fontSize: '1.5em'
    },
    reviewDialogDisc: {
      fontFamily: 'Roboto',
      fontSize: '1em',
      color: '#979797'
    },
    reviewDialogFooterButton: {
      fontFamily: 'Roboto',
      fontSize: '.9em',
      color: '#979797'
    },
    makeAReviewPopoverPaper: {
      boxShadow: 'none'
    },
    restaurantDetailName: {
      fontFamily: "'BebasNeue'",
      fontSize: '1.5em',
      fontWeight: '600',
      paddingLeft: '20px'
    },
    restaurantAddressBar: {
      fontSize: '.9em',
      color: '#979797',
      fontFamily: 'Lato',
      marginLeft: '20px',
      borderBottom: '1px solid #979797',
      marginBottom: '20px',
      marginRight: '20px',
      paddingBottom: '10px'
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    restaurantAddressBarIcon: {
      verticalAlign: 'middle'
    },
    restaurantAddress: {
      // marginLeft: '15px'
    },
    latestReviewRating: {
      fontFamily: 'Montserrat',
      fontSize: '1.1em',
      textAlign: 'right',
      color: theme.palette.primary.main
    },
    reserveTableDialog: {
      backgroundColor: '#fafafa',
      fontSize: '1em',
      fontFamily: 'lato',
      fontWeight: '600',
      color: '#979797',
      marginTop: '20px'
    },

    ratingValueFont: {
      fontFamily: 'Montserrat',
      fontSize: '14px',
      borderBottom: '3px solid',
      borderBottomColor: '#7d8287',
      width: '28px',
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: '5px'
    },

    simpleListItem: {
      borderBottom: '1px solid #979797'
    },
    listCardActionButtonRoot: {
      minWidth: '0px',
      color: '#fff',
      boxShadow: 'none',
      padding: '0px'
    },
    sliderImg: {
      width: '100%',
      height: '400px',
      ['@media (max-width:720px)']: {
        height: '240px'
      }
    },
    ReservetableHeading: {
      color: 'gray',
      fontFamily: "'BebasNeue'"
    },
    mobileStepper: {
      flexGrow: 1,
      color: 'white',
      position: 'absolute',
      bottom: '0px',
      backgroundColor: 'transparent',
      width: '100%'
    },
    latestReviewAvatar: {
      width: '28px',
      height: '28px',
      marginBottom: '5px'
    },
    restaurantDetailDesc: {
      fontFamily: 'Lato',
      fontSize: '.9em',
      color: '#979797'
    },
    listCardRestaurantName: {
      fontFamily: 'Lato',
      fontSize: '.6em'
    },
    listCardDishRating: {
      fontFamily: "'BebasNeue'",
      fontSize: '.8em',
      color: theme.palette.primary.main
    },
    listCardActionButtonMin: {
      boxShadow: 'none'
    },
    dishCardYouRate: {
      fontFamily: 'Lato',
      fontSize: getRemFontSizeByPx(12)
    },
    restaurantReviews: {
      color: theme.palette.primary.main,
      fontSize: '.8em'
    },
    lookAndFeelPrimary: {
      backgroundColor: '#d32f2f'
    },
    valueForMoneyPrimary: {
      backgroundColor: '#ffcdd2'
    },
    tastePrimary: {
      backgroundColor: '#e57373'
    },
    nameEllipsis: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    fabIconInChip: {
      height: '40px',
      width: '40px'
    },
    advanceReviewAppbar: {
      height: '20px',
      boxShadow: 'none',
      backgroundColor: 'lightGray',
      color: '#979797'
    },
    mobileStepperDots: {
      width: '100%',
      justifyContent: 'center'
    },
    mainNavbar: {
      // transition: 'height 0.5s ease-in-out 1s',
      // height: '37px',
      overflow: 'hidden'
    },
    // hideMainNavbar: {
    //   height: '0px'
    // },
    selectRemoveUnderline: {
      '&:hover:not($disabled):before,&:before': {
        borderWidth: '0px !important'
      },
      '&:after': {
        borderBottomWidth: '0px'
      }
    },
    commentsTextField: {
      height: '50px',
      width: '90%'
    },
    advanceRating: {
      backgroundColor: '#eeeeee'
    },
    advanceRatingAva: {
      width: '25px',
      height: '25px'
    },
    editUSerImage: {
      position: 'absolute',
      right: '0',
      zIndex: 999,
      bottom: '0',
      left: '70px'
    },
    restaurantMenuSelected: {
      width: '100px'
    },
    showLoading: {
      position: 'absolute',
      bottom: '50%',
      left: '50%'
    },
    locationAddress: {
      fontSize: `${getRemFontSizeByPx(14)} !important`,
      ['@media (max-width:320px)']: {
        fontSize: `${getRemFontSizeByPx(11)} !important`
      }
    },
    footerActionsCT: {
      position: 'relative'
    },
    adjustHeightGridTwo: {
      height: '60px',
      width: '100vw',
      ['@media (max-width:320px)']: {
        height: '43px'
      }
    },
    adjustHeightGridFour: {
      height: '177px',
      width: '100vw',
      ['@media (max-width:320px)']: {
        height: '116px'
      }
    },
    adjustHeightGridSix: {
      height: '36px',
      width: '100vw',
      textAlign: 'center',
      ['@media (max-width:320px)']: {
        height: '31px'
      }
    },
    adjustHeightGridEight: {
      height: '145px',
      width: '100vw',
      textAlign: 'center',
      ['@media (max-width:320px)']: {
        height: '130px'
      }
    },
    autoCompleteListCT: {
      height: '144px',
      ['@media (max-width:320px)']: {
        height: '88px'
      }
    },
    adjustHeightGridFourNoGeo: {
      height: '35px',
      width: '100vw',
      ['@media (max-width:320px)']: {
        height: '20px'
      }
    },
    dihsinBackground: {
      position: 'relative'
    },
    adjustHeightSignTwo: {
      height: '36px',
      width: '100%',
      ['@media (max-width:320px)']: {
        height: '26px'
      }
    },
    adjustHeightSignFour: {
      height: '198px',
      width: '100%',
      ['@media (max-width:320px)']: {
        height: '189px'
      }
    },
    adjustHeightSigninFour: {
      height: '132px',
      width: '100%',
      ['@media (max-width:320px)']: {
        height: '126px'
      }
    },
    adjustHeightGridFourRP: {
      height: '67px',
      width: '100%',
      ['@media (max-width:320px)']: {
        height: '63px'
      }
    },
    dishProviderName: {
      fontSize: `${getRemFontSizeByPx(12)}`,
      fontFamily: 'Lato',
      color: '#4A4A4A',
      lineHeight: '16px'
    },
    listCardDishPrice: {
      fontSize: `${getRemFontSizeByPx(15)}`,
      fontFamily: 'Lato',
      color: '#4A4A4A',
      lineHeight: '20px'
    },
    quickReviewCard: {
      backgroundColor: theme.palette.primary.main
    },
    listQuickRate: {
      boxShadow: 'none',
      borderRadius: '0px',
      textTransform: 'none'
    },
    disabled: {}
  };
};

export default styles;
