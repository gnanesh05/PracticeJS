// Event Loop Execution Order
// Run all synchronous code (main thread).
// Execute all microtasks.
// Process one macrotask.
// Repeat from step 2 (run microtasks before the next macrotask).
// Render UI updates if needed.
// Continue looping.


console.log("Start");

setTimeout(() => console.log("Macrotask 1"), 0);

Promise.resolve().then(() => console.log("Microtask 1"));

setTimeout(() => console.log("Macrotask 2"), 0);

console.log("End");

//Start         (Synchronous)
//End          // (Synchronous)
//Microtask 1  // (Microtask runs immediately after sync code)
//Macrotask 1  // (First macrotask)
//Macrotask 2  // (Second macrotask)


/*
How await Affects the Event Loop
Key Points:
await pauses execution inside an async function and returns control to the event loop.
The function execution resumes only after the awaited promise resolves, but the code after await becomes a microtask.
Microtasks always run before macrotasks (like setTimeout).
Multiple await statements don’t block the whole program, only the function they are inside.
*/


//Q3
console.log("Start");

setTimeout(() => console.log("Macrotask 1"), 0);

async function foo() {
    console.log("Inside async function");
    await Promise.resolve();
    console.log("After await 1");
    await Promise.resolve();
    console.log("After await 2");
}

foo();

console.log("End");
/*
Start
Inside async function
End
After await 1
After await 2
Macrotask 1
*/

//Q4
console.log("Start");

setTimeout(() => console.log("Macrotask 1"), 0);

async function foo() {
    console.log("Inside async function");
    await Promise.resolve(console.log("Promise 1"));
    console.log("After await 1");
}

foo();

setTimeout(() => console.log("Macrotask 2"), 0);

console.log("End");

/*
Start
Inside async function
Promise 1
End
After await 1
Macrotask 1
Macrotask 2
*/

//Q5 Implement a function that runs an array of async functions in sequence.
async function resolvePromises(tasks){
    result = []
    for(var task in tasks){
        result.push(await task());
    }
    return result;
}

promises = [   
    () => new Promise((res) => setTimeout(() => res("Task 1"), 1000)),
    () => new Promise((res) => setTimeout(() => res("Task 2"), 500)),
    () => new Promise((res) => setTimeout(() => res("Task 3"), 200))
]

resolvePromises(promises).then((result)=>console.log(result));
