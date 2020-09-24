import React, { useEffect, useState, Fragment, useRef } from "react";
import Geocode from "react-geocode";
import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import { ScrollTo, ScrollArea } from "react-scroll-to";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import AppLayout from "../components/layouts/AppLayout";
import styles from "../styles/common";
import League from "../components/layouts/League";
import Categories from "../components/Categories/Categories";
import { globalAPI } from "../services/globalAPI";
import Reviews from "../components/Reviews/Reviews";

const Restaurant = ({ restaurant, classes, dishes }) => {
  const [restLocation, setRestLocation] = useState({ lat: null, lng: null });
  const [distanceToMe, setDistanceToMe] = useState(0);
  const currentLocation = useSelector((state) => state.global.location);
  const API_KEY = "AIzaSyChP5Ri3hwQG4BRFzmDxqGE_SHQnJwPkjc";
  const getLatlng = async () => {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(API_KEY);
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
    try {
      const response = await Geocode.fromAddress(restaurant.address);
      console.log("response is ", response);
      setRestLocation(response.results[0].geometry.location);
      const { lat, lng } = currentLocation;
      if (currentLocation != null) {
        const distance = await globalAPI.getDistanceToMe(
          response.results[0].geometry.location,
          { lat, lng }
        );

        console.log("distance is", distance);
        setDistanceToMe(distance);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const DishesRef = useRef(0);
  const ExploreRef = useRef(0);
  const scrollContainer = useRef(0);
  const mode = "restaurant";

  useEffect(() => {
    getLatlng();
  }, []);

  const AnyReactComponent = ({ text }) => (
    <div className={classes.bold}>{text}</div>
  );

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
            tabsValue={null}
          >
            <div>
              <div style={{ paddingLeft: "10px" }}>
                <div className={classes.heroDishDishName}>
                  {restaurant.name}
                </div>
                <span
                  className={`${classes.heroDishRestarauntName} ${classes.padTop}`}
                >
                  {restaurant.address}
                </span>
                <span> ({distanceToMe} km)</span>
              </div>
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
                  <div style={{ height: "calc(30vh)", width: "95%" }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: API_KEY }}
                      center={restLocation}
                      zoom={16}
                    >
                      <AnyReactComponent
                        lat={restLocation.lat}
                        lng={restLocation.lng}
                        text={restaurant.name}
                      />
                    </GoogleMapReact>
                  </div>
                  <Grid item>
                    <League
                      scroll
                      dishes={dishes}
                      mode={mode}
                      location={
                        <span style={{ textDecoration: "underline" }}>
                          {currentLocation.address}
                        </span>
                      }
                    ></League>
                  </Grid>
                </Grid>
                <Categories></Categories>
                <Reviews></Reviews>
              </ScrollArea>
            </div>
          </AppLayout>
        )}
      </ScrollTo>
    </Fragment>
  );
};

Restaurant.getInitialProps = async ({ query: { restaurant, dishes } }) => {
  return { restaurant, dishes };
};

export default withStyles(styles)(Restaurant);
