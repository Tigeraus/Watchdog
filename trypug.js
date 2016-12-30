var pug = require('pug');
var compiledFunction = pug.compileFile('index.pug');


console.log(compiledFunction({
  name: 'Timothy',
  filelist: [{ name: 'test.txt', path: './test.txt' },{ name: 'test.txt', path: './test.txt' }]
}));