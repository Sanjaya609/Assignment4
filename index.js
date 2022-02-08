const ApiUrl="https://infodev-server.herokuapp.com/api/todos";

//To call data in API 
async function getTodos(){
    let Todos= (await axios({
        method:'get',
        url:ApiUrl
    }).catch((err)=>{console.log(err)})).data;

    //console.log(Todos);
    showtasks(Todos);
};


//To show data in list

function showtasks(data){
    const lists= document.querySelector("#lecture-list ul");
    const lisArray= [];
    let priority,color;
    data.forEach((todos)=>{
        const li=document.createElement('li');
        li.id=todos._id;
        if (todos.priority===0){
            priority="Low";
            color="info";
        }else if (todos.priority===1){
            priority="Medium";
            color="warning"
        }else{
            priority="High";
            color="danger";
        }

        /* const li=document.createElement('li');
        const heading=document.createElement('h6');
        const span=document.createElement('span')
        const p=document.createElement('p');
        const successButton= document.createElement('button');
        const editButton=document.createElement('button');
        const removeButton= document.createElement('button');

        heading.className="title";
        span.className="ml-2 badge badge-danger";
        p.className="description";
        successButton.className="btn btn-success";
        editButton.className="btn btn-warning";
        removeButton.className="btn btn-danger";
    
        successButton.innerHTML='<i class="fas fa-check"></i>';
        editButton.innerHTML='<i class="fas fa-pencil"></i>';
        removeButton.innerHTML='<i class="far fa-trash-alt"></i>'; */

        if (todos.completed===true){
            li.innerHTML=`<div><h6 class="title completed">${todos.name}<span class="ml-2 badge badge-${color}">${priority}}</span></h6>
            <p class="Description">${todos.description}</p></div>
            <div>
            <button class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
            </div>`;
        }else{
            li.innerHTML=`
            <div>
                <h6 class="title ">${todos.name}<span class="ml-2 badge badge-${color}">${priority}</span></h6>
                <p class="description">${todos.description}</p>
            </div>
            <div>
                <button class="btn btn-success"><i class="fas fa-check"></i></i></button>
                <button class="btn btn-warning"><i class="fas fa-pencil"></i></i></button>
                <button class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
            </div>`;
        }
        lisArray.push(li);
    });
    lists.replaceChildren(...lisArray);
}



//for showing tasks initially 
document.addEventListener('DOMContentLoaded',()=>{
    getTodos();
    
    //To post data from form
    const form= document.querySelector("#lecture-add");
    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        //console.log("success");
        let name=document.querySelector('#todo-task').value;
        let priority=document.querySelector('#priority').value;
        let description=document.querySelector('#description').value;

        let setTodo={
            name:name,
            priority:priority,
            description:description,
            completed:false
        };

        setTodos(setTodo);

        //function to post data
        function setTodos(data){
            axios({
                method:"post",
                url:ApiUrl,
                data:data,
            }).then((Response)=>{
                alert("Task added Successfully");
                getTodos();
            }).catch((err)=>{console.log(err)});
        }
        document.querySelector('#todo-task').value="";
        document.querySelector('#priority').value=0;
        document.querySelector('#description').value="";
    });


    //To delete task
    const lists = document.querySelector("#lecture-list ul");
    lists.addEventListener("click", (event) => {
      //console.log(event.target.classList)
      if (event.target.classList[1] === "btn-danger") {
        //console.log(event.target.parentElement.parentElement.id);

        let target = event.target.parentElement.parentElement.id;
        removeTodo(target);

      } else if (event.target.classList[1] === "fa-trash-alt") {
        let target = event.target.parentElement.parentElement.parentElement.id;
        removeTodo(target);
      }
    });
    //function to remove task
    function removeTodo(id){
        //console.log(id);

        axios({
            method:"delete",
            url:`https://infodev-server.herokuapp.com/api/todos/${id}`
        }).then((response)=>{
            alert("Task has been deleted successfully");
            getTodos();
        }).catch((err)=>{console.log(err)});
    }


    //I tried doing this way but it crashed the server each time so i took help to fetch the id of button clicked
    /* function deleteTask(){
    let removeBtn=document.getElementsByClassName("btn btn-danger")
    console.log(removeBtn);
    console.log(removeBtn.length);
    for (var i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener("click",(event)=>{
            var id=event.target.parentElement.parentElement;
            axios({
                method: "delete",
                url: `https://infodev-server.herokuapp.com/api/todos/${id}`,
              })
                .then((res) => {
                  console.log("Todo deleted successfully");
                  getTodos();
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        }
    } */



    //To mark as complete
    lists.addEventListener("click", (event) => {
        //console.log(event.target.classList)
        if (event.target.classList[1] === "btn-success") {
            //console.log(event.target.parentElement.parentElement);
            var target = event.target.parentElement.parentElement;
  
        } else if (event.target.classList[1] === "fa-check") {
            var target = event.target.parentElement.parentElement.parentElement;
        }
        completeTodo(target.id);
        function completeTodo(id){
            axios({
                method:'put',
                url:`https://infodev-server.herokuapp.com/api/todos/${id}`,
                data:{
                    completed:true
                }
            }).then((response)=>{
                alert("Updated");
                getTodos();
        }).catch((err)=>{console.log(err);
        })
        }
    });

})
