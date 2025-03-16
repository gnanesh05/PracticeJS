//Ques 1 -  Call?

var obj = {name : "gnanesh"}

function sayName(age){
 console.log("hello ", this.name, age);
}

sayName() //-> hello because this points to the parent of the function which is the window and there's no such object called name.

sayName.call(obj); //-> hello gnanesh now obj is used as the current object 
// can pass args also sayName.call(obj,age)


// Ques 2 - Apply

//similar to call but pass the args in array
sayName.apply(obj,[23])


// Ques 3 - Bind

//similar to call but returns a function which we can call later

let func = sayName.bind(obj)
func(24);


// Ques 4 
const age = 10
var person = {
    name:"gnanesh",
    age:23,
    getAge:function(){
        return this.age;
    }
}

var person1 = {age:34};
console.log(person.getAge()) //23
console.log(person.getAge.call(person1))  //34


// Ques 5
var status = "smile"
setTimeout(()=>{
    const status = "rock"
    const data = {
        status:"cool",
        getStatus(){
            return this.status
        }
    }

    console.log(data.getStatus()) // cool
    console.log(data.getStatus.call(this)) //smile  this never points to a function but to the context of the function that is window here

},0)

// Ques 6
const animals =[
    {name:"animal1", species:"species1"},
    {name:"animal2", species:"species2"}
];

function print(i){
    console.log(i, this.name, this.species)
}

for(let i=0; i<animals.length; i++){
    print.call(animals[i],i)
}

// Ques 7 append arr2 to arr1 without looping or concat
let arr1 = [1,2]
let arr2 = [3,4,5]

arr1.push.apply(arr1,arr2) // not call because the args need to be passed separately



// Ques 8 improve inbuilt functions
// max min
console.log(Math.max.apply(null,arr1)) // 5


//Ques 9
function g(){
    console.log(this)
}

let user = {
    f : g.bind(null)
}

user.f()  //Without strict mode, this bound to null defaults to the global object (window in browsers)


// Ques 10 bind chaining
function f(){
    console.log(this.name)
}
f = f.bind({name:"gnanesh"}).bind({name:"xyz"})
f() // gnanesh because there's no bind chaining. once binded the context stays


// Ques 11 polyfill

let car={
    color:"red",
    name:"ferrari"
}

function purchaseCar(currency,price){
    console.log(`I purchased the ${this.color} ${this.name} for ${currency}. ${price}`)
}

purchaseCar.call(car,"$", 500000);

// call polyfill
Function.prototype.myCall = function(context={},...args){
    if(typeof this !== "function"){
        throw new Error("this is not callable")
    }
    context.fn = this  //the function that's calling myCall
    context.fn(...args)
}

purchaseCar.myCall(car,"$", 500000)

// apply polyfill
Function.prototype.myApply = function(context={},args){
    if(typeof this !== "function"){
        throw new Error("this is not callable")
    }
    if(!Array.isArray(args)){
        throw new Error("arguments need to be passed in as an array")
    }
    context.fn = this  //the function that's calling myCall
    context.fn(...args)
}

purchaseCar.myApply(car,["$", 500000]);

// bind polyfill
Function.prototype.myBind = function(context={}, ...args){
    if(typeof this !== "function"){
        throw new Error("this is not callable")
    }
    context.fn = this

    return function(...newargs){
        return context.fn(...newargs, ...args)
    } 
}
const newFunc = purchaseCar.myBind(car,"$", 500000);
console.log(newFunc())


// 
const obj = { name: "Eve" };

function greet() {
    return () => {
        console.log("Hello, " + this.name);
    };
}

const arrowFunc = greet.call(obj);
arrowFunc(); // ❓ undefined the arrow function takes this from where greet() was originally defined, not where it was called.

