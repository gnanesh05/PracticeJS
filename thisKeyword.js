this.a = 5
console.log(this.a) //5

 function getA(){
    console.log(this.a) //5 as we still refer the window object
 }

 let user = {
    name : "heee",
    getName(){
        console.log(this.name)
    },
    childObj : {
        name2:"haaa",
        getName2(){
            console.log(this.name , this.name2)
        }
    },
    getDetails:()=>console.log(this.name), // " " no parent function so this refers to window obj
    getDetails2(){
        const nestFunc = ()=>console.log(this.name)
        nestFunc() //heee because this refers to what function's this refers to i.e user obj.
    }
 }

 user.getName() //hee
 user.childObj.getName2()  // undefined , haaa  because it is inside another obj and this refers to nearest obj

 /// this inside arrow function always takes the parent function


// implicit binding

// Regular functions (function) take this from the object that called them.
// Arrow functions (=>) take this from their lexical scope (where they were defined).

const obj1 = {
    name: "Alice",
    method() {
        const arrowFn = () => {
            console.log(this.name);
        };
        arrowFn();
    }
};

obj.method(); // Alice ✅

const obj3 = {
    name: "Alice",
    method() {
        function regularFn() {
            console.log(this.name);
        }
        regularFn();
    }
};

obj.method();  //undefined because regular function regularFn() is called as standalone function with no explicit object
// to ffix this use obj3.regularFn() or regularFn.bind(this)()
//q1
user = {
    firstName:"hello",
    getName(){
        const firstName = "there"
        return this.firstName
    }
}
console.log(user.getName())  // hello

//Q2
function makeUser(){
    return {
        name:"thhh",
        ref : this
    }
}
let obj = makeUser()
console.log(obj.ref.name)  //no output because this keyword there refers to window object

// to make it refer to the name

// return{
//     name : "thh",
//     ref(){
//         return this;  // this will point to the parent function
//     }
// }
// console.log(obj.ref().name)   // thhh


// Q3
user = {
    name : "gnanesh",
    logMessage(){
        console.log(this.name)
    }
}
setTimeout(user.logMessage, 1000); // prints nothing because logmessage func is passed as a callback and now its independent
// of user obj so this refers to window
// to make it work

setTimeout(()=>{
    user.logMessage()  // prints name every second
},1000);

// Q4
var length = 4

function callback(){
    console.log(this.length);
}

let object={
length:5,
method(fn){
    fn();
}
}

object.method(callback)   // 4

object={
    length:5,
    method(){
       arguments[0]()  // arguments is array with all parameters passes -> [callback,2,3]
    }
    }

object.method(callback,2,3)  //3 here the callback function's this refers to the array(object) and prints its length


// Q5
// implement calc.add(10).multiply(5).subtract(10).add(5)

const calc = {
total:0,
add(a){
    this.total +=a
    return this
},
multiply(a){
    this.total *=a
    return this
},
subtract(a){
    this.total -=a
    return this
}

}

const result = calc.add(10).multiply(5).subtract(10).add(5)
console.log(result)

function outer() {
    let count = 0;
    return function() {
        console.log(this.name, ++count); // `this` is runtime-bound, `count` is lexical
    };
}

const obj2 = { name: "Hero" };
const counter = outer();
counter.call(obj2); // Output: "Hero 1"
counter.call(obj2); // Output: "Hero 2"

const a = function(){
    console.log(this);  //a is invoked as standalone func so this refers to global
  
    const b = {
      func1: function(){  
        console.log(this);  //regular function refers to the obj the function is a property of, so b.
      }  
    }
  
    const c = {
      func2: ()=>{
        console.log(this); //Arrow functions do not have their own this; instead, they inherit the this value from their lexical scope.
      }                     // since func2 is declared inside a, it inherits this from a. so window.
    }
  
    b.func1();
    c.func2();
  }
  
  a();

  // ques 
  const b = {
    name: "Vivek",
    f: function () {
        var self = this; // Reference to the `b` object
        console.log(this.name); // Logs "Vivek"
        (function () {
            console.log(this.name); // `this` is global or undefined becuase inner funtions or iife doesn't automatically inherit this
                                    //this depends on how a function is called.
            console.log(self.name); // `self` is a reference to `b`, logs "Vivek"
        })();
    }
};
b.f();

// to make this.name work inside iife use find
// (function(){

// }.bind(b))
// or make the iife use arrow function since they use the this of their lexical scope here it points to obj b
// (()=>{

// })()


// ques
var x = 23;

(function(){
  var x = 43;
  (function random(){
    x++;
    console.log(x);
    var x = 21;
  })();
})(); 

//->Nan
//rewriting the random function
function random(){
    var x;
    x++
    console.log(x)  //since in the functional scope x is decalred it is getting hoisted to top. but
                    // if instead of var x = 21, it was x=21 output will be 43
    x=21
}

//Q
const obj4 = {
    name: "Alice",
    method() {
        const fn = function () {
            console.log(this.name);
        };

        return fn;
    }
};

const fnRef = obj.method();
fnRef(); // ❓  //undefined
//fnref holds reference to fn but fnref is called as standalone function. 
// to fix use bind function(){console.log(this.name)}.bind(this)  or use arrow function


