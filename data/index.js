  
require('dotenv').config()

const path = require('path')
const express = require('express')

const server = require('./api/server')

const port = process.env.PORT


server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
