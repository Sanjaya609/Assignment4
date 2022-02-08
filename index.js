const ApiUrl="https://infodev-server.herokuapp.com/api/todos";


document.addEventListener('DOMContentLoaded',()=>{

    //For add and update button
    let updateBtn= document.querySelector("#update");
    updateBtn.style.display="none";


    //for showing tasks initially 
    getTodos();
    //To submit form data
    postData();
    //To delete task
    deleteTodo();
    //To mark complete
    markComplete();

    //To update task
    updateTask();

});

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
            <button class="btn btn-danger" id=${todos._id}><i class="far fa-trash-alt" id=${todos._id}></i></button>
            </div>`;
        }else{
            li.innerHTML=`
            <div>
                <h6 class="title ">${todos.name}<span class="ml-2 badge badge-${color}">${priority}</span></h6>
                <p class="description">${todos.description}</p>
            </div>
            <div>
                <button class="btn btn-success"id=${todos._id}><i class="fas fa-check" id=${todos._id}></i></i></button>
                <button class="btn btn-warning"id=${todos._id}><i class="fas fa-pencil" id=${todos._id}></i></i></button>
                <button class="btn btn-danger" id=${todos._id}><i class="far fa-trash-alt" id=${todos._id}></i></button>
            </div>`;
        }
        lisArray.push(li);
    });
    lists.replaceChildren(...lisArray);
};


 //To post data from form
 function postData(){
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
    }

//To delete task
function deleteTodo(){
    const lists = document.querySelector("#lecture-list ul");
    lists.addEventListener("click", (event) => {
        if(event.target.className==="btn btn-danger" || event.target.className==="far fa-trash-alt"){
            let target=event.target.id;
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
}
//To mark as complete
function markComplete(){
    const lists = document.querySelector("#lecture-list ul");
    lists.addEventListener("click", (event) => {
        if(event.target.className==="btn btn-success" || event.target.className==="fas fa-check"){
            let target=event.target.id;
            completeTodo(target);
        }
    });
    //function to update the completed status
    function completeTodo(id){
    axios({
        method:'put',
        url:`https://infodev-server.herokuapp.com/api/todos/${id}`,
        data:{
            completed:true,
        }
        }).then((response)=>{
            getTodos();
        }).catch((err)=>{
            console.log(err);
        });
        };
}


//To update task
function updateTask(){
    //To edit the task
    const lists = document.querySelector("#lecture-list ul");
    lists.addEventListener("click", (event) => {
    
        
        /* I tried this way to access the details of task clicked from API but get method
        was not responding based on the parameter so i used another method.

        
        if(event.target.className==="btn btn-warning" || event.target.className==="fas fa-pencil"){
            let targetId=event.target.id;
            getSpecificTodo(targetId);     
            async function getSpecificTodo(id){
                console.log(id);
                let specificTodo=(await axios({
                    method:'get',
                    url:`https://infodev-server.herokuapp.com/api/todos/${id}`
                }).catch((err)=>{console.log(err)}));
                console.log(specificTodo);  
            };
        };
         */


        if (event.target.classList[1] === "btn-warning") {
            //console.log(event.target.parentElement.parentElement);
            var target = event.target.parentElement.parentElement;
            let updateBtn= document.querySelector("#update");
            updateBtn.style.display="block";
            document.getElementById("submit").style.display="none";
        } else if (event.target.classList[1] === "fa-pencil") {
            var target = event.target.parentElement.parentElement.parentElement;
            let updateBtn= document.querySelector("#update");
            updateBtn.style.display="block";
            document.getElementById("submit").style.display="none";
        };
        
        let name = target.children[0].children[0].childNodes[0].data;
        let description = target.children[0].children[1].innerText;
        let priorityCheck = target.children[0].children[0].children[0].innerText;
        let priority;
        let id=target.id;
        if (priorityCheck === "Low") {
        priority = 0;
        } else if (priorityCheck== "Medium") {
        priority = 1;
        } else {
        priority = 2;
        }
        //console.log(name,description,priority);
        document.querySelector('#todo-task').value=name;
        document.querySelector('#priority').value=priority;
        document.querySelector('#description').value=description;

        //console.log(updateBtn.id);
        if(updateBtn.id==="update"){
            updateBtn.addEventListener("click",(event)=>{
                event.preventDefault();
                let updatedName=document.querySelector('#todo-task').value;
                let updatedPriority=document.querySelector('#priority').value;
                let updatedDescription=document.querySelector('#description').value;
                //console.log(updatedName,updatedPriority,updatedDescription);
                let updatedData={
                    name:updatedName,
                    priority:updatedPriority,
                    description:updatedDescription,
                };
                updateTodos(updatedData,id);
            })
        }

        function updateTodos(updatedData){
            axios({
                method:"put",
                url:`https://infodev-server.herokuapp.com/api/todos/${id}`,
                data:updatedData,
            }).then((response)=>{
                alert('Successfully Updated');
                getTodos();
                updateBtn.style.display="none";
                document.getElementById("submit").style.display="block";

            }).catch((err)=>console.log(err));
            document.querySelector('#todo-task').value="";
            document.querySelector('#priority').value=0;
            document.querySelector('#description').value="";
        }


    });
}