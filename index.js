var QCS = require("./quantum.js");

var random8 = QCS.create(
    QCS.combine(QCS.NOT,QCS.ID)
);

var test=random8.run([0,0]);
console.log(test);