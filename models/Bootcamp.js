const mongoose = require("mongoose");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    reuired: [true, "Plese add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "name can not be more than 50 characteres"],
  },

  slug: String,
  descriiption: {
    type: String,
    reuired: [true, "Plese add a description"],
    unique: true,
    trim: true,
    maxlength: [500, "Description can not be more than 50 characteres"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www.\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },

  phone: {
    type: String,
    maxlength: [20, "Phone number can not be longer than 20 chatacters"],
  },

  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please addd a valid email",
    ],
  },

  address: {
    type: String,
    required: [true, "Please add an address"],
  },

  location: {
    //GeoJSON Point

    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },

  careers: {
    // Array of stirngs
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },

  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating can not be more than 10"],
  },

  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },

  housing: {
    tyype: Boolean,
    default: false,
  },

  jobAssistance: {
    type: Boolean,
    default: false,
  },

  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);






