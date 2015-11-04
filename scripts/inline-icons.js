var fs = require('fs');
var path = require('path');
var parser = require('xml2json');
var omit = require('lodash.omit');


console.log('HERE!');
var inlineIcons = function(striteType){
  var inputPath = path.join(__dirname,'..','node_modules','@salesforce-ux','icons','dist','salesforce-lightning-design-system-icons',striteType+'-sprite','svg','symbols.svg');

  var text = fs.readFileSync(inputPath,'utf8');

  var content = [
  "/*\
  Copyright (c) 2015, salesforce.com, inc. All rights reserved.\
  \
  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:\
  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.\
  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.\
  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.\
  \
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\
  */",
  "module.exports = {",
  ];

  var sprite = JSON.parse(parser.toJson(text));

  var icons = [];
  var viewbox;
  sprite.svg.symbol.forEach(function(symbol){
    if(symbol.id === 'lead'){
      console.log(symbol);
    }
    var data = omit(symbol, ['id','viewBox']);
    content.push(symbol.id+':'+JSON.stringify(data)+',');
    viewBox = symbol.viewBox;
  });
  content.push('};');
  content.push("module.exports.viewBox = '"+viewBox+"';");


  var outputPath = path.join(__dirname,'..','components','SLDSUtilityIcon','SVG','slds-icons-'+striteType+'.jsx');

  fs.writeFile(outputPath, content.join('\n'), function (err) {
    if (err) return console.log(err);
  });
};

inlineIcons('utility');
inlineIcons('action');
inlineIcons('custom');
inlineIcons('doctype');
inlineIcons('standard');