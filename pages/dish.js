import React, { PureComponent, Fragment, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppLayout from "../components/layouts/AppLayout";
import styles from "../styles/common";
import { connect } from "react-redux";
import actions from "../redux/global/actions";
import HeroDish from "../components/Dishes/HeroDish";
import OrderList from "../components/OrderList/OrderList";
import Reviews from "../components/Reviews/Reviews";
import { ScrollTo, ScrollArea } from "react-scroll-to";
import Categories from "../components/Categories/Categories";
import AppFooter from "../components/footer/AppFooter";

const { setCurrentLocation } = actions;

const Dish = ({ dish, token }) => {
  console.log(dish);
  return (
    <Fragment>
      <ScrollTo>
        {({ scroll }) => (
          <AppLayout mode={"back"}>
            <ScrollArea style={{ height: "calc(100vh)", overflowY: "scroll" }}>
              <HeroDish
                dishName={dish.dishName}
                restaurantName={dish.restaurantName}
                score={dish.dyneScore}
                image={`../../../static/imgs/Dishes/${dish.restaurantName.replace(
                  " ",
                  "-"
                )}/${dish.dishName.replace(/\s/g, "-")}.jpg`}
              ></HeroDish>
              <OrderList
                tenbis={dish.tenbis}
                ontopo={dish.ontopo}
                wolt={dish.wolt}
              />
              <Reviews dishId={dish._id} token={token} withForm={true} />
              <Categories />
            </ScrollArea>
          </AppLayout>
        )}
      </ScrollTo>
    </Fragment>
  );
};

Dish.getInitialProps = async ({ query: { dish, token } }) => {
  console.log("toekn", token);
  return { dish, token };
};

export default connect(
  (state) => ({
    dishes: state.DishesReducer,
    searchTerm: state.DishesReducer.searchTerm,
  }),
  {
    setCurrentLocation,
  }
)(withStyles(styles)(Dish));
