import "babel-polyfill";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Spinner from "react-spinkit";

import { loadRecipe } from "../actions";
import Ingredient from "../components/Ingredient";
import Instruction from "../components/Instruction";
import "../../css/recipe.scss";

class Recipe extends Component {
  constructor(props) {
    super();
    props.onLoad(props.recipe.id, props.recipe.isMenuRecipe);
  }

  //if a recipe links to another, it doesn't remount, just receives new props
  componentWillReceiveProps(props) {
    if (this.props.recipe.id !== props.recipe.id) {
      props.onLoad(props.recipe.id, props.recipe.isMenuRecipe);
    }
  }

  render() {
    const {
      id,
      name,
      yieldAmount,
      description,
      inventory,
      instructions,
      isMenuRecipe,
      loaded
    } = this.props.recipe;

    const recStyle = {
      margin: "30px",
      height: "100%",
      fontSize: "20px",
      overflow: "scroll"
    };

    const ingStyle = {
      margin: "10px 0"
    };

    const h1Style = {
      fontWeight: "bold",
      margin: "0 0 5px 0",
      display: "block"
    };

    if (loaded) {
      //TODO: is there a better way that doesn't involve duplicating the whole thing?
      return (
        <div style={recStyle} className="recipe">
          <h1 style={h1Style}>Name: {name}</h1>
          <div>{description ? "Yield: " + description : ""}</div>
          <div className="ingredients" style={ingStyle}>
            <h1 style={h1Style}>Ingredients:</h1>
            {inventory && inventory.map(i => <Ingredient {...i} />)}
          </div>
          <div className="instructions">
            <h1 style={h1Style}>Method of Prep:</h1>
            {instructions && instructions.map(i => <Instruction {...i} />)}
          </div>
        </div>
      );
    } else {
      return <Spinner name="spinner" />;
    }
  }
}

Recipe.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  yieldAmount: PropTypes.number,
  description: PropTypes.string,
  ingredients: PropTypes.array,
  instructions: PropTypes.array,
  isMenuRecipe: PropTypes.bool,
  onLoad: PropTypes.func,
  loaded: PropTypes.bool
};

//TODO: don't dupe from reducers
const keyId = (id, isMenuRecipe) => {
  return isMenuRecipe ? "menu" + id : "prep" + id;
};

const mapStateToProps = (state, ownProps) => {
  const isMenuRecipe = ownProps.match.params[0] === "menu";
  const urlId = parseInt(ownProps.match.params[1], 10);

  return {
    recipe: state.recipes[keyId(urlId, isMenuRecipe)] || {
      id: urlId,
      isMenuRecipe: isMenuRecipe,
      loaded: false
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: (id, isMenuRecipe) => {
      dispatch(loadRecipe(id, isMenuRecipe));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);