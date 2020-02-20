

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
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
};

const getNationalParks = function(query, maxResult=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResult,
    fields: 'addresses',
  };

  const queryString = formatQueryParameters(params);
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.js-search-results').prepend(
        `
      <li>Mistakes have been made: ${err.message}</li>
      `);
    });
};

const displayResults = function(responseJson) {
  const { data } = responseJson;
  $('.js-search-results').empty();
  for (let i = 0; i < data.length; i++){
    try {
      let { name, description, url, addresses } = data[i];
      let { postalCode, city, stateCode, line1 } = addresses[1];
      $('.js-search-results').append(
        `
    <li>
    <h2>${name}</h2>
    <address>${line1}<br>${city},${stateCode} ${postalCode}</address>
    <a href="${url}">Click here for more info</a>
    <p>${description}</p>
    </li>
   `
      );
    } catch(e) {
      console.log('Item was skipped for now due to no physical address');
    }
  }
};

function main() {
  clickSubmit();
}

$(main);