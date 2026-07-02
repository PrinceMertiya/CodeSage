const { parseJavaScript } = require("./jsParser");

const code = `
const express = require("express");

class UserController {

}

class AuthService {

}

function login(){}

const logout = () => {};
`;

console.log(parseJavaScript(code));