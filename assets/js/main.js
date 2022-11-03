const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaButton(li){
    li.innerText += ' ';
    const btn = document.createElement('button');
    btn.innerText = 'Apagar';
    btn.setAttribute('class','apagar');
    li.appendChild(btn);

}

function criaListItem(){
    const li = document.createElement('li');
    return li;
}

function criaTarefa(textoInput){
    const li = criaListItem();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaButton(li);
    salvarTarefas();
}


inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
})


btnTarefa.addEventListener('click', function(){

    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
})

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

document.addEventListener('click',function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar','').trim();
       listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaTarefas = JSON.parse(tarefas);

    for(let tarefa of listaTarefas){
        criaTarefa(tarefa);
    }

}
adicionaTarefasSalvas();