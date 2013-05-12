// npm packages
var routes = require('routes');

var Router = routes.Router;
var Route = routes.Route;
var router = new Router();

module.exports = router

// static stuff serves out of the static folder.
var static = require('./routes/static.js');
router.addRoute('/static/*?', static);
router.addRoute('/favicon.ico', static);

router.addRoute('/', require('./routes/index.js'));
