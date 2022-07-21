const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, '../db/users.json');
const readJsonFile = (path) => {
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

const User = {
    getData: function () {
        return readJsonFile(usersFilePath);
    },

    findAll: function (userData) {
        return this.getData();
    },

    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1
        }
        return 1;
    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user.id == id);
        return userFound;
    },

    findByFile: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user[field] == text);
        return userFound;
    },

    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(allUsers, null, 2));
        return newUser;
    },

    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(user => user.id !== id)
        fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, 2));
    }
}

module.exports = User;

