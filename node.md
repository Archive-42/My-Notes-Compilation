#### 1. Which of the following commands is used to install a new module locally?

- [] “npm install <module_name>” and it will be installed in the node_library directory
- [] “npm install <module_name> ~g" and it will be installed in the node_library directory
- [] “npm install <module_name> -local” and it will be installed in the node_modules directory
- [] “npm install <module_name>" and it will be installed in the node_modules directory

#### 2. Which file is used by npm to specify the modules used by the application?

- [] modules.json
- [] package.json
- [] install json
- [] required json

#### 3. How are modules included in Node Js?

- [] require(‘package’)
- [] include(‘package’)
- [] import(‘package)
- [] No one of the listed options is correct

#### 4. How to export a module in Node Js?

- [] Asigning the variable module.exports
- [] Asigning the variable node.exports
- [] Asigning the variable exports.node
- [] Asigning the variable exports.module

#### 5. Using Express, how are 404 http errors handled?

- [] 404 htttp error is handled automatically by Express.
- [] 404 http error are not handled by Express and should be defined as the first,
- [] 404 http error are not handled by Express and should be defined as the last handler
- [] 404 http error are not handled by Express and should be defined in any order handler at the very top of all handlers at the very bottom of all handlers among handlers

#### 6. Which of the following pieces of code is correct to serve a file to the browser from the server?

- [] var fs = require(fs'); var newFile = fs.createWritetream("readme_copy.ma'); var http = require(http’);
  http.createerver function(request, response) { request pipe(newFile); request.on(end,, function() {}); }).listen(8080);

- [] var fs = include(‘fs}); var newFile = fs.createWritetream("readme_copy.ma’); var http = include(‘http);
  http.createerver function(request, response) { request pipe(newFile); request.on(‘end,, function() {}); }).listen(8080);

- [] var fs = require(s'); var newFile = fs.createWritetream(‘readme_copy.md'); var http = require(http’);
  http.createerver function(request, response) { request pipe(newFile); request.onEvent(‘end’, function() {}); }).listen(8080);

- [] var fs = include(‘fs); var newFile = fs.createWritetream("readme_copy.md’); var http = include(‘http);
  http.createerver(function(request, response) { request pipe(newFile); request.onEvent(end’, function() {}); }).listen(8080);

#### 7. What option is true about app.render method in Express?

- [] app.render returns the rendered html of a view to the client's browser
- [] app.render uses res.render to render views
- [] app.render is similar to res.render in the sense that it renders the html of a view with the difference that it cannot receive parameters
- [] No one is correct

#### 8. Which of the following arrays contains the line command arguments?

- [] process.argv
- [] args.argy
- [] arguments.argv
- [] env.argy

#### 9. Using ModngoDb, which of the following options is correct to select elements from inventory with price lower than 2.0 and different from 1.99?

- [] db inventory.find({ price: { $ne: 1.99} }, { price: { $it: 2.0 }}))
- [] db.inventory.find( { [ { price: { $neq: 1.99 }},{ price: { $it: 2.0}}1})
- [] db.inventory.find( { and: [ { price: { $ne: 1.99 }}, { price: { it: 2.0}}]})
- [] db.inventory.find( { and: [ { price: { $neq: 1.99 } }, { price: { $It: 2.0}}]})
