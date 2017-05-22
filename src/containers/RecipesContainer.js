import { connect } from 'react-redux'
import Recipes from '../components/Recipes'

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  }
}

const RecipesContainer = connect(
  mapStateToProps
)(Recipes)

export default RecipesContainer