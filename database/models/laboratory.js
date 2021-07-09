const sequelize = require('sequelize');
const connect = require('../conexao');

const user = connect.define('laboratory',{
    name:{
        type: sequelize.STRING,
        allowNull: false,
    },
    address:{
        type: sequelize.STRING,
        allowNull: false,
    },
    status:{
        type: sequelize.STRING,
        allowNull: true,
    },
 
    
})

user.sync({force:false}).then(() =>{console.log('Tabela Criada')}).catch(() => {console.log('Erro ao criar tabela')})
module.exports = user;