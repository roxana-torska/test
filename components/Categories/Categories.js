import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import styles from "../../styles/common";
import Typography from "@material-ui/core/Typography";
import { searchDishes } from "../../redux/dishes/actions";

import React, { useState } from "react";

import { connect } from "react-redux";

function Categories(props) {
  function handleSearchTerm(searchTerm) {
    searchDishes(searchTerm, "force");
  }

  const { classes, searchDishes, searchTerm, ExploreRef } = props;

  const categories = [
    {
      id: "0",
      url:
        "https://images.unsplash.com/photo-1547516453-01c9910aafbf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2767&q=80",
      title: "Hummus",
    },
    {
      id: "1",
      url:
        "https://images.unsplash.com/photo-1567336967319-2500ab3ce9dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
      title: "Sushi",
    },

    {
      id: "2",
      url:
        "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2978&q=80",
      title: "Steak",
    },

    {
      id: "3",
      url:
        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2800&q=80",
      title: "Vegan",
    },

    {
      id: "4",
      url:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2851&q=80",
      title: "Soup",
    },
    {
      id: "5",
      url:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2800&q=80",
      title: "Dessert",
    },
  ];
  let i = 0;
  return (
    <React.Fragment>
      <div
        ref={ExploreRef}
        style={{
          zIndex: "999999",
        }}
      >
        <Typography className={classes.ExploreTitle}>Explore</Typography>
      </div>
      <div className={classes.categories} component="section">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleSearchTerm(category.title)}
            className={classes.categoriesCategory}
            style={{
              backgroundImage: `url(${categories[i++].url})`,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                fontFamily: "Poppins",
                opacity: "1",
                zIndex: "3",
              }}
            >
              <span>{category.title} </span>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    searchTerm: state.DishesReducer.searchTerm,
  }),
  { searchDishes }
)(withStyles(styles)(Categories));
