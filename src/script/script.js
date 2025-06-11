const listaDeContatos = [
  {
    id: 1,
    nome: "Joaquim",
    ultimaMensagem: "Olá, vamos programar?",
    horarioUltimaMensagem: "20:20", 
    avatar: "./src/assets/images/emily--dorson.png",
    conversas:[ 
      {mensagem: "Oi, eu sou o novo programador!", tipo: "recebida", horario:"20:20"},
      {mensagem: "Que legal, eu também sou!", tipo: "enviada", horario:"20:35"},
      {mensagem: "Vamos codar juntos?", tipo: "recebida", horario:"20:45"},
    ]
  },
  {
    id: 2,
    nome: "João",
    ultimaMensagem: "Eu sou o Novo Programador",
    horarioUltimaMensagem: "20:35", 
    avatar: "./src/assets/images/emily--dorson.png",
     conversas:[ 
      {mensagem: "Oi, eu sou o novo programador!", tipo: "recebida", horario:"20:20"},
      {mensagem: "Que legal, eu também sou!", tipo: "enviada", horario:"20:35"},
      {mensagem: "Vamos codar juntos?", tipo: "recebida", horario:"20:45"},
    ]
  },
  {
    id: 3,
    nome: "Raquel",
    ultimaMensagem: "Tem café?",
    horarioUltimaMensagem: "19:20", 
    avatar: "./src/assets/images/little--sister.png",
     conversas:[ 
      {mensagem: "Oi, eu sou o novo programador!", tipo: "recebida", horario:"20:20"},
      {mensagem: "Que legal, eu também sou!", tipo: "enviada", horario:"20:35"},
      {mensagem: "Vamos codar juntos?", tipo: "recebida", horario:"20:45"},
    ]
  },
  {
    id: 4,
    nome: "Pedro",
    ultimaMensagem: "Olá, vamos programar?",
    horarioUltimaMensagem: "21:20", 
    avatar: "./src/assets/images/emily--dorson.png",
     conversas:[ 
      {mensagem: "Oi, eu sou o novo programador!", tipo: "recebida", horario:"20:20"},
      {mensagem: "Tem café?!", tipo: "enviada", horario:"20:35"},
      {mensagem: "Eu quero!", tipo: "recebida", horario:"20:45"},
    ]
  },
]
 

 document.addEventListener("DOMContentLoaded", () => {

    let abaFocada = true;
    const tituloOriginal = document.title;

    const inputMsg = document.querySelector("#inputMensagem") 

    inputMsg.placeholder = "Digite sua mensagem" 

    const buttons = document.querySelectorAll (".cursor--pointer"); 
    
    const buttonSend = document.querySelector(".cursor--pointer[src*='send']"); 

    buttonSend.classList.add("minha-classe-modulo-um"); 

    const listaMensagens = document.querySelector(".div--messages");    

    const inputBuscarContatos = document.querySelector(".div--search input[type='search']");

    const inputBuscarMensagem = document.getElementById("search-message");

    inputBuscarMensagem.addEventListener("input", () => {
      const termoDeBusca = inputBuscarMensagem.value;
      console.log(`O termo buscado foi: ${termoDeBusca}`);
      buscarMensagem(termoDeBusca);
    }); 

    inputBuscarContatos.addEventListener("input", () => {
      const termoDeBusca = inputBuscarContatos.value;
      console.log(`O termos buscado foi: ${termoDeBusca}`);
      carregarContatos(termoDeBusca); 
    })


    listaMensagens.addEventListener("click", (event) => {
      if (event.target.classList.contains("emojis-rection")) {
        const mensagem = event.target.closest(".message"); 
        abrirMenuReacao(mensagem);
      }
    })
   
    window.addEventListener("blur", () => {
      abaFocada = false;
      document.title = "O chat saiu";
    });

    window.addEventListener("focus", () => {
      abaFocada = true;
      document.title = "o chat voltou!";
    })


    const listaEmojis =["&#128514;", "&#128525;", "&#128534;"];
    const listaEmojis2 = ["😂", "😍", "😖"];

    function abrirMenuReacao(mensagem) {
      const areaEmojis2 = mensagem.querySelector(".area-emojis");

      listaEmojis2.forEach((emoji) => {
        const emojiElement = document.createElement("span");
        emojiElement.classList.add("emoji-opcao", "cursor--pointer");
        emojiElement.textContent = emoji;

        emojiElement.addEventListener("click", () => {
          alternarEmoji(mensagem, emoji);
        });

        areaEmojis2.appendChild(emojiElement);
      
      });
    }

    function alternarEmoji(mensagem, emoji) {
      let reacaoExistente = mensagem.querySelector(".emoji-selecionado");

      if (reacaoExistente && reacaoExistente.textContent.includes(emoji)) {
        reacaoExistente.textContent = reacaoExistente.textContent.replace(emoji, "");
        if (reacaoExistente.textContent.trim() === "") {
          reacaoExistente.remove();
        }
      } else {
        if (!reacaoExistente) {
          reacaoExistente = document.createElement("div");
          reacaoExistente.classList.add("emoji-selecionado");
          mensagem.appendChild(reacaoExistente);
        }

        reacaoExistente.textContent += emoji;
      } 
    }

    // inicio
    const respostaParaOBot =  [
      "Olá, tudo bem?",
      "Como você está?",
      "Qual é o seu nome?",
      "Meu nome é Novo Bot",
      "Eu faço o curso do Novo Programador",
      "Você quer conversa comigo?"
    ];
    // fim
    function buscarMensagem(termo) {
      let encontrouMensagem = false;
      const mensagemElement = document.querySelectorAll(".message");
      console.log(mensagemElement);

      mensagemElement.forEach((mensagem) => {
        const textoOriginal = mensagem.innerText;
        const textoNormalizado = textoOriginal.toLowerCase();
        const termoNormalizado = termo.toLowerCase();

        if (textoNormalizado.includes(termoNormalizado)) {
          encontrouMensagem = true;

          const textoDestacado = textoOriginal.replace(
            new RegExp(`(${termo})`, "gi"), 
            `<span class='highlight'>$1</span>`
          );
        
          console.log(textoDestacado);

          mensagem.innerHTML = textoDestacado;
          mensagem.style.display = "block";
        } else {
          mensagem.style.display = "none"; 
        }

      });

      if (!encontrouMensagem && termo !== "") {
        listaMensagens.innerHTML = "<div>Não houve resultados<div/>";
      } else if (termo === "") {
        mensagemElement.forEach((mensagem) => {
          mensagem.style.display = "block";
          mensagem.innerHTML = mensagem.innerText;
        }) 
      }
    };
// inicio
    function enviarMensagem() {
      const texto = inputMsg.value.trim();
      if (texto==="") {
         alert("Não possui mensagem ainda!");
      }else {
       const mensagemRenderizada = renderizarMensagem("enviada", texto, "21:00");
       listaMensagens.appendChild(mensagemRenderizada); 
       inputMsg.value = "";  

       setTimeout (responderMensagem, 3000);
      }
    }
// fim
    function responderMensagem () {
      const posicao = Math.floor(Math.random() * respostaParaOBot.length);
      const mensagemDoBot = respostaParaOBot[posicao];
      const mensagemRenderizada = renderizarMensagem("recebida", mensagemDoBot, "21:00"); 
      listaMensagens.appendChild(mensagemRenderizada); 
      notificarNovaMensagem();
    };

    buttonSend.addEventListener("click", () => {
      enviarMensagem();
      
    });
    function renderizarMensagem(tipo, mensagem, horario) { 
      const divMensagem = document.createElement("div");
      const direcao = tipo === "enviada" ? "end" : "start";
      const stylesDiv = tipo === "enviada" ? "you" : "other";

      divMensagem.classList.add("flex", "flex--direction--row", `justify--content--${direcao}`, "width--100", "fade-in"); 

      divMensagem.innerHTML = ` 
          <div class="flex flex--direction--column message ${stylesDiv}">
              <div class="flex--6">
                  ${mensagem}
              </div>
              <div class="flex--1 flex align--items--center flex--direction--row justify--content--end font--size--12 infos--messages">
                  <div class="emojis-rection cursor--pointer">&#128514;</div>
                  <div class="area-emojis"></div>
                  <img src="./src/assets/icons/heart.svg" class="cursor--pointer">
                  <div>${horario}</div>
                  <img src="./src/assets/icons/viewed.svg" class="cursor--pointer">
              </div>
          </div>`;

      return divMensagem;

    }

    inputMsg.addEventListener("keypress", (event) =>{ 
      if (event.key === "Enter") {
         enviarMensagem();
      }
    })

    function carregarMensagemContatos(index) {
      const contato = listaDeContatos[index];
      listaMensagens.innerHTML = "";

      contato.conversas.forEach((conversa) => {
        const mensagemRenderizada = renderizarMensagem (conversa.tipo, conversa.mensagem, conversa.horario);
        listaMensagens.appendChild(mensagemRenderizada);
      })
    };
    
    function carregarContatos (filtro = '') {
      const divContatosElement = document.querySelector(".div--contacts");
      divContatosElement.innerHTML = "";

      const contatosFiltrados = listaDeContatos.filter((contato) =>
        contato.nome.toLowerCase().includes(filtro.toLowerCase())
      );

      if (contatosFiltrados.length === 0) {
        divContatosElement.innerHTML = "<div><span>Contato não encontrado, sai fora mané!</span></div>";
        return;
      }

      contatosFiltrados.forEach((contato, index) => {
        console.log(contato);
        const divParentElement = document.createElement("div");
        divParentElement.classList.add("flex", "area--contact", "fade-in");

        divParentElement.innerHTML = `
          <div class="flex justify--content--center align--items--center flex--1">
              <img class="avatar--left--bar " src="${contato.avatar}"/>
          </div>

          <div class="flex flex--direction--column justify--content--center flex--3">
              <div class="flex align--items--center infos--contact">
                  <div class="font--family font--weight--bold">${contato.nome}</div>
                  <img src="./src/assets/icons/verified.svg"/>
              </div>

              <div class="last--message">${contato.ultimaMensagem}</div>
            </div>

          <div class="flex flex--direction--column justify--content--center align--items--end flex--1 div--last--messages--info">
              <div class="hour--last--message">${contato.horarioUltimaMensagem}</div>
          </div>
        `; 

        divParentElement.addEventListener("click", () => {
          carregarMensagemContatos(index);
        })

        divContatosElement.appendChild(divParentElement);
        

      })
    }

    function notificarNovaMensagem() {
      let contador = 0;
      const intervalo = setInterval(() => {
        document.title = (contador % 2 === 0) ? `(${contador}) Nova Mensagem`: tituloOriginal;
        contador++;

        if (abaFocada) {
          clearInterval(intervalo);
          document.title = tituloOriginal;
        }

        }, 1000);
    }

     setTimeout (() => {
      carregarContatos ();
    }, 2500); 

 });

          