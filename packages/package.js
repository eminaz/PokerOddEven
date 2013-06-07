
Package.describe({
    summary: "evaluate poker hand"
});

Npm.depends({
  'poker-evaluator': '0.0.4'
}); 

Package.on_use(function (api) { 
  api.add_files('./poker-evaluator.js', 'server');
});