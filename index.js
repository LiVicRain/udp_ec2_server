const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const app = express();
const mongoDB = `mongodb+srv://vicrain:${process.env.SECRET_KEY_MONGO}@cluster0.bayd0eo.mongodb.net/udp-proto`;

// IMPORT FROM OTHER FILES
const authRouter = require("./routes/auth");
const noticeRouter = require("./routes/notice");

app.use(express.json());

app.use(authRouter);
app.use("/notice", noticeRouter);

// CONNECTIONS
mongoose.set("strictQuery", true); // 엄격한 유효성 검사
mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("몽고 DB 연결 성공");
  })
  .catch(err => {
    console.log(`몽고 DB 에러 발생 ${err}`);
  });

app.listen(PORT, HOST, () => {
  console.log("Server is running on port", PORT);
});
