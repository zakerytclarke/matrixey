# Quantum Circuit Simulator
Simulates quantum circuits using probability distributions and matrices.
Easy to use interface to construct quantum algorithms and easily run results.
Allows for sampling of distributions of a given circuit in addition to single runs.

## Examples
### Random Dice Roll
```
var circuit=createCircuit([
  [HADAMARD,HADAMARD,HADAMARD];//Layer 1
]);

var input=0;//3 input bits set to 0

var output=run(input,circuit);

console.log(output);//Output will be three random bits converted to integer 0-6
```

### Entangled Bell State
```
var circuit=createCircuit([
  [HADAMARD,ID];//Layer 1
  [CNOT];//Layer 2
]);

var input=[0,0];//

var output=run(input,circuit);

console.log(output);//Output will be either |00> or |11> (entaglement) 
```
