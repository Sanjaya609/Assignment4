const ApiUrl="https://infodev-server.herokuapp.com/api/todos";

//To call data in API 
async function getTodos(){
    let Todos= (await axios({
        method:'get',
        url:ApiUrl
    }).catch((err)=>{console.log(err)})).data;

    console.log(Todos);
    showtasks(Todos);
};


//To show data in list
const lists= document.querySelector("#lecture-list ul");
function showtasks(data){
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
})


//To post data from form
const form= document.querySelector("#lecture-add");
form.addEventListener("submit", 
async function (event) {
    event.preventDefault();
    
});
