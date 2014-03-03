var argv = require('yargs')
    .usage('Usage: gifs [caption] [url/path] <- Uploads image and saves as caption\n       gifs [caption]            <- Returns the URL for that caption')
    .demand(1)
    .argv;

var upload = require('./upload')
  , store = require('./store')
  , clipboard = require('./clipboard');

if (argv._.length == 1) {
  var caption = argv._[0];
  if (store.get(caption) != null) {
    clipboard.save(store.get(caption));
    console.log('Found ' + caption + ': copied ' + store.get(caption) + ' to your clipboard');
  } else {
    console.log('Oops. I don\'t know anything about: ' + caption);
  }
} else if (argv._.length == 2) {
  var caption = argv._[0];
  var image = argv._[1];

  upload(image, function(err, imgur_url) {
    store.set(caption, imgur_url);
    clipboard.save(imgur_url);
    console.log('Saved ' + caption + ' as ' + imgur_url);
    console.log('I even copied it to your clipboard');
  });
}

