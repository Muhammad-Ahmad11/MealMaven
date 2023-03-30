const express = require("express");
const Recipe = require("../models/recipeschema");
const router = express.Router();
const DietPlan = require("../models/dietschema");

router.get("/recipes", async (req, res) => {
  const type = req.query.type;
  const sugarFreeRecipes = await Recipe.find({ type: "sugar free" });
  res.json(sugarFreeRecipes);
});

router.get("/recipes2", async (req, res) => {
  const type = req.query.type;
  const carbRecipes = await Recipe.find({ type: "carb free" });
  res.json(carbRecipes);
});

router.get("/recipes3", async (req, res) => {
  const type = req.query.type;
  const proteinRecipes = await Recipe.find({ type: "protein" });
  res.json(proteinRecipes);
});

router.get("/recipes4", async (req, res) => {
  const type = req.query.type;
  const dairyRecipes = await Recipe.find({ type: "dairy" });
  res.json(dairyRecipes);
});

router.get("/recipes5", async (req, res) => {
  const type = req.query.type;
  const starchRecipes = await Recipe.find({ type: "starch free" });
  res.json(starchRecipes);
});

router.get("/recipes6", async (req, res) => {
  const type = req.query.type;
  const allRecipes = await Recipe.find();
  res.json(allRecipes);
});

router.delete('/recipes7/:recipeId', async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findById(recipeId);

    await Recipe.findByIdAndDelete(recipeId);
  } catch (err) {
    console.log(err);
  }
});

router.post('/recipes8', async (req, res) => {
  try {
    const { name, type, ingredients, instructions } = req.body;
    const recipe = new Recipe({ name, type, ingredients, instructions });
    await recipe.save();
    res.status(201).json({ message: 'Recipe created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Recipe not added' });
  }
});


router.put('/recipes9/:name', async (req, res) => {
  const { name } = req.params;
  const { type, ingredients, instructions } = req.body;

  const updatedFields = {};

  if (type) updatedFields.type = type;
  if (ingredients) updatedFields.ingredients = ingredients;
  if (instructions) updatedFields.instructions = instructions;

  try {
    const recipe = await Recipe.findOneAndUpdate(
      { name },
      updatedFields,
      { new: true }
    );
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error' });
  }
});

router.get("/diet", async (req, res) => {
  const type = req.query.type;
  const allDiets = await DietPlan.find();
  res.json(allDiets);
});

router.delete('/diet7/:dietId', async (req, res) => {
  try {
    const dietId = req.params.dietId;
    const diet = await DietPlan.findById(dietId);

    await DietPlan.findByIdAndDelete(dietId);

  } catch (err) {
    console.log(err);
  }
});

router.post('/diet8', async (req, res) => {
  try {
    const { name, type, duration, details } = req.body;
    const diet = new DietPlan({ name, type, duration, details });
    await diet.save();
    res.status(201).json({ message: 'Diet Plan created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Diet Plan not added' });
  }
});


router.put('/diet9/:name', async (req, res) => {
  const { name } = req.params;
  const { type, duration, details } = req.body;

  const updatedFields = {};

  if (type) updatedFields.type = type;
  if (duration) updatedFields.duration = duration;
  if (details) updatedFields.details = details;

  try {
    const diet = await DietPlan.findOneAndUpdate(
      { name },
      updatedFields,
      { new: true }
    );
    res.json(diet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error' });
  }
});
module.exports= router;