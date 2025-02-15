
// delete keyword is only for removing a property from an object won't work on local variables

let user = {
    name :"user",
    age :23,
}
delete user.age  //works

const func = (function (a){
    delete a;
    return a;
})(5)

console.log(func); // returns 5

// dynamically add property and value
const property = "firstName"
let value = "coder"

user = {
 [property] : value
}

// user = {...user,[property]:value}
for(key in user){
    console.log(user[key])
}


// Ques 1
const a = {}
const b = {key:"b"}
const c = {key:"c"}

a[b] = 123
a[c] = 456

console.log(a[b])
// prints 456 becuase since b and c are objects and can't be directly used as keys
// js makes them like a["[object object]"] = 123 since the key is same the value gets replaced

const data = JSON.stringify(user,["name","age"]) //now data only has values of the keys in array passed


// Ques 2
const shape = {
    radius : 10,
    diameter(){
        return this.radius*2;
    },
    perimeter : ()=>2*Math.PI*this.radius
}

console.log(shape.diameter())  // 20
console.log(shape.perimeter()) //NaN  this in arrow function points to window object

// Ques 3
user = {
    ...user,
    fullName:{
        first :"gna",
        last: "nesh"
    }
}
// destructure name
const {name : myName} = user
// to destructure in levels
const {fullName:{first}} = user
console.log(first)  // returns gna

// Ques 4
console.log({key:1} == {key:1}) //false becuase both object have different space in memory
// same thing for === as well. 

// Ques 5
let person = {name:"linda"}
const members = [person]
person = null
console.log(members)  //returns [{name:"linda"}] 

//whenever an object is assigned to a variable, it doesn't hold the object itself but only the reference
// so when person is set to null, the reference pointing to object becomes null not the object

//but to make it affect memebers
person.name = null
console.log(members)  //[{name:null}]

//objects are mutable no matter how many variables hold reference to the object each one can modify it.

// Ques 6

value = {number:10}
const multiply = (x={...value})=>{
    console.log((x.number *=2))
}

multiply() //20 it takes the default argument
multiply() //20
multiply(value) //20 now a reference is passed
multiply(value) // 40


// Shallow and deep copy

// when one object holds reference to another obj is shallow if it is completely indepenedent that is deep

//shallow
let newUser = {...user}  // using spread operator
//operations made in copied variable will not affect original except the nested properties
//When you make a shallow copy of an object or array in programming, any nested objects or arrays inside the original structure are not fully duplicated. 
//Instead, the references to those nested objects or arrays are copied.
let original = { name: "Alice", age: 25 };
let shallowCopy = { ...original };

// Modify top-level property via shallowCopy
shallowCopy.name = "Bob";

// original remains unaffected
console.log(original.name); // Output: "Alice"
console.log(shallowCopy.name);  // Output: "Bob"

// deeep
newUser = JSON.parse(JSON.stringify(user))  // using JSON
newUser = Object.assign({}, user)



