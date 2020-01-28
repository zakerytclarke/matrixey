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
var SWAP01=[
  [0,1],
  [1,0]
];

var bitwiseNot=tensorProduct(ID,tensorProduct(ID,ID));

console.log(bitwiseNot);

var input=[0,0,0,0,0,0,0,0];

var operation=bitwiseNot;

var output=decodeBits(compose(operation,encodeBits(input,operation.length)));

console.log(input);

console.log(encodeBits(input,operation.length));
console.log(matrixMultiplication(operation,encodeBits(input,operation.length)));

console.log(output);

//console.log(decode(matrixMultiplication(bigSet1,encode(0,16))));

/*
console.log(compose(NOT,SET_MIN));
console.log(tensorProduct(NOT,NOT));

console.log(matrixMultiplication(tensorProduct(NOT,NOT),tensorProduct(NOT,NOT)));

console.log(matrixMultiplication(NOT,NOT));

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
  var out=[];
  for(var i=0;i<size;i++){
    if(arr[i]&&arr[i]==1){
      out.push([0])
      out.push([1])
    }else{
      out.push([1])
      out.push([0]);
    }
  }
  return out;
}

function decodeBits(num){
  var out=[];
  for(var i=0;i<num.length;i+=2){
    if(num[i][0]==1){
      out.push(0);
    }else{
      out.push(1);
    }
  }
  return out;
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
  for(var i=0;i<num.length;i++){
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