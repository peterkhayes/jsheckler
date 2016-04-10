var fs = require('fs');

var targetPath = process.argv[2];
var target = fs.readFileSync(targetPath);

var testPath = process.argv[3];
var test = fs.readFileSync(testPath);

var makeOneReplacement = function(input) {

};



var a = "my code";

var Heckler = function(regex, replacement) {
  this.regex = regex;
  this.globalRegex = new RegExp(regex.source, "g");
  this.replacement = replacement;
};

Heckler.prototype.count = function(input) {
  return input.match(this.globalRegex);
};

Heckler.prototype.replaceAll = function(input) {
  return input.replace(this.globalRegex, this.replacement);
};

Heckler.prototype.replaceNth = function(input, n) {
  var that = this;
  return input.replace(this.globalRegex, function(match) {
    if (n-- === 0) {
      return that.replacement.apply(null, arguments);
    } else {
      return match;
    }
  });
};

var IfNegationHeckler = new Heckler(/([\n\r\s]if\s?)(\(.+\))/, "$1(!$2)");

var ArgShuffleHeckler = new Heckler(/(\()([^\)]*)(\))/, function(match, s1, s2, s3) {
    var args = s2.replace(/\s/g, "").split(",");
    var newArgs = [];
    while (args.length) {
        var idx = Math.floor(Math.random()*args.length);
        newArgs.push(args.splice(idx, 1));
    }
    return s1 + newArgs.join(",") + s3;
});

var DeleteReturnHeckler = new Heckler(/[\n\r\s]return[\n\r\s]/, "");

