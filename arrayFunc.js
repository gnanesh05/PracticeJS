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
    let accumulator = initialvalue;
    for(let i=0; i<this.length; i++){
        accumulator = accumulator ? cb(accumulator,this[i],i,this) : this[i];
    }

    return accumulator;
}

