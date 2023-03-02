/*
entrada de dados
faz alguma coisa com estes dados
exibe/grava em algum lugar
*/

//vamos guardar uma coleção de dados, então vamos criar um array:

let tarefas = [];

function adicionarTarefas() {
    let tarefa = document.querySelector("#tarefa");

    if (tarefa.value === ''){

        exibeMensagem('Insira a tarefa!');
        return;
    }

    tarefas.push( // inseriu a tarefa com push
        {
            titulo: tarefa.value, // tiulo é uma propriedade e o valor da propriedade (podemos inserir qtas propriedas quiser)
            status: 'à executar'  // o que está dentro das chaves é considerado objeto ex let objeto = { propriedade : valor } 
            //{ nome: 'marcelo', idade: '18'} não usa índice como no array mas pela propriedade [{}] no colchete um array 
        }
    ) //metodo de array - insere no começo do array

    tarefa.value = '';



    exibeTarefas(); //chamei a função para exibir a minha tarefa (que adicionei)
}

function exibeTarefas() {
    let cardTArefas = document.querySelector('.tarefaExecutar');
    let tagSpan = document.createElement('span');

    for (let task of tarefas) {
        tagSpan.innerHTML =
            `<p>${task.titulo}</p>
            <p onclick="alteraStatus(event)">${task.status}</p>
            <button onclick="editaTarefas(event)"> Editar </button>
            <button onclick="excluiTarefa(event)"> Excluir </button>`;
    };

    cardTArefas.append(tagSpan);

}

function excluiTarefa(event) {
    let elementoPai = event.target.parentNode; //target = alvo. O alvo será o botão button e ele irá trazer o proprio botão exlcuiTarefa

    let tituloTarefa = elementoPai.children[0].innerText;
    let status = elementoPai.children[1].innerText;

    if (status === 'Feito') {
        exibeMensagem(`não é possível excluir a tarefa com o status ${status}`);
        // alert('Não é possível excluir a tarefa com o status' + statusTarefa);
        return;
    }

    //se ele poder ser excluído, vamos percorrer as tarefas para excluir a desejada

    for (let [index, tarefa] of tarefas.entries()) {
        if (tituloTarefa === tarefa.titulo) {
            tarefas.splice(index, 1);//tarefas.splice(index, 1) -> splice percorre e exclui oq eu indicar pelo índice 
        }
    };

    elementoPai.remove();

    //criar uma function para capturar a div e passar por parametro uma mensagem no inner.html com esta mensagem
    //lá no excluir a tarefa, vou passar esta função e vou exibir na div alert

}
function alteraStatus(event) {

    let status = event.target.innerText;
    let elementoPai = event.target.parentNode;
    let tituloTarefa = elementoPai.children[0].innerText;

    switch(status){
        case 'à executar' : status = "executando"; break;
        case 'executando' : status = "feito"; break;
        case 'feito' : exibeMensagem(`O status ${status} não pode ser alterado`); break;
        default : exibeMensagem(`O status ${status} não poderá ser alterado`);
    }

    for(let valor of tarefas)
    {
        if(tituloTarefa === valor.titulo){
            valor.status = status;
            event.target.innerText = status;
        }
    }

    let sessaoTarefa = elementoPai.parentNode;
    sessaoTarefa.removeChild(elementoPai);

    if (status == 'executando'){
        document.querySelector('.tarefaExecutando').appendChild(elementoPai);
    } else if(status == 'feito'){
    document.querySelector('.tarefaFeito').appendChild(elementoPai);
    } else{
        document.querySelector('.tarefaExecutar').appendChild(elementoPai);
    }

}

function editaTarefas(event, titulo) {

    let elementoPai = event.target.parentNode;

    let status = elementoPai.children[0].innerHTML;

    
    
    if(status !== 'à executar'){
        exibeMensagem(`não é possível editar a tarefa com o status ${status}`);
        return;
    }

    if(event.target.innerText == 'Gravar'){

        let tituloTarefa = elementoPai.children[0].innerHTML;
        
        for(let tarefa of tarefas ){
            if(tarefa.titulo === titulo){
                tarefa.titulo = tituloTarefa;
            }
        }

        elementoPai.children[0].setAttribute('contenteditable','false');

        event.target.innerText = 'Editar';
        return;
    }
    event.target.innerText = 'Gravar';

    elementoPai.children[0].setAttribute('contenteditable','true');
    
}

function exibeMensagem( mensagem ){

    // let divMensagem = document.querySelector('#alertas');
    // divMensagem.innerText = mensagem;

    document.querySelector('#alertas').innerHTML = `<strong>${mensagem}<strong/>`;
}
    