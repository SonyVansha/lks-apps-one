const quizModel = require('../models/quiz');

exports.index = async (req, res) => {
    return res.status(200).send(
        `Hello Exam public API Entry point here :D!
        
        List of API Endpoints:
        - /exam/quiz = List of all exam data
        - /exam/init = Initial exam data
        - /exam/flush = Remove all data.`
    );
};

exports.getAllData = async (req, res) => {
    try {
        const data = await quizModel.find({});
        
        if (data.length > 0) {
            return res.status(200).json({
                code: 200,
                status: 'OK',
                message: 'Retrieve all data success.',
                data: data
            });
        } 
        
        return res.status(404).json({
            code: 404,
            status: 'ERR_DATA_NOT_FOUND',
            message: 'Data not found!'
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({
            status: "Error",
            code: 500,
            message: "Internal Server Error"
        });
    }
};

exports.create = async (req, res) => {
    try {
      const newQuiz = new quizModel({
        examCode: "AMSN_EXAM",
        examTitle: "Addmission Exam",
        quiz: [
          {
            quizId: 1,
            quizTitle: "Quiz number 1",
            options: [
              { optionId: "A", option: "options A" },
              { optionId: "B", option: "options B" },
              { optionId: "C", option: "options C" },
              { optionId: "D", option: "options D" },
            ],
            answer: "A",
          },
          {
            quizId: 2,
            quizTitle: "Quiz number 2",
            options: [
              { optionId: "A", option: "options A" },
              { optionId: "B", option: "options B" },
              { optionId: "C", option: "options C" },
              { optionId: "D", option: "options D" },
            ],
            answer: "C",
          },
        ],
      });
  
      await newQuiz.save();
      res.json({ message: "Quiz inserted successfully", data: newQuiz });
    } catch (error) {
      res.status(500).json({ message: "Error inserting quiz", error });
    }
  };
  
// exports.create = async (req, res) => {
//     try {
//         const quizData = {
//             examCode: "AMSN_EXAM",
//             examTitle: "Addmission Exam",
//             quiz: [
//                 {
//                     quizId: 1,
//                     quizTitle: "Quiz number 1",
//                     options: [
//                         { optionId: "A", option: "options A" },
//                         { optionId: "B", option: "options B" },
//                         { optionId: "C", option: "options C" },
//                         { optionId: "D", option: "options D" }
//                     ],
//                     answer: "A"
//                 },
//                 {
//                     quizId: 2,
//                     quizTitle: "Quiz number 2",
//                     options: [
//                         { optionId: "A", option: "options A" },
//                         { optionId: "B", option: "options B" },
//                         { optionId: "C", option: "options C" },
//                         { optionId: "D", option: "options D" }
//                     ],
//                     answer: "C"
//                 },
//                 {
//                     quizId: 3,
//                     quizTitle: "Quiz number 3",
//                     options: [
//                         { optionId: "A", option: "options A" },
//                         { optionId: "B", option: "options B" },
//                         { optionId: "C", option: "options C" },
//                         { optionId: "D", option: "options D" }
//                     ],
//                     answer: "D"
//                 },
//                 {
//                     quizId: 4,
//                     quizTitle: "Quiz number 4",
//                     options: [
//                         { optionId: "A", option: "options A" },
//                         { optionId: "B", option: "options B" },
//                         { optionId: "C", option: "options C" },
//                         { optionId: "D", option: "options D" }
//                     ],
//                     answer: "D"
//                 },
//                 {
//                     quizId: 5,
//                     quizTitle: "Quiz number 5",
//                     options: [
//                         { optionId: "A", option: "options A" },
//                         { optionId: "B", option: "options B" },
//                         { optionId: "C", option: "options C" },
//                         { optionId: "D", option: "options D" }
//                     ],
//                     answer: "D"
//                 },
//                 {
//                     quizId: 6,
//                     quizTitle: "Quiz number 6",
//                     options: [
//                         { optionId: "A", option: "options A" },
//                         { optionId: "B", option: "options B" },
//                         { optionId: "C", option: "options C" },
//                         { optionId: "D", option: "options D" }
//                     ],
//                     answer: "D"
//                 },
//                 {
//                     quizId: 7,
//                     quizTitle: "Quiz number 7",
//                     options: [
//                         { optionId: "A", option: "options A" },
//                         { optionId: "B", option: "options B" },
//                         { optionId: "C", option: "options C" },
//                         { optionId: "D", option: "options D" }
//                     ],
//                     answer: "D"
//                 },
//                 {
//                     quizId: 8,
//                     quizTitle: "Quiz number 8",
//                     options: [
//                         { optionId: "A", option: "options A" },
//                         { optionId: "B", option: "options B" },
//                         { optionId: "C", option: "options C" },
//                         { optionId: "D", option: "options D" }
//                     ],
//                     answer: "D"
//                 },
//                 {
//                     quizId: 9,
//                     quizTitle: "Quiz number 9",
//                     options: [
//                         { optionId: "A", option: "options A" },
//                         { optionId: "B", option: "options B" },
//                         { optionId: "C", option: "options C" },
//                         { optionId: "D", option: "options D" }
//                     ],
//                     answer: "D"
//                 },
//                 {
//                     quizId: 10,
//                     quizTitle: "Quiz number 10",
//                     options: [
//                         { optionId: "A", option: "options A" },
//                         { optionId: "B", option: "options B" },
//                         { optionId: "C", option: "options C" },
//                         { optionId: "D", option: "options D" }
//                     ],
//                     answer: "D"
//                 }
//             ]
//         }

//         quizModel.create(quizData).then((data) => {
//             res.status(201).json({ status: "Success", code: 201, msg: "Success insert data.", data: data});
//         }).catch((err) => {
//             console.log(err)
//             res.status(400).json({ status: 'Error', code: err.code ? err.code : 400, msg: err.code === 11000 ? 'Initial Exam data is already exist!' : 'Failed Saving Data. Please fill all required fields!' })
//         })
//     } catch (error) {
        
//     }
// }


exports.flush = async (req, res) => {
    try {
        const data = await quizModel.deleteMany({ examCode: 'AMSN_EXAM' });

        if (data.deletedCount === 0) {
            return res.status(200).json({
                status: "EMPTY_DATA",
                code: 200,
                message: "No data deleted."
            });
        } 
        
        return res.status(200).json({
            status: "Success",
            code: 200,
            message: "Flushing data success."
        });
    } catch (error) {
        console.error('Error flushing data:', error);
        return res.status(500).json({
            status: 'Error',
            code: 500,
            message: 'Failed flushing data!'
        });
    }
};

