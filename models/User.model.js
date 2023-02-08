const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const characterschema = new Schema(
  {
    name: String,
    occupation: String,
    weapon: String,
    debt: Boolean,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const characterModel = model("User", characterschema);

module.exports = characterModel;
