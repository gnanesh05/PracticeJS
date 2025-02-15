
// make the following console statement to work
 console.log('start')
 function importantAction(username){
    setTimeout(()=>{
        return `Hi there!, ${username}`
    },1000)
 };

 let message = importantAction("gnanesh");
 console.log(message)  //prints undefined
 console.log("end");

 // to make it wrk use callback func

 function importantActionNew(username,cb){
    setTimeout(() => {
        cb(`Hi there!, ${username}`)
    }, 1000);
 }

 importantActionNew("gnanesh",function(message){
    console.log(message)
 })

 console.log("end");



 //Both callbacks and promises are mechanisms to handle asynchronous operations in JavaScript, such as fetching data, reading files, or setting timeouts. However,
 //  they differ significantly in how they are implemented and used.

 //A callback is a function passed as an argument to another function, which will execute the callback when an operation is complete.
 //it has a limitation called callback hell when multiple callbacks are nested and also error handling is cubersome


 //A promise is an object that represents the eventual completion (or failure) of an asynchronous operation.
 // there are 3 states
 // pending, fulfilled, rejected

 // Promise combinators

 //Promise.All([]) returns the fullfilled or rejected state of all promises sent. it is like a transaction. one fails all fails.

 //Promise.race([]) returns the promise the gets fullfiled or rejected first

 //Promise.allSettled([]) returns all the items either rejected or fulfilled

 //Promise.any([]) returns only the first fullfiled if all rejected then only return it


 //Ques 1
 console.log("start")

 const promise1 = new Promise((resolve,reject)=>{
    console.log(1)
    resolve(2)
 })

 promise1.then((res)=>{
    console.log(res)
 })

 console.log("end")

 //ans - start 1 end 2 because we though console is in promise js engine finds all the sync code and execute them

 //Ques 2
 function job(state){
    return new Promise(function(resolve, reject){
        if(state){
            resolve("success")
        }
        else{
            reject("error")
        }
    })
 }

 let promise = job();

 promise.then(()=>{
    console.log("success")
 })
 .then(()=>{
    console.log("success2")
 })
 .then(()=>{
    console.log("success3")
 })
 .catch(()=>{
    console.log("error") 
 })
 then(()=>{
    console.log("success4") 
 })

//prints error and then success4
//In JavaScript's promise chaining, a .then() block that comes after a .catch() will execute regardless of whether the promise was fulfilled or rejected.
//  This is because the .catch() block handles the rejection, and subsequent .then() blocks start with a "clean slate."

//Ques 3
promise = job(true);

promise.then(function(data){
    console.log(data)
    return job(true)
})
.then(function(data){
    if(data != "victory"){
        throw "Defeat"   //when something is thrown it's always catched
    }
    return job(true)
})
.then(function(data){
    console.log(data)
    return job(true)
})
.catch(function(error){
    console.log(error)
    return job(false)
})
.then(function(data){
    console.log(data)
    return job(true)
})
.catch(function(error){
    console.log(error)
    return "Error Caught"   // this is a resolved promise
})
.then(function(data){
    console.log(data)
    return new Error("Test")  // error not thrown
})
.then(function(data){
    console.log(data)
})
.catch(function(data){
    console.log(data)
});


//output
//success
//defeat
//error
//error caught
//test


//Ques 4
//implement the following - create a promise called firstPromise which will resolve to a text then create another promise to resolve first one
//now resolve 2nd promise to get the output of first promise

let firstPromise = new Promise((resolve,reject)=>{
    resolve("first!")
})

let secondPromise = new Promise((resolve,reject)=>{
    resolve(firstPromise)
})

secondPromise.then((res)=>{
    return res
})
.then(res=>console.log(res))  //first!


//Ques 5 implement a function that'll recursively resolve promises

function promiseRec(promises){
    if(promises.length ==0){
        return
    }
    let currPromise = promises.shift()
    currPromise.then((res)=>console.log(res)).catch((error)=>console.log(error))
    promiseRec(promises)
}

promiseRec([promise1, promise2,promise3]);


