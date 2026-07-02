const { parseJavaScript } = require("./jsParser");

const code = `
const express = require("express");

function login(){}

const logout = () => {};

class UserController {

    register(){}

}

module.exports = UserController;

exports.login = login;

export default UserController;

export {

    logout,

    login

};
`;

console.log(parseJavaScript(code));