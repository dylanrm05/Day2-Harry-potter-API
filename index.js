const express = require('express')
const app = express()
const port = 4000
const characters = require('./harrypotter.json')
//middleware
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello Harry Potter Characters")
})

app.get('/characters',(req,res)=>{
    res.send(characters)
})

app.get('/characters/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const character=characters.find((character)=>character.id===id)
    if(character==undefined){
        res.status(404).send("The character does not exist")
    }else{
        res.send(character)
    }
})

const ids=characters.map((Character)=>(Character.id))
let maxId=Math.max(...ids)

app.post('/characters',(req,res)=>{
    const character=characters.find((character)=>character.name.toLowerCase()===req.body.name.toLowerCase())
    console.log(req.body)
    if(character!=undefined){
        req.status(409).send("The character already exists");
    }
    else{
        maxId+=1;//this is equal to maxId=maxId+1
        req.body.id=maxId;
        characters.push(req.body)
        res.status(201).send(req.body)
    }
})

app.delete("/characters/:name",(req,res)=>{
    const name=req.params.name.toLowerCase();
    const characterIndex=characters.findIndex((character)=>character.name.toLowerCase()==name)
    console.log(characterIndex)
    if(characterIndex==-1){
        res.status(404).send("The character does not exist")
    }
    else{
        characters.splice(characterIndex,1)
        res.sendStatus(204)
    }
})

//homework-create a patch request to update the name of the character

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})
