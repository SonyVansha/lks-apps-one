const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  examCode: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  examTitle: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  quiz: [],
  date_created: {
    type: String,
    trim: true,
  },
  date_modified: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
  collection: 'soal',
});

quizSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});

module.exports = mongoose.model("Quiz", quizSchema);


// const mongoose       = require('mongoose')
// const Schema         = mongoose.Schema

// const quizSchema = new Schema({
//     examTitle : {
//         type: String,
//         trim: true,
//         required: true,
//         unique: true
//     },
//     quiz : [],
//     date_created : {
//         type: String,
//         trim: true,
//     },
//     date_modified : {
//         type: String,
//         trim: true,
//     },
// }, {
//     timestamps: true,
//     collection : 'soal'
// })

// quizSchema.set('toJSON', {
//     virtuals: true,
//     versionKey: false
// });

// const quizData = mongoose.model('quiz', quizSchema);

// module.exports = quizData