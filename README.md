# Quantum Circuit Simulator
Simulates quantum circuits using probability distributions and matrices.
Easy to use interface to construct quantum algorithms and easily run results.
Allows for sampling of distributions of a given circuit in addition to single runs.

## Examples
### Random Dice Roll
```
var QCS = require("./quantum.js");

var random8 = QCS.create([
    [QCS.HADAMARD,QCS.HADAMARD,QCS.HADAMARD]
]);

var result=random8.run(0);
console.log(result);//0-8
```

### Entangled Bell State
```
var QCS = require("./quantum.js");

var bellState = QCS.create([
    [QCS.HADAMARD,QCS.ID],//Layer 1
    [QCS.CNOT]//Layer 2
]);

var res=bellState.sample([0,0]);
console.log(res);//Output will be either |00> or |11> (entaglement). 
```
