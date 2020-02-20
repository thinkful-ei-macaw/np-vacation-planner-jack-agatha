'use strict';

const apiKey = '';
const searchURL = '';

const clickSubmit = function() {
  $('form').submit(event => {
    event.preventDefault();
    let state = $('form > select').val(); 
    let maxResult = $('#max-results').val();
  });
};

const getQueryParameters = function(params) {
  //TODO: Craft query params
};

const getNationalParks = function() {
  //TODO: Fetch national parks from API
};

const displayResults = function() {
  //TODO: Generate results HTML and add to page
};

function main() {
  clickSubmit();
}

$(main);