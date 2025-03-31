//Q1 Implement a function that generates unique IDs every time it’s called.
function generateID(){
    id = 0;
    return function(){
        id++
        return id;
    }
}
let q = generateID();
q() //1
q()// 2


//Q2 memoise power function
function memoisePower(){
    res= {}
    return function power(base, exponent){
        if(exponent==0)return 1
        if(exponent ==1)return base
        let key = `${base}-${exponent}`;
        if(!res[key]){
            res[key] = base * power(base, exponent-1);
        }
        return res[key]
    }
}
q = memoisePower();
q(3,12);

//Q3. Predict the Output:
console.log("Start");

setTimeout(() => console.log("Macrotask"), 0);

Promise.resolve().then(() => console.log("Microtask 1"));

Promise.resolve().then(() => {
    console.log("Microtask 2");
    setTimeout(() => console.log("Macrotask 2"), 0);
});

console.log("End");

"start"
"end"
"microtask1"
"microtask2"
"macrotask1"
"macrotask2"

//Q5. Fix the issue in the following code
const person = {
    name: "Alice",
    greet: function() {
        console.log(`Hello, ${this.name}`);
    }
};

let sayHello = person.greet;

//ans
sayHello = person.greet.bind(person)
sayHello()

//Q6 fix this
let obj = {
    name: "Alice",
    greet: () => console.log(this.name) // ❌ this refers to global scope
};
obj.greet()

//arrow functions do not have this keyword on their own, instead they derive it from their lexical scope, that is where they're defined.

obj ={
    name:"Alice",
    greet: function(){
        let fn = ()=>console.log(this.name);
        fn();  // prints Alice becuase fn is defined inside a regular function whose this points to the obj.
    }
}

//Q7 implement polyfill for bind
Function.prototype.myBind = function(context={}, ...args){
    if(typeof this !=="function"){
        throw new Error("Not callable");
    }
    context.fn = this;
    return function(...newargs){
        return context.fn(...args,...newargs);
    }
}

//Q8 Implement a function that retries a failed fetch request up to 3 times.
function retryFetch(url, retries=3){
    return fetch(url).then(reponse=>Response.json())
                     .catch(err=>{
                        if(retries >0){
                            console.log("retrying", err);
                            return retryFetch(url, retries-1);
                        }
                        throw err;
                     })
}

//Q9 What is debounce and create a debounce 

/*Ensures a function runs only after a specific delay, resetting the timer if called again.

Useful when you want to delay execution until user input stops.
Example: Search bars, resizing windows, autocomplete suggestions.
*/
function debounce(func, delay){
    let timer;
    return function(...args){
        clearTimeout(timer)
        timer = setTimeout(()=>func.call(this,...args), delay);
    }
}

const onSearch = debounce((search)=>{
    console.log("searching -", search);
},300);


//Q10 Throttle and implementation

/*
Ensures a function runs at most once every X milliseconds.

Useful when you want to limit the rate of execution.
Example: Scroll events, button spam prevention, API rate limits.
*/

function throtlle(func, limit){
    let lastCall = 0
    return function(...args){
        if(Date.now() - lastCall >=limit){
            lastCall = Date.now();
            func.call(this, ...args);
        }
    }
}

const onScroll= throtlle(()=>{
    console.log('scrolling')
},200);

window.addEventListener('scrollend', onScroll);

//Q12 Implement a function flatten that returns a newly-created array with all sub-array elements concatenated recursively into a single level.
function flatten(value){
    return value.reduce((acc, val)=>{
            if(Array.isArray(val)){
                acc.push(...flatten(val))  // or acc.concat(flatten(val)) concat creates a new array every time
            }
            else{
                acc.push(val)
            }
            return acc;
    },[])
}

//Q13 Polyfills for array functions
Array.prototype.myMap = function(cb, thisArg){
    if(!Array.isArray(this)){
        throw new Error("Not callable");
    }
    temp = []
    for(let i =0; i<this.length; i++){
        temp.push(cb.call(thisArg, this[i], i, this));
    }
    return temp;
}

Array.prototype.myFilter = function(cb, thisArg){
    if(!Array.isArray(this)){
        throw new Error("Not callable");
    }
    temp = [];
    for(let i=0; i<this.length; i++){
        if(cb(this[i],i, this)){
            temp.push(this[i]);
        }
    }
    return temp;
}

Array.prototype.myReduce = function (callbackFn, initialValue) {
    if (!Array.isArray(this)) {
      throw new Error("Not callable");
    }
   let accumulator;
    let startIndex;
  
    if (arguments.length > 1) { 
      accumulator = initialValue;
      startIndex = 0;
    } else {
      if (this.length === 0) {
        throw new TypeError("Reduce of empty array with no initial value");
      }
      accumulator = this[0];
      startIndex = 1;
    }
  
    for (let i = startIndex; i < this.length; i++) {
      if(i in this){ //to work around sparsed arrays
              accumulator = callbackFn(accumulator, this[i], i, this);
  
      }
    }
    return accumulator;
}

//q14 curry and partial application
const multiply = (a, b, c) => a * b * c;
const multiplyBy2 = multiply.bind(null, 2);
multiplyBy2(3,6)

function curry(fn) {
    return function curried(...args) {
      if (args.length >= fn.length) {
        return fn.apply(this, args);
      }
      return (...nextArgs) => curried.apply(this, [...args, ...nextArgs]);
    };
  }

function partial(func, ...fixedArgs){
    return function(...newArgs){
        return func.call(this, ...fixedArgs, ...newArgs);
    }
}

const add = (a, b, c) => a + b + c;
const add5 = partial(add, 5);

console.log(add5(10, 15));

//Q15 implement compose
const double = x => x * 2;
const square = x => x * x;

const compose = (...fns)=>(x)=>fns.reduceRight((acc,fn)=>fn(acc),x);
const doubleThenSquare = compose(square, double);
console.log(doubleThenSquare(3));  //(3*2)^2

//Q16 Implement pipe
const pipe = (...fns)=>(x)=>fns.reduce((acc,fn)=>fn(acc),x);
const squareThenDouble = pipe(square, double);
console.log(squareThenDouble(3)); // (3²) * 2 = 18

//Q17 memoise function
const slowFunction = (num) => {
    console.log("Computing...");
    return num * 2;
  };

function memoise(fn){
    const hash = {}
    return function(...args){
        const key = JSON.stringify(args);
        if(!hash[key]){
            hash[key] = fn.call(this,...args);
        }
        return hash[key];
    }
}

//Q18 deep clone
function deepClone(obj){
    return JSON.parse(JSON.stringify(obj));
    //Object.assign({},obj)
}

//Q19 implement once
function once(fn){
    let called = false;
    return function(...args){
        if(!called){
            fn.call(this, ...args);
            called = true;
        }
    }
}

//Q20 Write a function composeInfinite that allows infinite function composition.

const addOne = x => x + 1;
function composeInfinite(value){
    return function next(fn){
        if(typeof fn !== 'function'){
            return value;
        }
        return composeInfinite(fn(value));
    }
}
const result = composeInfinite(5)(addOne)(double)(addOne)(); //13

//Q21 Dynamic partial application
function partial2(func, ...fixedArgs){
    return function curried(...newArgs){
        if(newArgs.length + fixedArgs.length >=func.length)
        { 
            return func.call(this, ...fixedArgs, ...newArgs);
        }
        return (...nextArgs)=>curried.call(this,...fixedArgs, ...newArgs,...nextArgs);
    }
}

//Q22 Use generator function to make function lazy
function lazyFun(items, funMap){
    return function* generator(){
        for(const item of item){
            yield funMap(item);
        }
    }
}

const nums = [1, 2, 3, 4, 5];

const iterator = lazyMap(nums, double);

console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 4

//Q23 Promise output
Promise.reject("Error!")
  .then((x) => x + 1)
  .catch((err) => err + " handled")
  .catch((err) => "New Error")
  .then(console.log);

  //10 .then(console.log -> .then(x=>console.log(x))


// Q24 promise polyfills

//Promise.all
function PromiseAll(promises){
    return new Promise((resolve, reject)=>{
        const result = [];
        let completed = 0;

        if(promises.length===0){
            resolve(result);
        }

        promises.forEach((promise,index) => {
            Promise.resolve(promise)
                .then(res=>{
                    completed++;
                    result[index] = res;

                    if(completed === promises.length){
                        resolve(result);
                    }
                })
                .catch(reject);
        });
    })
}

//Promise.allSettled -> waits till all promise settle and then return values for each.
function PromiseAllSettled(promises){
    return new Promise((resolve, reject)=>{
        const result = [];
        let completed = 0;

        if(promises.length===0){
            resolve(result);
        }

        promises.forEach((promise,index) => {
            Promise.resolve(promise)
                .then(res=>{
                    result[index] = {status:'fullfilled'};

                })
                .catch(err=>{
                    result[index] = {status:'rejected'}
                })
                .finally(()=>{
                    completed++;
                    if(completed === promises.length){
                        resolve(result)
                    }
                })
        });
    })
}

//Promise.race  returns the first promise that's resolved or rejected
function myPromiseRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            Promise.resolve(promise).then(resolve).catch(reject);
        });
    });
}

//Q23 make drag event handler
element.addEventListener("mousedown", (event) => {
    function moveAt(x, y) {
        element.style.left = x + "px";
        element.style.top = y + "px";
    }
    moveAt(event.pageX, event.pageY);
    document.addEventListener("mousemove", onMouseMove);
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }
    document.addEventListener("mouseup", () => document.removeEventListener("mousemove", onMouseMove));
});


//Q25  Deep Merge Two Objects
const obj1 = { a: 1, b: { c: 2, d: 3 } };
const obj2 = { b: { c: 10, e: 4 }, f: 5 };
function deepMerge(obj1, obj2){
    if(typeof obj1 !=='object' || !obj1){
        return obj1;
    }
    if(typeof obj2 !=='object' || !obj2){
        return obj2;
    }

    const merged = {...obj1};
    for(let key in obj2){
        if(typeof obj2[key] === 'object' && obj1.hasOwnProperty(key) && typeof obj1[key] ==='object'){
            merged[key] = deepMerge(obj1[key], obj2[key]);
        }
        else{
            merged[key] = obj2[key];
        }
    }

    return merged;

}

//Q26 Deep Find Key in Object
const data = { a: { b: { c: { d: 42 } } }, x: { c: 100 } };
function deepFind(data, i){
    if(typeof data !=='object' || !data){
        return data;
    }

    for(let key in data){
        if(key ===i){
            return data[key]
        }
        if(typeof data[key] ==='object'){
            return deepFind(data[key],i);
        }
    }
    return {}

}

//Q27 Flatten a Nested Object
const input = { a: 1, b: { c: 2, d: { e: 3 } } };
function flattenObject(input, prefix=''){
    let result = {}
    for(let key in input){
        let newKey = prefix?`${prefix}.${key}`:key;
        if(typeof input[key] ==='object')
        {
            Object.assign(result,flattenObject(input[key], newKey));
        }
        else{
            result[newKey] = input[key];
        }
    }
    return result;

}

//Q28 Deep Freeze an Object
const ob = { a: { b: { c: 42 } } };
function deepFreeze(obj){
    if(typeof obj !=='object' || !obj){
        return;
    }

    Object.freeze(obj);
    Object.keys(obj).forEach((key)=>{
        if(typeof obj[key] ==='object'){
            deepFreeze(obj[key])
        }
    });
    return obj;
}
deepFreeze(ob);
ob.a.b.c = 100; // Should not change the value
console.log(ob.a.b.c);

//Q29 Deep Map Keys
obj = { FirstName: "John", LastName: "Doe", address: { ZipCode: 12345 } };
function deepMapKeys(obj,func){
    return Object.keys(obj).reduce((acc,key)=>{
        const newKey = func(key);
        acc[newKey] = obj[key];
        return acc;
    },{})
}
console.log(deepMapKeys(obj, key => key.toLowerCase()));
// Expected: { firstname: "John", lastname: "Doe", address: { zipcode: 12345 } }
