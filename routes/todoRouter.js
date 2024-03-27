const express = require('express')
const router = express.Router()
const uuidv4 = require('uuid').v4

let todos = [
    {
      id: "haf24jd",
      todo: "do laundry",
      done: "false",
      priority: "3"
    },
    {
      id: "jp2nkl2",
      todo: "wash dishes",
      done: "true",
      priority: "2"
    }
  ]

router.get('/get-all-todos',(req,res)=>{
    res.json({todos})
})

router.get('/get-todo-by-id/:id',(req,res)=>{
    const testId = req.params.id
    let toDoTask
    for(let task of todos){
        if(task.id === testId){
            toDoTask = task
        }
    }
    if(!toDoTask){
        res.end('the Todo ID you are looking for does not exist, please check the ID')
    } else {
        res.json(toDoTask)
    }
})
router.get(`/get-todos-by-done/:done`,(req,res)=>{
    const done = req.params.done
    const newDoneArray = todos.filter((task) => task.done === done)
    res.json({newDoneArray})
})

router.post(`/create-new-todo`,(req,res)=>{
    const {todo,priority} = req.body
    const todoCheck = todos.find(item=>item.todo === todo)
    if(todoCheck){
        res.json({message:'Todo already exists'})
    } else {
        const newObj = {
            id:`${uuidv4()}`,
            todo,
            done: "false",
            priority
        }
        todos.push(newObj)
        res.json(todos)
    }
})
router.put("/update-todo/:id",(req,res)=>{
    const {id} = req.params
    const {todo,done,priority}= req.body
    const doesItemExist = todos.find(item => item.id === id)
    if(doesItemExist){
        if(todo){
            doesItemExist.todo = todo
        }
        if(done){
            doesItemExist.done = done
        }
        if(priority){
            doesItemExist.priority = priority
        }
        res.json(todos)
    } else {
        res.json({message: "the id you were looking for does not exist please check your id"})
    }
})

router.put('/mark-done/:id',(req,res)=>{
    const {id}=req.params
    const {done}= req.body
    const isItATask = todos.find(todo => todo.id === id)
    if(!isItATask){
        res.json({message: 'this Id you are looking for does not exist'})
    } else {
        isItATask.done = done
        res.json(isItATask)
    }
})

router.delete("/delete-todo",(req,res)=>{
    const {id} = req.body
    const newTodos = todos.filter(item=>item.id !== id)
    if(newTodos.length === todos.length){
        res.json({message: "the item you are looking for does not exist, cannot delete"})
    } else {
        todos = newTodos
        res.json({todos,message:"item deleted"})
    }
})

router.get("/get-todo-by-priority/:priority",(req,res)=>{
    const {priority} = req.params
    const sortedObj = {}
    for(let task of todos){
        if(!sortedObj.key){
            sortedObj[task.priority]
        }
    }
})
// const express = require('express')
// const router = express.Router()
// const uuidv4 = require('uuid').v4

// let todos = [
//     {
//       id: "haf24jd",
//       todo: "do laundry",
//       done: "false"
//     },
//     {
//       id: "jp2nkl2",
//       todo: "wash dishes",
//       done: "true"
//     }
//   ]

//   router.get('/get-all-todos', (req, res)=>{
//     res.json(todos)
//   })

//   router.get('/get-todo-by-id/:id', (req, res)=>{
//     const {id} = req.params
//     const foundId = todos.find(item => item.id === id)
//     if(foundId){
//         res.json(foundId)
//         // {
//         //     foundId: {
//         //         {
//         //             id: "jp2nkl2",
//         //             todo: "wash dishes",
//         //             done: "true"
//         //           }
//         //     }
//         // }
//     }else{
//         res.json({message: "The Todo ID you are looking for does not exist, please check the ID"})
//     }
//   })

//   router.get('/get-todos-by-done/:done', (req, res)=>{
//     const {done} = req.params
//     const newDoneArray = todos.filter(item => item.done === done)
//     res.json(newDoneArray)
//   })

//   router.post('/create-new-todo', (req, res) =>{
//     const {todo} = req.body
//     const newTodo = {
//         todo,
//         id: uuidv4(),
//         done: 'false'
//     }
//     todos.push(newTodo)
//     res.json(todos)
//   })


// module.exports = router



// // obj = {
// //     firstName: "Kyle",
// //     lastName: "Rose",
// //     state: "TN"
// // }

// // const {firstName, lastName, state} = obj

// // console.log(lastName)

// // const newObj = {
// //     lastName : "Rose"
// // }






module.exports = router