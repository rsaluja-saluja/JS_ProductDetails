
let arr = ["abc","zyx","rajni","saluja"];
console.log(arr.indexOf('rajni'));
arr.splice(2,1);
console.log(arr);

let arr1 = [{name:'rajni',age:30},
{name:'akshaj',age:9},
{name:'kamal',age:32}];
console.log(arr1.findIndex((val) => val.name == 'akshaj'));
arr1[1] = {name:'akshaj',age:8};
console.log(arr1);
