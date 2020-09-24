import React, { useState, useEffect, useRef, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AppLayout from "../components/layouts/AppLayout";
import League from "../components/layouts/League";
import { Typography } from "@material-ui/core";
import styles from "../styles/common";
import Geocode from "react-geocode";
import globalActions from "../redux/global/actions";
import { getDishes } from "../redux/dishes/actions";
import { connect } from "react-redux";
import { setLocation } from "../utils/common";
import Categories from "../components/Categories/Categories";
import Reviews from "../components/Reviews/Reviews";
import { ScrollTo, ScrollArea } from "react-scroll-to";
import AppFooter from "../components/footer/AppFooter";
import { API_URL, APP_URL } from "../utils/config";
import { request } from "../utils/request2";

let { setCurrentLocation } = globalActions;

const WelcomeToDishIn = (props) => {
  const [tabsValue, setTabsValue] = useState(null);
  const {
    getDishes,
    firstdishes,
    dishes,
    global: { location },
    classes,
    searchTerm,
  } = props;

  const DishesRef = useRef(0);
  const ExploreRef = useRef(0);
  const scrollContainer = useRef(0);

  function handleScroll() {
    /*   if (DishesRef.current.getBoundingClientRect().y > 81) {
      setTabsValue(0);
    } else if (ExploreRef.current.getBoundingClientRect().y < 94) {
      setTabsValue(1);
    } */
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
      Geocode.setApiKey("AIzaSyChP5Ri3hwQG4BRFzmDxqGE_SHQnJwPkjc");
      // Enable or disable logs. Its optional.
      Geocode.enableDebug();

      // Get address from latidude & longitude.
      Geocode.fromLatLng(pos.lat, pos.lng).then(
        (response) => {
          let address = "";
          const streetAddress = response.results.find((el) => {
            return el.types.includes("street_address");
          });

          if (streetAddress) {
            address = streetAddress.formatted_address;
          } else {
            address = response.results[0].formatted_address;
          }
          props.setCurrentLocation({ ...pos, address });
        },
        (error) => {
          updateLocation(null);
        }
      );
    });
  }, []);

  let mode = searchTerm ? "search" : "home";

  return (
    <Fragment>
      <ScrollTo>
        {({ scroll }) => (
          <AppLayout
            DishesRef={DishesRef}
            ExploreRef={ExploreRef}
            scrollContainer={scrollContainer}
            scrollFun={scroll}
            mode={mode}
            tabsValue={tabsValue}
          >
            {mode === "home" ? (
              <div>
                <ScrollArea
                  style={{ height: "calc(100vh)", overflowY: "scroll" }}
                >
                  <Grid
                    className={classes.adjustHeightGridOne}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                    spacing={0}
                  >
                    <Grid item>
                      <League
                        scroll
                        dishes={firstdishes}
                        mode={mode}
                        location={
                          <span style={{ textDecoration: "underline" }}>
                            {location.address || "Telaviv"}
                          </span>
                        }
                      ></League>
                    </Grid>
                  </Grid>
                  <Categories />
                  <Reviews />
                  <AppFooter />
                </ScrollArea>
              </div>
            ) : (
              <div>
                <ScrollArea
                  onScroll={(e) => {
                    handleScroll(e, scroll);
                  }}
                  style={{ height: "calc(100vh - 60px)", overflowY: "scroll" }}
                >
                  <Grid
                    className={classes.adjustHeightGridOne}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                    spacing={0}
                  >
                    <Grid item>
                      <League
                        DishesRef={DishesRef}
                        dishes={dishes.info.data}
                        location={location.address}
                      ></League>
                    </Grid>
                  </Grid>
                  <Categories ExploreRef={ExploreRef}></Categories>
                </ScrollArea>
              </div>
            )}
          </AppLayout>
        )}
      </ScrollTo>
    </Fragment>
  );
};
WelcomeToDishIn.getInitialProps = async () => {
  let url = `${API_URL}/dishes/`;

  let response = await request(url, {
    method: "GET",
  });
  console.log("response", response);

  return { firstdishes: response.data };
};
export default connect(
  (state) => ({
    global: state.global,
    dishes: state.DishesReducer,
    searchTerm: state.DishesReducer.searchTerm,
  }),
  {
    setCurrentLocation,
    getDishes,
  }
)(withStyles(styles)(WelcomeToDishIn));
