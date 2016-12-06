var redux = require('redux');
var createLogger = require('redux-logger');
var reducer = require('./reducer');
var socket = require('socket.io-client')('http://localhost:8080');

var logger = createLogger();

var store = redux.createStore(reducer, redux.applyMiddleware(logger));

//var renderVote = require('renderVote');
//var renderResults = require('renderResults');
//
//store.subscribe(function () {
//	renderVote();
//	renderResults();
//});

function listen() {
	socket.on('state', function(state){
		store.dispatch({
			type:'SET_STATE',
			state : state
		});
	});
}

module.exports = {
	listen:listen,
	store:store
};