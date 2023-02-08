const router = require("express").Router();
const axios = require("axios");
const ApiService = require("../services/api.service");
const apiService = new ApiService();

//renders list of all characters
router.get("/characters", async (req, res) => {
  try {
    const allCharacters = await apiService.getAllCharacters();
    res.json(allCharacters.data);
    res.render("characters/list-characters", {
      characters: allCharacters
    });
  } catch (error) {
    console.log(error);
  }
});

//renders form to create new character
router.get("/characters/create", (req, res) => {
  res.render("characters/create-character");
});

// submit info to create new character
router.post("/characters/create", async (req, res) => {
  const charBody = req.body;
  try {
    const createCharacter = await apiService.createCharacter(charBody);
    res.json(createCharacter.data);
    console.log("this is the body: ", createCharacter.data);
    res.redirect("/characters/list-characters");
  } catch (error) {
    console.log(error);
  }
});

// Render a form to edit a character.
router.get("/characters/edit/:id", async (req, res) => {
    const characterId = req.params.id;
    try {
      const editCharacater = await apiService.getOneCharacter(characterId);
      res.render("character/edit-character", { character: editCharacater.data });
    } catch (error) {}
  });
  
// Submit info to edit a character with a matching id.
router.post("/characters/edit/:id", async (req, res) => {
  const characterId = req.params.id;
  const characterInfo = req.body;
  try {
    const editCharacter = await apiService.editCharacter(
      characterId,
      characterInfo
    );
    res.json(editCharacter.data);

    res.redirect("/characters/list-characters");
  } catch (error) {
    console.log(error);
  }
});

// Delete a character with a matching id.
router.get("/characters/delete/:id", async (req, res) => {
    const characterId = req.params.id;
    try {
      const deleteCharacter = await apiService.deleteCharacter(characterId);
      res.json(deleteCharacter.data);
      res.redirect("/characters/list-characters");
    } catch (error) {
      console.log(error);
    }
  });

// characters get id route
router.get("/characters/:id", async (req, res) => {
  try {
    const responseFromAPI = await axios.get(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`
    );
    //  console.log("details: ", responseFromAPI.data)
    res.render("characters/details-character", {
      character: responseFromAPI.data,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
