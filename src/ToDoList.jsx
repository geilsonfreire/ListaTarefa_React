import { CheckSquare, Plus, Square, Trash } from "react-bootstrap-icons";
import React, { useState, useEffect } from "react";
import img from "./assets/list.png";
import "./css/ToDoList.css";
import "./css/MidiaQuery.css";


function ToDoList() {
    const listStorage = localStorage.getItem('lista'); // Pega a lista do localStorage
    const [placeholder, setPlaceholder] = useState('');// Guarda e mostra o placeholder
    const [index, setIndex] = useState(0); // Guarda e mostra o index do placeholder
    const fullPlaceholder = 'Adicione uma tarefa'; // Guarda e mostra o placeholder completo
    const [lista, setLista] = useState(listStorage ? JSON.parse(listStorage) : []); // Guarda e mostra Lista de tarefas adicionadas
    const [novoItem, setNovoItem] = useState(''); // Guarda o valor do inpu


    // Salva a lista no localStorage
    useEffect(() => {
        const timer = setInterval(() => {
            if (index < fullPlaceholder.length) {
                setPlaceholder((prev) => prev + fullPlaceholder[index]);
                setIndex((prev) => prev + 1); // Incrementa o index
            } else {
                setIndex(0); // Reinicia o index
                setPlaceholder(''); // Limpa o placeholder
            }
        }, 200); // Ajuste a velocidade de digitação aqui
        return () => clearInterval(timer); // Limpa o intervalo
    }, [index, lista]); // Atualiza o index

    // Efeito para salvar a lista no localStorage
    useEffect(() => {
        localStorage.setItem('lista', JSON.stringify(lista));
    }, [lista]); // Atualiza quando a lista muda

    // Evento para adicionar um item na lista
    function adicionaItem(form) {
        form.preventDefault(); // Previne o comportamento padrão do formulário
        if (!novoItem) { // Verifica se o input está vazio
            return; // Se estiver vazio, não faz nada
        }
        setLista([...lista, {Text: novoItem, isCompleted: false}]); // Adiciona um novo item na lista
        setNovoItem(''); // Limpa o input
        document.getElementById('inputEntrada').focus(); // Foca no input
    }

    // Evento para marcar um item como completo
    function clicou(index) {
        const listaAux = [...lista]; // Cria uma lista auxiliar
        listaAux[index].isCompleted = !listaAux[index].isCompleted; // Inverte o valor do item clicado
        setLista(listaAux); // Atualiza a lista
    }

    // Evento para deletar um item da lista
    function Dell(index) {
        const listaAux = [...lista]; // Cria uma lista auxiliar
        listaAux.splice(index, 1); // Remove o item clicado
        setLista(listaAux); // Atualiza a lista
    }

    // Evento para deletar todos os itens da lista
    function DeletAll() {
        setLista([]); // Limpa a lista
    }

    return (
        <div className="container"> 
            <h1>Lista e Tarefa</h1>
            <form onSubmit={adicionaItem}>
                <input id="inputEntrada"
                    type="text" 
                    value={novoItem} 
                    onChange={(e) => setNovoItem(e.target.value)}
                    placeholder={placeholder} 
                />

                <button type="submit">
                    <span className="My-Icon-Add"><Plus /></span>
                </button>
            </form>

            <div className="listaTarefa"> {
                lista.length < 1 ? 
                <span className="imgAnuncio">
                    <img className="imgVazio" src={img} /> Lista vazia
                </span> :
                lista.map((item, index) => (
                    <div 
                        key={index}
                        className={
                            item.isCompleted ? "item completo" : "item"
                        }>
                        <span>{item.Text}</span>

                        <div>
                            <button>
                                <span 
                                    onClick={() => {clicou(index)}} 
                                    className="My-Icon-check">
                                    {item.isCompleted ? <CheckSquare/> : <Square />}
                                </span>
                            </button>
                            <button>
                                <span 
                                    onClick={() => {Dell(index)}}
                                    className="My-Icon-Dell"><Trash />
                                </span>
                            </button>
                        </div>
                    </div>
                ))
            }

               {/*  <div className="item completo">
                    <span className="Txt-item-completo">Tarefa de exemplo</span>
                    <div>
                        <button>
                            <span className="My-Icon-check"><CheckSquare /></span>
                        </button>
                        <button>
                            <span className="My-Icon-Dell"><Trash /></span>
                        </button>
                    </div>
                </div> */}

                {
                    lista.length > 0 &&
                    <button 
                        onClick={() => {DeletAll()}} 
                        className="DellAll">Deletar todos
                    </button>
                }
            </div>
        </div>
    );
}

export default ToDoList;