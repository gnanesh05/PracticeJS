// map , filter and reduce

const nums = [1,2,3,4]

// map
const multiply3 = nums.map((num, index, arr)=>{
   return num * 3;
})
console.log(multiply3)

// filter
const morethan2 = nums.filter((num)=>{
    return num>2
})

//reduce
// to reduce an array to single value eg.sum if initialvalue is not given, it'll take arr[i]

const sum = nums.reduce((acc,curr,i, arr)=>{
    return acc+curr
},0);

//acc is set 0 initially and then keep updating the sum with curr value

//can also be used to make a obj

const posts = [
    {id: 1, category: "frontend", title: "All About That Sass"},
    {id: 2, category: "backend", title: "Beam me up, Scotty: Apache Beam tips"},
    {id: 3, category: "frontend", title: "Sanitizing HTML: Going antibactirial on XSS attacks"}
];

const categoryPosts = posts.reduce((acc, post)=>{
    const {id,category} = post
    return {...acc, [category]:[...(acc[category] || []),id]}
},{})

// {
//     frontend: [1, 3],
//     backend: [2]
// }
// creating own map function(polyfill)
Array.prototype.myMap = function(cb){
    let temp = []
    for(let i=0; i<this.length; i++){
        temp.push(cb(this[i],i, this));
    }
    return temp;
}


const multiply4 = nums.myMap((num, index, arr)=>{
    return num * 3;
 })
 console.log(multiply4)


 //pollyfil for filter
 Array.prototype.myFilter = function(cb){
    let temp = []
    for(let i=0; i<this.length; i++){

        if(cb(this[i],i, this)){
            temp.push(this[i]);
        }
    }
    return temp;
}

const morethan3 = nums.myFilter((num,i,arr)=>{
    return num>3;
})


// pollyfil for reduce

Array.prototype.reduce = function(cb, initialvalue){
    if (!Array.isArray(this)) {
        throw new TypeError("Array.prototype.reduce called on a non-array object");
    }

    if (typeof cb !== "function") {
        throw new TypeError("Callback function is required in reduce");
    }
    
    let accumulator = initialvalue;
    for(let i=0; i<this.length; i++){
        accumulator = accumulator ? cb(accumulator,this[i],i,this) : this[i];
    }

    return accumulator;
}

