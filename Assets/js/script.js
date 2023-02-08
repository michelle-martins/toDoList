/*
entrada de dados
faz alguma coisa com estes dados
exibe/grava em algum lugar
*/

//vamos guardar uma coleção de dados, então vamos criar um array:

let tarefas = [];

function adicionarTarefas() {
    let tarefa = document.querySelector("#tarefa");

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
    let cardTArefas = document.querySelector('section');

    cardTArefas.innerHTML = '';

    for (let task of tarefas) {
        cardTArefas.innerHTML +=
            `<span>
            <p> ${task.titulo}</p>
            <p onclick="alteraStatus(event)"> ${task.status}</p>
            <button onclick="editaTarefas()"> Editar </button>
            <button onclick="excluiTarefa(event)"> Excluir </button>
        </span>`;
    }

}

function excluiTarefa(event) {
    let elementoPai = event.target.parentNode; //target = alvo. O alvo será o botão button e ele irá trazer o proprio botão exlcuiTarefa

    let tituloTarefa = elementoPai.children[0].innerText;
    let statusTarefa = elementoPai.children[1].innerText;

    if (statusTarefa === 'Feito') {
        disparaAlerta("Não é possível excluir a tarefa");
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
        case 'feito' : alert(`O status ${status} não pode ser alterado`); break;
        default : alert(`O status ${status} não poderá ser alterado`);
    }

    for(let valor of tarefas)
    {
        if(tituloTarefa === valor.titulo){
            valor.status = status;
            event.target.innerText = status;
        }
    }

}