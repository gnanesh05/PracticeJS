function Person(name) {
    this.name = name;
  }
  Person.prototype.greet = function () {
    return `Hello, my name is ${this.name}`;
  };
  
  const john = new Person("John");
  console.log(john.greet()); // "Hello, my name is John"
  console.log(john.__proto__ === Person.prototype); // true

  //Prototypal Inheritance
function Student(name, grade){
    Person.call(this, name);
    this.grade = grade;
}

//we'll also need to let Student access all the properties of Person to have actual inheritence.
//we replace Student.prototype with a new object linked to Person.prototype
Student.prototype = Object.create(Person.prototype);
 //When we replace Student.prototype, we accidentally overwrite its constructor reference.
//By default, Student.prototype.constructor should point to Student, but now it points to Person, which is incorrect.
Student.prototype.constructor = Student; 

const student1 = new Student("Mic",4);
student1.greet();
console.log(student1.constructor === Student) //true

/*
why don't we just do Student.prototype = Person.prototype ?
because this means both Student.prototype and Person.prototype point to the same object in memory.
Any changes to Student.prototype will also modify Person.prototype, which is not what we want.
we want to make these Objects immutable.
*/

const person = {
    name: "John",
    greet() {
      return `Hello, ${this.name}!`;
    }
  };
  
  const employee = Object.create(person);
  employee.position = "Software Engineer";
  
  // What will the following log statements print?
  console.log(employee.greet());  //Hello, undefined! // Because `employee` does not have the `name` property
  console.log(employee.position); // software engineer



//Classes
class Vehicle {
    constructor(brand, make){
        this.brand = brand
        this.make = make
    }

    describe(){
        console.log(this.brand);
    }
}

class Car extends Vehicle{
    constructor(brand, make){
        super(brand, make)
    }

    describe(){
        console.log(this.brand. this.make)
    }
}

  