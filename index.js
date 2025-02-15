
//1 var let const
var a = 5;
{
    console.log(a)
}
// shadowing
function test (){
    let a = "Hello";

    if(true){
        let a  = "hi"
        console.log(a)
    }
    console.log(a)
}
// returns "hi" then "hello" 2nd a shadows first a and it is possible to shadow a var with let but not other way aroubd

//2 hoisting
 console.log(count)
 var count = 1

 // if it is executed it'll say undefined 
 // this happens in backend
 var count;
 console.log(count)
 count = 1

 //ex
 var x = 21
 function some(){
    console.log(x)
    var x = 20
 }

 // output is still undefined we'll never look for global scope the same variable is initialised in local scope when the local scope is
 // in js execution context we're going to hoist the local x

// 3 IIFE - immediately invoked function expressions

(function square(num){
    return num * num;
})(5)

//ex
(function(x){
    return (function(y){
        return x
    })(5)
})(2)

//it will return 2 as the inner function has access to the outer function x and no x is declared in inner function so it'll pick 2.

// 4 Spread vs Rest

function multiply(...nums)   //this is rest
{   
    console.log(nums)
}

var arr = [5,6]
multiply(...arr) //spread

//ex
//  const fn = (x,y,...numbers,z)=>{
//     console.log(x,y,z,numbers)
//  }
//  fn(4,5,6,7,8,9)

 // this is will throw error because rest params are supposed to be last.

 const fn1 = (x,y,z,...numbers)=>{
    console.log(x,y,z,numbers)
 }
 //output - 4,5,6, [7,8,9]


 // 5 arrow functions
 let user = {
    username: "User1",
    rc1: ()=>{
        console.log('user is ', this.username)
    },
    rc2(){
        console.log('user is ', this.username)

    }
 }
 user.rc1() // username is undefined as the this is limited to local scope of that arrow function
 user.rc2() // username is user1 as the this refers to the global scope

 // 6 closures

 function subscribe(){
    var name = "hello";
    function display(){
        console.log(name);
    }
    display();
 }

 subscribe();

 //this will output hello as the display function becomes a closure and access the variable from outer scope.

 // ex 1
 function createBase(num){
    function addSix(num2){
        console.log(num+num2);
    }
    return addSix;
 }

 var addSix = createBase(6)
addSix(10)
addSix(21)

// ex 2
function find(index){
 let a = []
 for (let i =0; i<100000; i++){
    a[i] = i*i;
 }
 return a[index];
}

find(10)
find(50) // computation time keeps increasing only and in the find fn we're doing a heavy reputative task

//modify find in a way that heavy task is done once
function find(){
    let a = []
    for (let i =0; i<100000; i++){
       a[i] = i*i;
    }
    function findIndex(index){
        return a[index];
    }
    return findIndex;
   
}

var closureFn = find()
closureFn(60)
closureFn(2000)   //less time taking 

//ex 3 about scopes
function a(){
    for(var i=0; i<3; i++){
        setTimeout(function log(){
            console.log(i)
        },i*1000)
    }
}

a();
//we expect it to output 0,1,2 afer said time but actually prints 3,3,3
// var is function scoped not block scope and setTimeout will run once remaining code runs.
// so result is 3,3,3

// to make it 0,1,2 use let instead of var as let is block scope and every interation builds a block space.
// but if var has it be used we'll make a closure function

function a(){
    for(var i=0; i<3; i++){
        function inner(i){
            setTimeout(function log(){
                console.log(i)
            },i*1000)
        }

        inner(i);
    }
}
// now closure function has it own scope and it references the param passed to it.

// 4 creating private counter
function counter(){
    var _count = 0;

    function add(value){
        _count +=value;
    }

    function retrive(){
        console.log(_count);
    }

    return {add, retrive};
}

const c = counter();
c.add(10)
c.retrive();


// 5 module pattern is a design pattern used for improving the maintainability and reusability of the code by creating public and private access levels. 
var module = (function(){
 function privateMethod(){
    console.log('private');
 }

 return{
    publicMethod:function(){
        console.log('public method');
    },
    callPrivate:function(){
       privateMethod();
    }
 }
})()

module.publicMethod()  //prints public method
module.privateMethod()  //throws error


// 6 make it run only once

function subscribe(){
    console.log("Subscribed")
}

function subscribe(){
    let called = 0;

    function makeSubscription(){
        if(called>=1){
            console.log('already subscribed')
        }
        else{
            console.log('Subscribed');
            called+=1
        }
    }
    return makeSubscription;
}

const makeSubscription = subscribe();
makeSubscription();
makeSubscription();
makeSubscription();

//7 implement caching

function clumsyProduct(num1, num2){
  for(let i=0; i<100000; i++){}

  return num1*num2;
}
// this function will always compute the product even for the same args passed so we memoize it using closures

console.time("first time")
console.log(clumsyProduct(23,24))
console.time("second call")
console.log(clumsyProduct())
function memoize(fn, context){
    const res = {}
    return function(...args){
        let argsCache = JSON.stringify(args);
        if(! res[argsCache]){
            res[argsCache] = fn.call(context || this, ...args);
        }
        return res[argsCache];
    }
}

const memoizedClumsyProduct = memoize(clumsyProduct);
console.time("first call")
console.log(memoizedClumsyProduct(23,24));
console.time("second call")
console.log(memoizedClumsyProduct(23,24))


// currying
function f(a){
    return function(b){
        return `${a} ${b}`;
    }
}

console.log(f(5)(6))  //translating functions from b = f(5) then b(6)

function evaluate(operation){
    return function(num1){
        return function(num2){
            switch(operation){
                case 'add':
                    return num1+num2;
                case 'sub':
                    return num1-num2;
                case 'multiply':
                    return num1*num2;
                case 'div':
                    return num1/num2;
                default:
                    return '';
            }
        }
    }
}
console.log(evaluate("add")(6)(2))
const multiply = evaluate("multiply")
console.log(multiply(5)(6));

// infinite currying
function add(a){
    return function(b){
        if(b){
            return add(a+b);
        }
        return a;
    }
}

// now we can do infite currying until we pass value as argument
add(2)(4)(5)() //->11
add(2)(4)(5)(6) // ->17 

