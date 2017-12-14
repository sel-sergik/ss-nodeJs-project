'use strict';

module.exports = {
    searchUsers: searchUsers
};

function searchUsers(req, res) {
    res.json('Returns the list of users');
}
