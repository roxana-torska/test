import TabIndicator from "@material-ui/core/Tabs/TabIndicator";
var poppins = "Poppins";
const rootFontSize = 14;
const primaryColor = "#000000";
const getRemFontSizeByPx = function (px) {
  let remValue = px / rootFontSize;
  return remValue.toFixed(3) + "rem";
};
const styles = (theme) => {
  return {
    hide: { display: "none !important" },
    relative: { position: "relative" },
    absolute: { position: "absolute" },
    fixed: { position: "fixed" },
    flex: { display: "flex" },
    flexRow: { flexDirection: "row" },
    flexColumn: { flexDirection: "column" },
    flexAlignStart: { alignItems: "flex-start" },
    flexAlignCenter: { alignItems: "center" },
    flexAlignBaseline: { alignItems: "baseline" },
    flexAlignEnd: { alignItems: "flex-end" },
    flexJustifyStart: { justifyContent: "flex-start" },
    flexFustifyCenter: { justifyContent: "center" },
    flexJustifyEnd: { justifyContent: "flex-end" },
    flexJustifyAround: { justifyContent: "space-around" },
    flexJustifyBetween: { justifyContent: "space-between" },
    flexJustifyEvenly: { justifyContent: "space-evenly" },
    center: { textAlign: "center" },

    hr: {
      border: 0,
      borderTop: "1px solid #E1E2E7",
      margin: 0,
      padding: 0,

      outline: "0px",
      height: "0px",
      borderStyle: "solid",
    },

    //material
    root: {
      scrollX: "none",
      height: "45px",
    },

    card: {
      display: "flex",
    },
    cover: {
      width: 151,
    },
    iconClosh: {
      height: "13px",
      transform: "translate(0px,1px)",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    popover: {
      padding: "3px 9px 3px 4px",
    },
    backdrop: {
      position: "absolute",
    },

    textInDish: {
      fontSize: "2em",
      color: theme.palette.primary.main,
      // ['@media (max-width:320px)']: {
      //   fontSize: '1.4rem'
      // }
    },
    // review Card Size management

    pageSpacing: {
      padding: "16px",
    },
    reviewCard: {
      width: "100%",
      boxShadow: "none",
      margin: "0px 0px 0px 0px",
      background: "#FFFEFE",
      fontWeight: 300,
    },
    ["@media screen and (min-width: 321px) and (max-width:360px)"]: {
      width: "340px",
      margin: "0px 0px 0px 0px",
    },
    ["@media screen and (min-width: 361px) and (max-width: 380px) "]: {
      width: "355px",
      margin: "0px 0px 0px 0px",
    },
    ["@media screen and (min-width: 381px) and (max-width: 400px) "]: {
      width: "380px",
      margin: "0px 0px 0px 0px",
    },
    ["@media screen and (min-width: 401px) and (max-width: 420px) "]: {
      width: "391px",
      margin: "0px 0px 0px 0px",
    },

    pageTitle: {
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: "1.5em",
      textAlign: "center",
      // ['@media (max-width:320px)']: {
      //   fontSize: '1rem'
      // }
    },

    AppBar: { padding: "0px" },
    reviewDish: {
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: "0.7em",
      textAlign: "center",
      backgroundColor: "#fffff",
    },
    AppBarBlack: {
      padding: "0px",
      transition: "background-color 500ms ease-in",
      backgroundColor: "#000000",
    },

    topBarBlackLogoContainer: {
      textAlign: "center",
      alignSelf: "center",
      width: "100%",
    },
    topBarBlackLogo: {
      textAlign: "center",
      width: "60px",
      transform: "translate(3.9px,1px) ",
    },
    AppBarBlackLog: {},

    inputFieldGrey: {
      color: "#757575",
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: getRemFontSizeByPx(15),
      fontWeight: 200,
      ["@media (max-width:320px)"]: {
        fontSize: getRemFontSizeByPx(12),
      },
      lineHeight: 1,
      "& input": {
        color: theme.palette.primary.main,
      },
      "& before": { display: "none" },
    },
    inputWhiteField: {
      color: "#fff",
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: "1em",
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    fontInherit: {
      font: "inherit",
    },
    inputFiled: {
      display: "none",
    },
    inputUnderline: {
      font: "inherit",
      // ['@media (max-width:320px)']: {
      //   marginTop: '13px'
      // },
      "&:hover:not($disabled):before,&:before": {
        borderColor: "#aeaeae !important",
        borderWidth: "1px !important",
      },
      "&:before": {
        borderBottomColor: "#aeaeae",
        borderBottomWidth: "1px",
      },
    },

    inputLabel: {
      height: "90px",
    },

    footerLatoTextNormal: {
      color: "#717171",
      fontSize: getRemFontSizeByPx(13),
      fontFamily: "'Poppins', 'sans-serif'",
      fontWeight: "200",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1,
      ["@media (max-width:320px)"]: {
        fontSize: getRemFontSizeByPx(11),
      },
    },
    footerLatoTextBold: {
      fontWeight: "600",
    },
    bold: {
      fontWeight: "600",
      color: primaryColor,
      fontSize: "14px",
      textDecoration: "underline",
    },
    btnContainer: {
      margin: "89px 40px 50px",
    },
    footerLink1: {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
    footerBgIconContainer: {
      position: "relative",
      fontSize: "0px",
      lineHeight: "0px",
      height: "0px",
    },
    styledHeader: {
      "& h2": {
        color: "red",
      },
    },
    topbar: {
      height: "49px",
    },
    topbarBack: {
      height: "49px",
    },
    topBarLogoContainer: {
      textAlign: "center",
      alignSelf: "center",
      width: "100%",
    },
    topBarLogo: {
      textAlign: "center",
      width: "110px",
      transform: "translate(0px,-2px)",
    },
    footerLogo: {
      textAlign: "center",
      width: "120px",
      transform: "translate(0px,-1px)",
    },
    topBgIconContainer: {},
    topBarIcon: {
      width: "16px",
    },
    topBarIconBack: {
      width: "11px",
    },
    topBarIconSearch: {
      transform: "translate(-12px,-6px)",
    },
    topBarIconMenu: {
      transform: "translate(8px,-5px)",
    },
    topBarProfileImg: { width: "28px" },
    topBarIcon: {
      width: "16px",
    },

    topBarSearch: { width: "100%", transform: "translate(0px,-3px)" },
    scroll: { overflowY: "scroll", height: "100vh" },
    headerMarginSuppress: {
      marginTop: "78px",
    },
    topbarBlack: {
      filter: "invert(1) brightness(500)",
      background: "transparent",
    },

    headerHr: {
      display: "block",
      height: "1px",
      border: 0,
      borderTop: `1px solid ${theme.palette.secondary.main}`,
      margin: "0em 0; padding: 0",
    },
    recoverPasswordDialog: {
      padding: "20px",
      borderRadius: "0px",
    },
    recoverPasswordDialogTitle: {
      color: theme.palette.primary.main,
      fontFamily: "'Lato'",
      fontSize: "1.5em",
      fontWeight: "600",
      // ['@media (max-width:320px)']: {
      //   fontSize: '.9rem'
      // }
    },

    roomServiceIcon: {
      height: "20px",
      width: "28px",
    },
    dishDescriptionReview: {
      fontSize: "0.5em",
      fontFamily: "Lato",
      textDecoration: "underline",
      padding: "0px",
    },
    dishDetailTagValue: {
      fontFamily: "Lato",
      fontSize: "1em",

      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },

    tagIconSize: {
      fontSize: "15px",

      "& svg": {
        fontSize: "15px",
        verticalAlign: "middle",
      },
    },
    allReviews: {
      fontFamily: "'Roboto', 'medium'",
      fontSize: "1em",
      color: "red",
    },
    reserverTable: {
      fontFamily: "'BebasNeue'",
      fontSize: "1.6em",
    },
    subscriptRating: {
      color: "#acacac",
      verticalAlign: "sub",
      fontFamily: "Montserrat",
      fontSize: "18px",
    },
    slashRating: {
      color: "#c4c4c4",

      fontFamily: "Montserrat",
      fontSize: "18px",
    },
    superscriptRating: {
      color: "#acacac",
      fontFamily: "Montserrat",
      fontSize: "18px",
    },
    cardRatingAction: {
      marginTop: "0px",
      marginRight: "0px",
    },
    reviewDialogTitle: {
      color: theme.palette.primary.main,
      fontFamily: "Roboto",
      fontSize: "1.3em",
    },
    reviewDialogCheck: {
      color: "#979797",
      fontSize: "1.5em",
    },
    reviewDialogDisc: {
      fontFamily: "Roboto",
      fontSize: "1em",
      color: "#979797",
    },

    makeAReviewPopoverPaper: {
      boxShadow: "none",
    },
    restaurantDetailName: {
      fontFamily: "'BebasNeue'",
      fontSize: "1.5em",
      fontWeight: "600",
      paddingLeft: "20px",
    },
    restaurantAddressBar: {
      fontSize: ".9em",
      color: "#979797",
      fontFamily: "Lato",
      marginLeft: "20px",
      borderBottom: "1px solid #979797",
      marginBottom: "20px",
      marginRight: "20px",
      paddingBottom: "10px",
      // ['@media (max-width:320px)']: {
      //   fontSize: '.7rem'
      // }
    },
    restaurantAddressBarIcon: {
      verticalAlign: "middle",
    },
    restaurantAddress: {
      // marginLeft: '15px'
    },
    latestReviewRating: {
      fontFamily: "Montserrat",
      fontSize: "1.1em",
      textAlign: "right",
      color: theme.palette.primary.main,
    },
    reserveTableDialog: {
      backgroundColor: "#fafafa",
      fontSize: "1em",
      fontFamily: "lato",
      fontWeight: "600",
      color: "#979797",
      marginTop: "20px",
    },

    ratingValueFont: {
      fontFamily: "Montserrat",
      fontSize: "14px",
      borderBottom: "3px solid",
      borderBottomColor: "#7d8287",
      width: "28px",
      textAlign: "center",
      marginLeft: "auto",
      marginRight: "auto",
      paddingBottom: "5px",
    },

    restaurantReviews: {
      color: theme.palette.primary.main,
      fontSize: ".8em",
    },
    lookAndFeelPrimary: {
      backgroundColor: "#d32f2f",
    },
    valueForMoneyPrimary: {
      backgroundColor: "#ffcdd2",
    },
    tastePrimary: {
      backgroundColor: "#e57373",
    },
    nameEllipsis: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    fabIconInChip: {
      height: "40px",
      width: "40px",
    },
    advanceReviewAppbar: {
      height: "20px",
      boxShadow: "none",
      backgroundColor: "lightGray",
      color: "#979797",
    },
    mobileStepperDots: {
      width: "100%",
      justifyContent: "center",
    },
    mainNavbar: {
      // transition: 'height 0.5s ease-in-out 1s',
      // height: '37px',
      overflow: "hidden",
    },
    // hideMainNavbar: {
    //   height: '0px'
    // },
    selectRemoveUnderline: {
      "&:hover:not($disabled):before,&:before": {
        borderWidth: "0px !important",
      },
      "&:after": {
        borderBottomWidth: "0px",
      },
    },
    commentsTextField: {
      height: "50px",
      width: "90%",
    },
    advanceRating: {
      backgroundColor: "#eeeeee",
    },
    // add buttun
    increament: {
      border: "1px solid red",
      width: "25px",
      color: "black",
      height: "25px",
      backgroundColor: "#ffffff",
    },

    restaurantMenuSelected: {
      width: "100px",
    },
    showLoading: {
      position: "absolute",
      bottom: "50%",
      left: "50%",
    },
    location: {
      marginLeft: "5px",
      fontWeight: 400,
      textDecoration: "underline",
    },

    quickReviewCard: {
      backgroundColor: theme.palette.primary.main,
    },
    listQuickRate: {
      boxShadow: "none",
      borderRadius: "0px",
      textTransform: "none",
    },

    disabled: {},
    leagueTitle: {
      backgroundColor: theme.palette.secondary.main,
      textAlign: "center",
      padding: "8px 0px 8px 0px",
      fontWeight: 300,
      marginBottom: "0px",
      fontSize: "14px !important",
      color: "#000000",
    },
    heroDish: {
      margin: "0px",
      paddingLeft: "18px",
      paddingRight: "18px",
      marginLeft: 0,
    },
    heroDishDescription: {
      fontWeight: 300,
      textAlign: "left",

      fontSize: "13px",
      fontWeight: 300,
    },

    heroDishDishName: {
      color: primaryColor,
      fontFamily: "Poppins",
      fontSize: "22px",
      textAlign: "left",
      transform: "translate(0px,8px)",
      whiteSpace: "nowrap",
    },

    heroDishRestarauntName: {
      fontFamily: "Poppins",
      fontSize: "15px",
      fontWeight: 200,
      textDecoration: "underline",
      textAlign: "left",
    },

    heroDishHeader: {
      padding: 0,

      "&:hover": {},
    },
    heroDishMedia: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      margin: "0px 0px 0px 0px",
      paddingBottom: "0px",
      backgroundColor: "#EFF2F4",
    },

    heroDishBottom: { padding: "8px 0px !important" },
    CollapsedDishAction: {
      fontWeight: 300,
      textTransform: "capitalize",
      textDecoration: "underline",
      fontSize: "15px",
      transform: "translate(0px,0px)",
    },

    LeagueDishAction: {
      fontWeight: 300,
      textTransform: "capitalize",
      textDecoration: "underline",
      fontSize: "18px",
      transform: "translate(0px,0px)",
    },
    heroDishexpandOpen: {
      transform: "rotate(180deg)",
    },

    heroDishHeaderActions: {},
    heroDishScore: {
      fontSize: "16px",
      fontWeight: 300,
      color: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
    },
    heroDishScoreFloat: {
      transform: "translate(4px)",
    },
    league: {
      overflow: "visible",
    },
    collapsedDish: {
      width: "calc(100vw - 18px)",
    },

    collapsedDishDishName: {
      fontFamily: "Poppins",
      fontSize: "21px",
      textAlign: "left",
      transform: "translate(-22px,-4px)",
      whiteSpace: "nowrap",
      lineHeight: 0,
      color: "#000000",
    },
    horLine: {
      color: "#E1E2E7",
      margin: "0px 4px 0px 4px",
    },

    collapsedDishAvatar: {
      height: 0,
      overflow: "visible",
      padding: "0px 6px  0px 0px",
      margin: "0px 5px",
      height: "66px",
      border: "none",
      backgroundColor: "transparent",
      transform: "translate(-8px,0px)",
    },
    collapsedDishAvatarImg: {
      border: "none",
      overflow: "visible",
      height: "55px",
      marginLeft: "8px",
      transform: "scale(1.1)",
    },
    scrollRate1: {
      opacity: 0.3,
      border: "none",
      overflow: "visible",
      height: "80px",
      backgroundColor: "#0000002c",
      padding: "12px",
      borderRadius: "50%",
      marginRight: "14px",
    },
    scrollRate1selected: {
      backgroundColor: "white",
      filter: " invert(1)",
      border: "none",
      overflow: "visible",
      height: "80px",

      padding: "12px",
      borderRadius: "50%",
      marginRight: "14px",
    },
    scrollRate2: {
      opacity: 0.3,
      border: "none",
      overflow: "visible",
      height: "80px",
      backgroundColor: "#0000002c",
      padding: "12px 16px",
      borderRadius: "50%",
      marginRight: "14px",
    },
    scrollRate2selected: {
      backgroundColor: "white",
      filter: " invert(1)",
      border: "none",
      overflow: "visible",
      height: "80px",

      padding: "12px 16px",
      borderRadius: "50%",
      marginRight: "14px",
    },
    scrollRate3: {
      opacity: 0.3,
      border: "none",
      overflow: "visible",
      height: "80px",
      backgroundColor: "#0000002c",
      borderRadius: "50%",
      marginRight: "14px",
      padding: "12px",
    },
    scrollRate3selected: {
      backgroundColor: "white",
      filter: " invert(1)",
      border: "none",
      overflow: "visible",
      height: "80px",

      padding: "12px",
      borderRadius: "50%",
      marginRight: "14px",
    },
    scrollRate4: {
      opacity: 0.3,
      border: "none",
      overflow: "visible",
      height: "80px",
      backgroundColor: "#0000002c",
      borderRadius: "50%",
      marginRight: "14px",
      padding: "12px 20px",
    },
    scrollRate4selected: {
      backgroundColor: "white",
      filter: " invert(1)",
      border: "none",
      overflow: "visible",
      height: "80px",

      padding: "12px 20px",
      borderRadius: "50%",
      marginRight: "14px",
    },
    scrollRate5: {
      opacity: 0.3,
      border: "none",
      overflow: "visible",
      height: "80px",
      backgroundColor: "#0000002c",
      padding: "12px 20px",
      borderRadius: "50%",
      marginRight: "14px",
    },
    scrollRate5selected: {
      backgroundColor: "white",
      filter: " invert(1)",
      border: "none",
      overflow: "visible",
      height: "80px",

      padding: "12px 20px",
      borderRadius: "50%",
      marginRight: "14px",
    },
    collapsedDishActions: {
      fontFamily: "Poppins",

      transform: "translate(0px,4px)",
      whiteSpace: "nowrap",
      lineHeight: "20px",
    },
    collapsedSubHeader: {
      lineHeight: 0,
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      fontFamily: "Poppins",
      fontSize: "15px",
      fontWeight: 200,

      textAlign: "right",
      color: "#000000",
    },
    collapsedSubHeaderLeft: {
      transform: "translate(-22px,21px)",
      textDecoration: "underline",
      color: "#000000",
    },
    collapsedSubHeaderRight: {
      transform: "translate(0px,16px)",
      textDecoration: "none",
    },

    appBar: {
      backgroundColor: "#ffffff",
    },
    categories: {
      padding: "10px 0px",
    },
    categoriesCategory: {
      margin: "10px auto",
      height: "100px",
      width: "calc(100% - 20px)",
      overflow: "hidden",
      background: "black",
      color: "#ffffff",
      position: "relative",

      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",

      "&:after": {
        content: `""`,
        opacity: "0.4",
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "black",
      },
      "&:hover:after": {
        content: `""`,
        opacity: "0.2",
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "black",
      },
    },
    ExploreTitle: {
      textAlign: "left",
      padding: "8px 20px 8px 20px",
      position: "relative",
      fontFamily: "Poppins",
      fontWeight: 300,
      marginBottom: "0px",
      fontWeight: "400",

      color: "#000000",

      backgroundColor: "#ffffff",

      borderBottom: "1px solid #2E3451",
      borderTop: "1px solid #2E3451",

      fontSize: "14px !important",

      boxSizing: "border-box",
    },
    reviewTitle: {
      fontWeight: 700,
      fontFamily: "Poppins",
      color: theme.palette.primary.main,
      fontSize: "20px",
      padding: "10px",
    },
    reviewFormContainer: {
      padding: "10px",
      textAlign: "center",
    },

    textArea: {
      width: "85%",
      height: "120px",
    },
    reviewLink: {
      textDecoration: "underline !important",
      fontSize: "16px",
    },
    relativeSmall: {
      fontSize: "0.85rem",
    },
    rightButton: {
      position: "absolute",
      right: "0px",
      top: "3px",
    },
    tabsContainer: {
      backgroundColor: theme.palette.secondary.main,
      textAlign: "center",
      padding: "0px 20px",
      fontWeight: 300,
      marginBottom: "0px",
      fontSize: "15px !important",
      height: "37px",
      overflow: "hidden",
    },
    tabs: {
      padding: "0px",
      margin: "0px",
      maxHeight: "10px",
      height: "30px",
    },
    tab: {
      color: "#0000006c",
      minHeight: "37px",

      "&.selected": {
        color: "#000000",
      },
    },
    indicator: {
      display: "none",
    },
    tabLabel: {
      fontSize: "14px",
    },
    Review: {
      maxWidth: 345,
    },
    ReviewMedia: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    ReviewExpand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    ReviewExpandOpen: {
      transform: "rotate(180deg)",
    },
    ReviewAvatar: {
      backgroundColor: primaryColor,
    },
    dyneScore: {
      fontSize: "16px",
      fontWeight: 300,
      fontFamily: "Poppins",
      color: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
    },
    link: {
      fontSize: "16px",
      fontWeight: 300,
      fontFamily: "Poppins",
      color: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
      textTransform: "none",
      padding: "3px 9px",
    },
    action: {
      fontWeight: 300,
      textTransform: "capitalize",
      textDecoration: "underline",
      fontSize: "18px",
      transform: "translate(0px,0px)",
    },

    footer: {
      fontFamily: "Poppins",
      display: "grid",
      justifyItems: "center",
      gridTemplateColumns: "1fr 1fr ",
      gridTemplateRows: "40px 180px 180px ",
      flexWrap: "wrap",
      minHeight: "600px",
      width: "100%",
      backgroundColor: "#000000",
    },
    footerCol: {
      display: "flex",
      flexDirection: "column",

      boxSizing: "border-box",
    },
    footerColH1: {
      margin: 0,
      padding: 0,
      fontFamily: "inherit",
      fontSize: "14px",
      lineHeight: "17px",
      padding: "20px 0px 5px 0px",
      color: "rgba(255,255,255)",
      fontWeight: "normal",
      alignSelf: "center",
    },
    footerColUl: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      listStyleType: "none",
      margin: 0,
      padding: 0,
    },
    footerColUlLi: {
      color: "#999999",
      fontSize: "14px",
      fontFamily: "inherit",
      fontWeight: "bold",
      padding: "5px 0px 5px 0px",
      cursor: "pointer",
      transition: ".2s",
      alignSelf: "center",
    },
    padTop: {
      paddingTop: 6,
      paddingBottom: 4,
      display: "inline-block",
    },
    footerSocial: {
      display: "flex",
      paddingRight: "5px !important",

      "&:hover": {
        color: "#ffffff",
        transition: ".1s",
      },
    },
    clearfix: {
      clear: "both",
    },
    dishPageOrderList: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    dishPageOrderListItem: {
      flexBasis: "90px",
      height: "30px",
      textTransform: "none",
      textDecoration: "underline",
      fontSize: "16px",
      fontWeight: "200",
    },
    dishPageOrderListImg: {
      minwidth: "60px",
    },
    dishPageOrderListTitle: {
      minwidth: "30px",

      textAlign: "left",
      fontFamily: "Poppins",
      fontWeight: 300,
      marginBottom: "0px",
      fontWeight: "400px",
      fontSize: "16px !important",
      color: "#000000",
    },
    sectionDevider: {
      backgroundColor: "#ffffff",
      textAlign: "center",
      padding: "8px 0px 8px 0px",
      fontWeight: 300,
      borderBottom: "1px solid #2E3451",
      borderTop: "1px solid #2E3451",
      marginBottom: "0px",
      fontSize: "14px !important",
      color: "#000000",
      boxSizing: "border-box",
    },
    devider: {
      width: "1px",
      height: "100%",
      background: "#0000001c",
    },

    DrawerLayout: {
      background: "black",
    },
    AppheaderDrawer: {
      filter: "invert(1)",
    },
    verticalMenu: {
      padding: "50px",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100vw",
      background: "black",
      alignItems: "center",
    },
    verticalMenuItem: {
      fontSize: "24px",
      fontWeight: 100,
      color: "white",
      zIndex: 9,
      margin: "20px",
      textDecoration: "underline",
      fontFamily: poppins,
    },
    verticalMenuBottomItems: {
      fontFamily: "Poppins",
      fontWeight: 300,
      position: "absolute",
      bottom: "0px",
      display: "flex",
      justifyContent: "space-around",
      padding: "16px",
      width: "100%",
      borderTop: "1px solid white",
    },
    verticalMenuBottomItem: {
      color: "white",
    },
    subHeaderAddBtn: {
      cursor: "pointer",
      color: "black",
      backgroundColor: "#0000000c",
      width: "42px",
      position: "absolute",
      height: "100%",
      right: 0,
      top: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

      "&:hover": {
        opacity: "0.9",
      },
    },
    subHeaderCloseBtn: {
      cursor: "pointer",
      color: "black",
      backgroundColor: "#000000",
      width: "40px",
      position: "absolute",
      height: "100%",
      right: 0,
      top: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

      "&:hover": {
        opacity: "0.9",
      },
    },
    plusIcon: {
      width: "14px",
    },
    reviewBtnp: {
      filter: "brightness(0)",
      transform: "translate(2px,2px)  scale(1.2)",
    },
    reviewBtnx: {
      transform: "translate(-1px,2px) rotate(45deg) scale(1.25)",
    },
    scrollRateContainer: {
      display: "flex",
      overflow: "scroll",
      width: "calc(100vw - 20px)",
    },
  };
};

export default styles;
