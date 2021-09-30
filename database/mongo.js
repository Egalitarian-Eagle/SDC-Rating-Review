const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ============== review schema =================
const reviewsSchema = new mongoose.Schema({
  _id: {type: Number, unique: true},
  product_id: {type: Number, required: true},
  rating: {type: Number, required: true},
  date: {type: Date, required:true},
  summary: String,
  body: {type: String, required:true},
  recommend: {type:Boolean, default: false},
  reported: {type:Boolean, default: false},
  reviewer_name: {type: String, required:true},,
  reviewer_email: {type: String, required:true},
  response: String,
  helfulness: {type: Number, required: true},

});


// ============= reviews photos schema =============
const reviewPhotoSchema = new mongoose.Schema({
  _id: {type: Number, unique: true},
  review_id: {
    type: Schema.Types.ObjectId,
    ref: 'Review'
  },
  url: String
})


// ============= characteristics schema =============
const characteristicsSchema = new mongoose.Schema({
  _id: {type: Number, unique: true},
  product_id: Number,
  name: String
})


// ============= characteristics schema =============
const characteristicsReviewsSchema = new mongoose.Schema({
  _id: {type: Number, unique: true},
  characteristics_id: {
    type: Schema.Types.ObjectId,
    ref: 'Characteristics'
  },
  review_id: {type: Number, required: true},
  value: Number
})


module.exports = {
  Review:  mongoose.model('Review', reviewsSchema),
  ReviewsPhotos: mongoose.model('Revieww_photos', reviewPhotoSchema),
  Characteristics: mongoose.model('Characteristics', characteristicsSchema),
  CharacteristicsReviews: mongoose.model('CharacteristicsReviews', characteristicsReviewsSchema)

};