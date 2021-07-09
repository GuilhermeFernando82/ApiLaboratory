const sequelize = require('sequelize');
const connect = require('../conexao');

const user = connect.define('exam',{
    name:{
        type: sequelize.STRING,
        allowNull: false,
    },
    tipo:{
        type: sequelize.STRING,
        allowNull: false,
    },
    status:{
        type: sequelize.STRING,
        allowNull: true,
    },
    laboratory:{
        type: sequelize.STRING,
        allowNull:false,
    },
    
    
})

user.sync({force:false}).then(() =>{console.log('Tabela Criada')}).catch(() => {console.log('Erro ao criar tabela')})
module.exports = user;