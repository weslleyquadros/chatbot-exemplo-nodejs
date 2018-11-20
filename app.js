const prompt = require('prompt-sync')();
const watson = require('watson-developer-cloud/assistant/v1');
require('dotenv').config()


const chatbot = new watson({
    username:  process.env.USUARIO,
    password: process.env.PASSWORD,
    version: process.env.VERSION,

});

const workspace_id = process.env.WORKSPACE_ID;

//começamos a conversação com uma mensagem vazia
chatbot.message({workspace_id}, trataResposta);


let fimDeConversa = false;



function trataResposta(err, resposta){
    if(err){

        console.log(err); //caso tenha erro
        return;
    }

    if(resposta.intents.length){

        console.log('Eu detectei a intenção ' + resposta.intents[0].intent);
    
        if(resposta.intents[0].intent == 'despedida'){

            fimDeConversa = true;
        }
    }
   // console.log(resposta)
    //exibe a resposta do dialogo
    if(resposta.output.text.length > 0){

        console.log(resposta.output.text[0]);
    }

    //console.log(resposta.context)
    if(!fimDeConversa){

        const mensagemUsuario = prompt('>>');
        
            chatbot.message({
        
                workspace_id,
                input:{text: mensagemUsuario},
                context: resposta.context
            }, trataResposta);
    }

}