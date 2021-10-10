const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "568a8ad987284b48bcc235d0027c1e93",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) =>
      res.status(400).json("unable to work with API..." + req.body.input)
    );
};

const handleEntries = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries..."));
};

module.exports = {
  handleEntries: handleEntries,
  handleApiCall: handleApiCall,
};
