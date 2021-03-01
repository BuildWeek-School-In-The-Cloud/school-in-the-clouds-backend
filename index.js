require("dotenv").config();

const server = require("./api/server");
// const port = process.env.PORT || 5000;

server.listen(2000, () => {
  console.log(`Server running on port: ${2000}`);
});
