// event bubbling is when the events get propogated upwared in hierarchy
// clicking on button inside a form which is inside a div.
// onblur, onfucus events don't bubble.

//Ques 1  event.target vs event.currentTarget vs this.target

const div = document.querySelector('div')
const form = document.querySelector('form')
const button = document.querySelector('button')

div.addEventListener('click', func);
form.addEventListener('click',func)
button.addEventListener('click',func)

const func = (event)=>{
    console.log(`currentTarget - ${event.currentTarget.tagName}  target - ${event.target.tagName} this - ${this.tagName}`);
}

//when clicked on button currentTarget , target and this all points to button
// event bubbled to form -  currentTarget is form but target will point to button (origin of event) and this is form
// likewise for div

//Ques 2 Event capturing
// with this event can be made to move topdown instead of botton up approach
// pass {capture:true } in event listener
//button.addEventListener('click',func,{capture:true})

//Ques 3 how to stop bubbling
function handleEvent(event){
    event.stopPropogation(); // stops with the element this function is attached to.
}

//Ques 4 Event Delegation
//instead of adding event listeners to all elements inside a parent element. add one to parent and check which child received the click
// event.target.TagName  event.target.ClassName matches something in child handle it.

//Ques 5 implementation - o rder in which console print on button click - div ->button->div
div.addEventListener('click', func);
form.addEventListener('click',func,{capture:true}) //follows top down only for this
button.addEventListener('click',func)

//Ques 6 implementation - modal close when clicked outside only

// <div class="modalContainer">
        // <div class="modal"> </div>
//  </div>

const container = document.querySelector('.modalContainer')
 button = document.querySelector('.modalButton')

button.addEventListener('click',function(){
    toggle(true)
})

container.addEventListener('click',function(event){
    if(event.target.className === "modalContainer"){
        toggle(false)
    }
})