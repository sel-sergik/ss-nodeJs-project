'use strict';

module.exports = {
    searchCities: searchCities,
    addCity: addCity,
    updateCity: updateCity,
    deleteCity: deleteCity
};

function searchCities(req, res) {
    res.json('Returns the list of cities');
}

function addCity(req, res) {
    res.json('Adds an city to the system');
}

function updateCity(req, res) {
    res.json('Update or create a city');
}

function deleteCity(req, res) {
    res.json('Delete a city');
}
