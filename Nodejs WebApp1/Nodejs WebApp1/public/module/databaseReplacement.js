// Database Replacement

var userData = []; // warum immer doppelte Objects ??

function user(first_name, last_name, role, password) {
    var first_name = first_name;
    var last_name = last_name;
    var password = password;
    var role = role;
    var status = false; // even usefull to have a status property??
}

var methods = {
    
    addUser: function (first_name, last_name, role, password) {
        userData.push(new user(first_name, first_name, role, password));
        // console.log(user.__proto__); // cannot return object data 
        console.log('added new User called:' + first_name + last_name);
    },
    giveUser: function () {
        console.log('all current user:' + userData[0]);
    },
    returnhUser: function (first_name, last_name, password) {
        while (true) {
            // search in userData object with values (first_name, ...)
        };
    },
    // even usefull to have a status property??
    setOnline: function () {

    }
};

exports.data = methods; // module.exports is a Node.js specific feature