var memSize=1000000000;
var maxNum=40000000;
var memory=[];


//Operation Matrix for single bit
var ID=[
  [1,0],
  [0,1]
];
var NOT=[
  [0,1],
  [1,0]
];
var SET_MIN=[
  [1,1],
  [0,0]
];
var SET_MAX=[
  [0,0],
  [1,1]
];
var HADAMARD=[
  [1/Math.sqrt(2),1/Math.sqrt(2)],
  [1/Math.sqrt(2),-1/Math.sqrt(2)]
];

var SWAP=[
  [1,0,0,0],
  [0,0,1,0],
  [0,1,0,0],
  [0,0,0,1]
];


var input=[0];

var operation=HADAMARD;



var output=sample(input,operation);

console.log(input);

console.log(operation);

console.log(output);



//console.log(decode(matrixMultiplication(bigSet1,encode(0,16))));

/*
var bitwiseNot=tensorProduct(ID,tensorProduct(ID,NOT));
console.log(compose(NOT,SET_MIN));
console.log(tensorProduct(NOT,NOT));

console.log(matrixMultiplication(tensorProduct(NOT,NOT),tensorProduct(NOT,NOT)));

console.log(matrixMultiplication(NOT,NOT));

*/




/**
 * Runs a given quantum ciruit to produce an output
 * @param {*} input 
 * @param {*} ops 
 * @param {*} output 
 */

function run(input,operation){
  return decodeBits(compose(operation,encodeBits(input,operation.length)))
}

/**
 * Runs a given quantum circuit to produce sample distribution
 * @param {*} input 
 * @param {*} ops 
 * @param {*} output 
 * @param {*} n 
 */
function sample(input,operation,n){
  if(n==null){
    n=10000;
  }
  var out;
  var num=0;
  for(var i=0;i<n;i++){
    var temp=run(input,operation);
    if(temp==1){
      num++;
    }   
    if(out==null){
      out=temp;
    }else{
      for(var j=0;j<out.length;j++){
        out[j]+=temp[j];
      }
    }
  }
  return out.map(x=>x/n);
}

/**
 * COMPOSE
 * Sequence of operations
 * @param {*} f1 
 * @param {*} f2 
 */
function compose(f1,f2){
  return matrixMultiplication(f1,f2);
}

function convertToNDims(func,n){
  var temp=func;
  while(temp.length<n){
    temp=tensorProduct(ID,temp);
  }
  return temp;
}





function matrixMultiplication(m1,m2){
  var out=[];



  for(var i=0;i<m1.length;i++){//For every for of first matrix
    var outChild=[];
    for(var j=0;j<m2[0].length;j++){//For every column in the second matrix
      var sum=0;
      for(var k=0;k<m1[i].length;k++){//For every element in row in first matrix
        sum+=m1[i][k]*m2[k][j];
      }
      outChild.push(sum);
    }
    out.push(outChild);
  }
  return out;
}

/*
function outerProduct(m1,m2){
  out=[];
  for(var i=0;i<m1.length;i++){
    var tempOut=[];
    for(var j=0;j<m2.length;j++){
      tempOut.push(m1[i]*m2[j]);
    }
    out.push(tempOut);
  }
  return out;
}
*/
function outerProduct(m1,m2){
  out=[];
  for(var i=0;i<m1.length;i++){
    for(var j=0;j<m1[i].length;j++){
      var tempOut=[];
      for(var k=0;k<m2[0].length;k++){
        tempOut.push(m2[k][i]);
      }
      for(var k=0;k<m2[0].length;k++){
        tempOut.push(m2[k][i]);
      }
      console.log(m1[i][j],tempOut)
    }


  }
  return out;
}

function encodeBits(arr,size){
  var narr=arr.slice().reverse();
  return encodeNum(bitsToNum(narr),size);
}

/**
 * Read quantum bits 
 * @param {*} num 
 */
function decodeBits(num){
  var exp=Math.log(num.length)/Math.log(2);
  var temp=decodeNum(num);
  var out=[];
  
  while(temp>0){
    out.unshift(temp%2);
    temp=Math.floor(temp/2);
  }
  while(out.length<exp){
    out.unshift(0);
  }
  return out;
}

function bitsToNum(arr){
  var num=0;
  for(var i=0;i<arr.length;i++){
    num+=arr[i]*Math.pow(2,i)
  }
  return num;
}

function encodeNum(num,size){
  var out=[];
  for(var i=0;i<size;i++){
    if(i==num){
      out.push([1])
    }else{
      out.push([0]);
    }
  }
  return out;
}

function decodeNum(num){
  console.log(num);
  for(var i=0;i<num.length;i++){
    //Calculate Probability Distribution and Evalaute to 0/1
    var rand=Math.random();
    var positiveDist=Math.pow(num[i][0],2);
    if(rand<positiveDist){
      num[i][0]=1;
    }else{
      num[i][0]=0;
    }
    if(num[i][0]==1){
      return i;
    }
  }
}
/*
function encode(num,size){
  var out=[];
  for(var i=0;i<size;i++){
    if(i==num){
      out.push(1)
    }else{
      out.push(0);
    }
  }
  return out;
}

function decode(num){
  for(var i=0;i<num.length;i++){
    if(num[i]==1){
      return i;
    }
  }
}
*/


/**
 * Maps two function to higher dimension
 * @param {*} a 
 * @param {*} b 
 */
//https://rosettacode.org/wiki/Kronecker_product#JavaScript
function tensorProduct(a,b) {
  var m=a.length, n=a[0].length, p=b.length, q=b[0].length;
  var rtn=m*p, ctn=n*q; var r=new Array(rtn);
  for (var i=0; i<rtn; i++) {r[i]=new Array(ctn)
    for (var j=0;j<ctn;j++) {r[i][j]=0}
  }
  for (var i=0; i<m; i++) {
    for (var j=0; j<n; j++) {
      for (var k=0; k<p; k++) {
        for (var l=0; l<q; l++) {
          r[p*i+k][q*j+l]=a[i][j]*b[k][l];
        }}}}//all4forend
  return(r);
}
// Helper functions:
// Log title and matrix mat to console
function matl2cons(title,mat) {console.log(title); console.log(mat.join`\n`)}
// Print title to document
function pttl2doc(title) {document.write('<b>'+title+'</b><br>')}
// Print title and matrix mat to document
function matp2doc(title,mat) {
  document.write('<b>'+title+'</b>:<br>');
  for (var i=0; i < mat.length; i++) {
    document.write('&nbsp;&nbsp;'+mat[i].join(' ')+'<br>');
  }
}
