// PARTE 1: Lista de perguntas e respostas
const perguntas = [
  {
    pergunta: "Quem foi o artilheiro da Copa do Mundo de 2018?",
    respostas: [
      { opcao: "Harry Kane", correto: true },
      { opcao: "Mbappé", correto: false },
      { opcao: "Messi", correto: false },
    ],
  },
  {
    pergunta: "Qual seleção foi campeã da Euro 2016?",
    respostas: [
      { opcao: "Portugal", correto: true },
      { opcao: "França", correto: false },
      { opcao: "Espanha", correto: false },
    ],
  },
  {
    pergunta: "Qual foi o primeiro clube brasileiro a vencer a Libertadores?",
    respostas: [
      { opcao: "Flamengo", correto: false },
      { opcao: "Santos", correto: true },
      { opcao: "Palmeiras", correto: false },
    ],
  },
  {
    pergunta: "Qual time foi campeão da Champions League de 2019?",
    respostas: [
      { opcao: "Real Madrid", correto: false },
      { opcao: "Liverpool", correto: true },
      { opcao: "Bayern de Munique", correto: false },
    ],
  },
  {
    pergunta: "Com quantos anos Lionel Messi ganhou sua primeira bola de ouro?",
    respostas: [
      { opcao: "21", correto: false },
      { opcao: "23", correto: false },
      { opcao: "22", correto: true },
    ],
  },
]

// PARTE 2: Pegando os elementos do HTML
const perguntaElemento = document.querySelector(".pergunta")
const respostasElemento = document.querySelector(".respostas")
const progressoElemento = document.querySelector(".progresso")
const textoFinal = document.querySelector(".fim span")
const conteudo = document.querySelector(".conteudo")
const conteudoFinal = document.querySelector(".fim")
const listaErros = document.createElement("ul") // Criando lista de erros

// PARTE 3: Variáveis para controle do jogo
let indiceAtual = 0
let acertos = 0
let erros = [] // Lista de perguntas erradas

// PARTE 4: Função para carregar uma nova pergunta
function carregarPergunta() {
  progressoElemento.innerHTML = `${indiceAtual + 1}/${perguntas.length}`
  const perguntaAtual = perguntas[indiceAtual]
  perguntaElemento.innerHTML = perguntaAtual.pergunta
  respostasElemento.innerHTML = ""

  for (let i = 0; i < perguntaAtual.respostas.length; i++) {
    const resposta = perguntaAtual.respostas[i]
    const botao = document.createElement("button")
    botao.classList.add("botao-resposta")
    botao.innerText = resposta.opcao
    botao.onclick = function () {
      if (resposta.correto) {
        acertos++
      } else {
        // Se errou, salva a pergunta e a resposta correta
        const respostaCorreta = perguntaAtual.respostas.find(
          (r) => r.correto
        ).opcao
        erros.push({
          pergunta: perguntaAtual.pergunta,
          correta: respostaCorreta,
        })
      }

      indiceAtual++

      if (indiceAtual < perguntas.length) {
        carregarPergunta()
      } else {
        finalizarJogo()
      }
    }

    respostasElemento.appendChild(botao)
  }
}

// PARTE 5: Função para mostrar a tela final
function finalizarJogo() {
  textoFinal.innerHTML = `Você acertou ${acertos} de ${perguntas.length}`
  textoFinal.style.textAlign =" center"
  conteudo.style.display = "none"
  conteudoFinal.style.display = "flex"

  // Mostra os erros, se houver
  if (erros.length > 0) {
    const tituloErros = document.createElement("h3")
    tituloErros.innerText = "Você errou as seguintes questões:"
    tituloErros.style.color = "white"
    conteudoFinal.appendChild(tituloErros)

    listaErros.style.marginTop = "10px"
    listaErros.innerHTML = ""
    listaErros.style.color = "white"
    erros.forEach((erro) => {
      const item = document.createElement("li")
      item.style.marginTop = "4px"
      item.innerHTML = `<strong>${erro.pergunta}</strong><br>Resposta correta: ${erro.correta}`
      listaErros.appendChild(item)
      
    })

    conteudoFinal.appendChild(listaErros)
  }
}

// PARTE 6: Iniciando o jogo
carregarPergunta()
