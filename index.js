'use strict';

const apiKey = 'GPqAUm61aeHC88sAySEBgcBVbh1S4QgITnGftGLN';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

const clickSubmit = function() {
  $('form').submit(event => {
    event.preventDefault();
    let state = $('form > select').val(); 
    let maxResult = $('#max-results').val();
    getNationalParks(state, maxResult);
  });
};

const formatQueryParameters = function(params) {
  //TODO: Craft query params
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
};

const getNationalParks = function(query, maxResult=10) {
  //TODO: Fetch national parks from API
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResult,
  };
  const queryString = formatQueryParameters(params);
  const url = searchURL + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Mistakes have been made: ${err.message}`);
    })
};

const displayResults = function(responseJson) {
  //TODO: Generate results HTML and add to page
  console.log(responseJson);
  $('#js-search-results').empty();
  for (let i = 0; i < responseJson.items.length; i++){
    $('js-search-results').append(
        `<li><h2>${responseJson.items[i].}`
    )
  }
};

function main() {
  clickSubmit();
}

$(main);