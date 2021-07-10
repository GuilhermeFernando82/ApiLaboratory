const express = require('express');
const bodyparse = require('body-parser');
const exam = require('./database/models/exam');
const laboratory = require('./database/models/laboratory');
const app = express();
const cors = require('cors');

app.use(bodyparse.urlencoded({extended: false}));
app.use(bodyparse.json());

const port = 8080;

app.use(cors());
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});


app.get('/', (req, res) =>{
    res.send('Api Ok');
})

app.post('/registerLaboratory', function(req, res){
    const name = req.body.name;
    const address = req.body.address;
    const status = req.body.status;
    laboratory.findOne({where:{name:name}}).then(result =>{
        if(result != null){
            return res.json("Já existe esse laboratorio");
        }else{
            laboratory.create({
                name: name,
                address: address,
                status: status,
            }).then(() =>{return res.json("Sucesso ao gravar")})    
        }
    })
   
})

app.post('/registerExam', function(req, res){
    const name = req.body.name;
    const tipo = req.body.tipo;
    const status = req.body.status;
    const laboratory = req.body.laboratory;
    exam.create({
        name: name,
        tipo: tipo,
        status: status,
        laboratory: laboratory,
    }).then(() =>{return res.json("Sucesso ao gravar")})    
        
    
   
})

app.post('/deleteExam/:id', (req, res)=>{
    const id = req.params.id;
    
            exam.destroy({where:{
                id:id}})
                
            return res.redirect('http://localhost:3000/exam');
        
     
    
       
})
app.post('/deleteLaboratory/:id', (req, res)=>{
    const id = req.params.id;
    
            laboratory.destroy({where:{
                id:id}})
                
            return res.redirect('http://localhost:3000/laboratory');
        
     
    
       
})
app.post('/updateLaboratory', (req, res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const status = req.body.status; 

        laboratory.update({name: name},{where:{id:id}});
        laboratory.update({address: address},{where:{id:id}});
        laboratory.update({status: status},{where:{id:id}});
        return res.json('Update Sucessfull');
    
})

app.post('/updateExam', (req, res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const tipo = req.body.tipo;
    const status = req.body.status; 
    const laboratory = req.body.laboratory;

        exam.update({name:name},{where:{id:id}});
        exam.update({status:status},{where:{id:id}});
        exam.update({tipo:tipo},{where:{id:id}});
        exam.update({laboratory:laboratory},{where:{id:id}});
        return res.json('Update Sucessfull');
    
})
app.get('/listlab/:id', (req,res)=>{
    const id = req.params.id;
    laboratory.findOne({where:{id:id}}).then(result =>{
        res.json(result)
    })
})
app.get('/listLabAll', (req,res)=>{
    laboratory.findAll().then(result =>{
        res.json(result)
    })
})
app.get('/listExam/:id', (req,res)=>{
    const id = req.params.id;
    exam.findOne({where:{id:id}}).then(result =>{
        res.json(result)
    })
})
app.get('/listExamAll', (req,res)=>{
    exam.findAll().then(result =>{
        res.json(result)
    })
})

app.listen(port, () => {
    console.log('listen 8080');
})

