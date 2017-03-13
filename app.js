// ----
// DATA
// ----

var jokes = window.localStorage.getItem('jokes')
jokes = JSON.parse(jokes)

if (!jokes) {
  // A couple jokes to start with
  jokes = {
    'the horse': {
      setup: 'A horse walks into the bar. The bartender asks...',
      punchline: 'Why the long face?'
    },
    'Orion\'s pants': {
      setup: 'How does Orion keep his pants up?',
      punchline: 'With an asteroid belt.'
    }
  }
}
var stringifiedJokes = JSON.stringify(jokes)
window.localStorage.setItem('jokes', stringifiedJokes)

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  if (jokes[requestedJokeKey]) {
    jokeBox.innerHTML =
      '<p>' + jokes[requestedJokeKey].setup + '</p>' +
      '<p>' + jokes[requestedJokeKey].punchline + '</p>'
  } else {
    jokeBox.textContent = 'No matching joke found.'
  }
}

// Function to add jokes to the joke list
var addJokeButton = document.getElementById('add-joke-btn')
var addJoke = function () {
  var addAbout = document.getElementById('add-about').value
  var addSetup = document.getElementById('add-setup').value
  var addPunchline = document.getElementById('add-punchline').value

  jokes[addAbout] = {
    setup: addSetup,
    punchline: addPunchline
  }
  stringifiedJokes = JSON.stringify(jokes)

  window.localStorage.setItem('jokes', stringifiedJokes)
  updatePage()
}

// Function to delete jokes stored in joke list
var deleteJokeButton = document.getElementById('delete-joke-btn')
var deleteJoke = function () {
  var deleteinput = document.getElementById('delete-joke-input').value

  delete jokes[deleteinput]

  stringifiedJokes = JSON.stringify(jokes)

  window.localStorage.setItem('jokes', stringifiedJokes)
  updatePage()
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
addJokeButton.addEventListener('click', addJoke)
deleteJokeButton.addEventListener('click', deleteJoke)
