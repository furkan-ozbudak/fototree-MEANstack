const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fototree_api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

