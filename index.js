var QCS = require("./quantum.js");

var bellState = QCS.create([
    [QCS.HADAMARD,QCS.ID],//Layer 1
    [QCS.CNOT]//Layer 2
]);

var res=bellState.sample([0,0]);
console.log(res);//Output will be either |00> or |11> (entaglement).