const { newAnswer, getAnswerByQuestId } = require("./answer.service");
//This line imports two functions newAnswer and getAnswerByQuestId from the ./answer.service module.
module.exports = {
  newAnswer: (req, res) => {
    const { question_id, answer } = req.body;
    //Inside this function, it extracts the question_id and answer from the request body. Then, it checks if both fields have been provided. If not, it returns a 400 status code with a JSON message indicating that not all fields have been provided.
    //validation
    if (!question_id || !answer)
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });

    //sending data to profile with the user_id included in req.body
    newAnswer(req, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({
        msg: "New Answer added successfully",
        data: results,
      });
    });
  },
  getAnswerByQuestId: (req, res) => {
    getAnswerByQuestId(req.query.question_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
};
