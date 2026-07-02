const { parseJavaScript } = require("./jsParser");

const code = `
const express = require("express");
const mongoose = require("mongoose");

import axios from "axios";

function hello(){}

module.exports = {};
`;

console.log(parseJavaScript(code));