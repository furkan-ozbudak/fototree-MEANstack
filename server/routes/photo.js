
const User = require("./../model/user");
const router = require("express").Router();
const ObjectID = require("mongodb").ObjectID;

//get all photos
router.get("/photos", (req, res) => {
  User.find(
    { "uploaded_photos._id": { $exists: true } },
    { email: 1, fname: 1, lname: 1, profile_picture: 1, uploaded_photos: 1 }
  ).then(photos => {
    if (!photos) {
      return res.json({ message: "not found photo " });
    }

<<<<<<< HEAD
    console.log("photo details: ", photos);
    res.json(photos);
  });
});
=======
  User.find({}, { email: 1, fname: 1, lname: 1, profile_picture: 1, uploaded_photos: 1 }).then(photos => {
    if (!photos) {
      return res.json({ "message": "not found photo " })
    }
    res.json(photos);
  });
})
>>>>>>> 4944117c8ab337eac19571c0e322f096bd44a866

//get list of photos by user uploaded
router.get("/photos/:email", (req, res) => {
  console.log(req.params.email);
<<<<<<< HEAD
  User.find(
    { email: req.params.email },
    { email: 1, fname: 1, lname: 1, profile_picture: 1, uploaded_photos: 1 }
  ).then(photos => {
    if (!photos) {
      return res.json({ message: "not found photo" });
=======
  User.find({ email: req.params.email }, { email: 1, fname: 1, lname: 1, profile_picture: 1, uploaded_photos: 1 }).then(photos => {
    if (!photos) {
      return res.json({ "message": "not found photo" })
>>>>>>> 4944117c8ab337eac19571c0e322f096bd44a866
    }

    res.json(photos);
  });
<<<<<<< HEAD
});
=======
})
>>>>>>> 4944117c8ab337eac19571c0e322f096bd44a866

//upload photo
router.post("/photos", (req, res) => {
  let message = {};

  console.log(req.body.email);
<<<<<<< HEAD
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.json({ message: "not found photo" });
      }
      if (req.body.photo) user.uploaded_photos.push(req.body.photo);

      user.save(err => {
        if (err) messge = { message: "Upload fail" };

        message = { message: "Pushed photo successfully!" };
        res.json(message);
      });
    })
    .catch(e => {
      console.log("error", e);
    });
});
=======
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.json({ "message": "not found photo" })
    }
    if (req.body.photo) user.uploaded_photos.push(req.body.photo);

    user.save((err) => {
      if (err) messge = { "message": "Upload fail" };

      message = { "message": "Pushed photo successfully!" };
      res.json(message);
    })

  }).catch(e => {
    console.log("error", e);
  });
})
>>>>>>> 4944117c8ab337eac19571c0e322f096bd44a866

//get details of a specific photo
router.get("/photodetail/:email/:photo_id", async (req, res, next) => {
  console.log("photo detail fetch start");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);
  User.findOne(
    { email: email, "uploaded_photos._id": photoID },
    {
      _id: 0,
      fname: 1,
      lname: 1,
      profile_picture: 1,
      "uploaded_photos.$": 1
    },
    function (error, data) {
      if (error) {
        return res.json(error);
      }
      if (data == undefined || data == null) {
        return res.json("Wrong user email or photo id is inputted.");
      }

      //console.log("comment: ", data.uploaded_photos[0].comments[0]);
      let filteredUser = {
        profile_picture: data.profile_picture,
        fname: data.fname,
        lname: data.lname,
        photo_url: data.uploaded_photos[0].url,
        photo_likes: data.uploaded_photos[0].likes,
        photo_price: data.uploaded_photos[0].price,
        photo_description: data.uploaded_photos[0].description,
        photo_title: data.uploaded_photos[0].title,
        photo_comments: data.uploaded_photos[0].comments,
        photo_category: data.uploaded_photos[0].category
      };
      //console.log("filtered user:", filteredUser);
      res.json(filteredUser);
      console.log("photo detail fetch end");
    }
  );
});

//comment a photo
router.patch("/comment/:email/:photo_id", async (req, res, next) => {
  console.log("photo detail commenting start");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);
  let comment = req.body.comment;
  console.log("comment: ", comment);
  let date = new Date(Date.now()).toLocaleString();
  console.log("date: ", date);
  User.updateOne(
    { email: email, "uploaded_photos._id": photoID },
    {
      $push: { "uploaded_photos.$.comments": { comment: comment, date: date } }
    },
    function(error, data) {
      if (error) {
        return res.json(error);
      }

      if (data == undefined || data == null) {
        return res.json("Wrong user email or photo id is inputted.");
      }
    }
  );
});


//like a photo
router.patch("/photodetail/:email/:photo_id", async (req, res, next) => {
  console.log("photo detail liking start");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);
  User.updateOne(
    { email: email, "uploaded_photos._id": photoID },
    { $inc: { "uploaded_photos.$.likes": 1 } },
    function (error, data) {
      if (error) {
        return res.json(error);
      }
      console.log("like is added.");
    }
  );
});

//dislike a photo
router.patch("/dislike/:email/:photo_id", async (req, res, next) => {
  console.log("photo detail liking start");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);
  User.updateOne(
    { email: email, "uploaded_photos._id": photoID },
    { $inc: { "uploaded_photos.$.likes": -1 } },
    function (error, data) {
      if (error) {
        return res.json(error);
      }
      if (data == undefined || data == null) {
        return res.json("Wrong user email or photo id is inputted.");
      }
      console.log("like is added.");
    }
  );
});

//delete a photo
router.patch("/photodelete/:email/:photo_id/", async (req, res, next) => {
  console.log("deleting photo started");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);
  User.updateOne(
    { email: email },
    { $pull: { uploaded_photos: { _id: photoID } } },
    function (error, data) {
      if (error) {
        return res.json(error);
      }
      if (data == undefined || data == null) {
        return res.json("Wrong user email or photo id is inputted.");
      }
      console.log("photo is deleted.");
    }
  );
});

//update a photo
router.patch("/photoupdate/:email/:photo_id/", async (req, res, next) => {
  console.log("updating photo started");
  let email = req.params.email;
  let photoID = new ObjectID(req.params.photo_id);

  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let category = req.body.category;

  User.updateOne(
    { email: email, "uploaded_photos._id": photoID },
    {
      $set: {
        "uploaded_photos.$.title": title,
        "uploaded_photos.$.category": category,
        "uploaded_photos.$.description": description,
        "uploaded_photos.$.price": price
      }
    },
    function (error, data) {
      if (error) {
        return res.json(error);
      }
      if (data == undefined || data == null) {
        return res.json("Wrong user email or photo id is inputted.");
      }
      console.log("photo is updated.");
    }
  );
});

module.exports = router;
