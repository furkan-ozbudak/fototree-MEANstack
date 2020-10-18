const mongoose = require("mongoose");

const User = mongoose.model("User", {
  fname: { type: String, require: true },
  lname: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  profile_picture: { type: String, require: true },
  payment_method: {
    card_type: { type: String, require: true },
    number: { type: String, require: true },
    secrete_no: { type: String, require: true },
    expiry_date: { type: String, require: true },
    name_on_the_card: { type: String, require: true }
  },
  uploaded_photos: [
    {
      url: { type: String, require: true },
      category: { type: String, require: true },
      title: { type: String, require: true },
      description: { type: String },
      price: { type: Number, require: true },
      likes: { type: Number, require: true },
      comments: [
        {
          user: {
            fname: { type: String, require: true },
            lname: { type: String, require: true },
            email: { type: String, require: true },
            profile_picture: { type: String, require: true }
          },
          comment: { type: String, require: true },
          date: Date
        }
      ]
    }
  ],
  cart: [
    {
      photos: [
        {
          url: { type: String, require: true },
          category: { type: String, require: true },
          title: { type: String, require: true },
          description: { type: String, require: true },
          price: { type: Number, require: true }
        }
      ]
    }
  ],
  bought_photos: [
    {
      photo: [
        {
          url: { type: String, require: true },
          category: { type: String, require: true },
          title: { type: String, require: true },
          description: { type: String, require: true },
          price: { type: Number, require: true }
        }
      ]
    }
  ]
});

module.exports = User;
