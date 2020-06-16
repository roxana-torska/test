import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React, { useEffect } from "react";
import ProductCategories from "./modules/views/ProductCategories";

import AppFooter from "./modules/views/AppFooter";

import DyneAppBar from "../components/header/DyneAppBar";
import League from "../components/modules/views/League";

//redux

import { connect } from "react-redux";
import { listDishes } from "../redux/dishes/actions";

function Index(props) {
  useEffect(() => {
    props.listDishes();
  }, []);

  return (
    <React.Fragment>
      <DyneAppBar />
      <League location="Tel Aviv" dishes={props.dishes} />
      <ProductCategories />
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    listDishes: () => dispatch(listDishes()),
  };
};

const mapStateToProps = (state) => {
  return {
    dishes: state.listDishes,
  };
};

export default withRoot(connect(mapStateToProps, mapDispatchToProps)(Index));
