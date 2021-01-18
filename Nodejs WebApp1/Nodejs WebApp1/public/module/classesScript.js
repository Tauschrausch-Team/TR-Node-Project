// Test JS-Module 

var userData = [];

function user(name, role, password) {
    var name = name;
    var role = role;
    var password = password;
}


var methods = {
	currentDate: function () {
		console.log('Current Date is: ' + new Date().toISOString().slice(0, 10));
    },
    addUser: function (name, role, password) {
        userName = new user(name, role, password);
        userData.push(userName);
        console.log('new User called:' + userName.name);
        console.log('all current user:' + userData); // output unclear?? why indefined
    }
};

exports.data = methods; // module.exports is a Node.js specific feature, it does not work with regular JavaScript