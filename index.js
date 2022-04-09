const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');
const { modelName } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = {
  title: 'The best lasagnas in the world',
  level: 'UltraPro Chef',
  ingredients: [
    '3 1/2 pounds boneless pork shoulder, cut into large pieces',
    '1 tablespoon freshly ground black pepper',
    '1 tablespoon kosher salt, or more to taste',
    '2 tablespoons vegetable oil',
    '2 bay leaves',
    '2 teaspoons ground cumin',
    '1 teaspoon dried oregano',
    '1/4 teaspoon cayenne pepper',
    '1 orange, juiced and zested'
  ],
  cuisine: 'American',
  dishType: 'main_course',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
  duration: 160,
  creator: 'Chef John'
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // return Recipe.deleteMany();
    //})
    //.then(() => {
    return Recipe.create(newRecipe);
    // return Recipe.insertMany(data);
  })
  .then((outcome) => {
    //console.log(response.title);
    console.log(outcome.title);

    return Recipe.insertMany(data);
  })
  .then((outcome) => {
    const titles = outcome.map((eachRecipe) => eachRecipe.title);
    console.log(titles);
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
