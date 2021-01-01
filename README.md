# matrixey
Programming Language Built Entirely out of Matrix Multiplication WIP


## Examples
Random Dice Roll
```
var circuit=createCircuit([
  [HADAMARD,HADAMARD,HADAMARD];//Layer 1
]);

var input=0;//3 input bits set to 0

var output=run(input,circuit);

console.log(output);//Output will be three random bits converted to integer 0-6
```
