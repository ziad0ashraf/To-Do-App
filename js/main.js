/// <reference types="../@types/jquery"/>
new WOW().init();

let todoInput=document.getElementById('todoInput')
let todoBtn=document.getElementById('todoBtn')
let loader=document.getElementById('loader')



async function addTodo(task) {
    let data=await fetch(`https://todos.routemisr.com/api/v1/todos`,{
        method:'post',
        body:JSON.stringify(task),
        headers:{'content-type':'application/json'}
    })
    let response =await data.json()
    // console.log(response);
    if (response.message=='success') {
        getTodo()
        $('.alert').fadeOut(500)
    }else{
        $('.alert').fadeIn(500)
    }
}
todoBtn.addEventListener('click',()=>{
   let task={
        "title":todoInput.value,
        "apiKey":"6699737060a208ee1fdc589c"
    }
    addTodo(task)
    todoInput.value=""
})

async function getTodo() {
        loader.classList.remove('d-none')
    let data=await fetch(`https://todos.routemisr.com/api/v1/todos/6699737060a208ee1fdc589c`)
    let response =await data.json()
    // console.log(response);
    displayTodo(response.todos)
    if (response.todos.length==0) {
        $('.empty').fadeIn(500)
        $('.full').fadeOut(500)
    }else{
        $('.empty').fadeOut(500)
        $('.full').fadeIn(500)
    }
    loader.classList.add('d-none')
}
getTodo()

function displayTodo(data) {
    let cartona=""
    for (let i = 0; i < data.length; i++) {
        cartona+=`
        <div class="task wow fadeInDownBig d-flex w-75 justify-content-between align-items-center p-2 my-3 m-auto rounded-4 fw-semibold overflow-auto">
            <p id="p" class="m-0 ${data[i].completed==true?'text-decoration-line-through':''} ">(${i+1}) ${data[i].title}</p>
            <div class="d-flex gap-3">
                <i onclick="markTodo('${data[i]._id}')" class="${data[i].completed==true?'checked':''} check fa-solid fa-check"></i>
                <i onclick="deleteTodo('${data[i]._id}')" class="trash fa-solid fa-trash"></i>
            </div>
        </div> 
`
    }
    document.getElementById('demo').innerHTML=cartona
}

async function deleteTodo(id) {
    let data=await fetch(`https://todos.routemisr.com/api/v1/todos`,{
        method:'DELETE',
        body:JSON.stringify({todoId:id}),
        headers:{'content-type':'application/json'}
    })
    let response =await data.json()
    // console.log(response);
    getTodo()
}
async function markTodo(id) {
    let data=await fetch(`https://todos.routemisr.com/api/v1/todos`,{
        method:'PUT',
        body:JSON.stringify({todoId:id}),
        headers:{'content-type':'application/json'}
    })
    let response =await data.json()
    // console.log(response);
    getTodo()
}
