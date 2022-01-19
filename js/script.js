const tabuleiro = document.querySelector("#tabuleiro");

const imagensProgramacao = [
    "vue.svg",
    "angular.svg",
    "react.svg",
    "ember.svg",
    "backbone.svg",
    "aurelia.svg",
    "assembly.png",
    "bash.png",
    "c.png",
    "cpp.png",
    "csharp.svg",
    "dart.svg",
    "elixir.jpeg",
    "gambas.png",
    "go.png",
    "java.svg",
    "javascript.svg",
    "kotlin.svg",
    "lua.svg",
    "perl.svg",
    "php.svg",
    "python.svg",
    "r.png",
    "ruby.svg",
    "rust.svg",
    "sql.png",
    "swift.svg",
    "vala.png",
    "vim.svg",
    "mysql.png",
    "css.svg",
    "html.svg",
];

const imagensTimes = [
    "ajax.svg",
    "al-ahly.png",
    "arsenal.svg",
    "atletico-madrid.png",
    "atletico-mineiro.png",
    "bahia.png",
    "benfica.svg",
    "boca-juniors.png",
    "botafogo.svg",
    "bragantino.svg",
    "chapecoense.png",
    "chelsea.png",
    "corinthians.png",
    "cruzeiro.svg",
    "flamengo.svg",
    "fluminense.svg",
    "fortaleza.png",
    "gremio.png",
    "independiente.svg",
    "inter-milan.png",
    "internacional.svg",
    "juventus.svg",
    "liverpool.svg",
    "manchester-united.png",
    "milan.svg",
    "palmeiras.png",
    "paris-saint-germain.png",
    "penarol.svg",
    "porto.png",
    "river-plate.png",
    "santos.png",
    "sao-paulo.png",
    "sevilla.png",
    "sport-recife.png",
    "vasco-da-gama.png",
];

const imagensCarros = [
    "Aston Martin.png",
    "Rolls Royce.png",
    "alfa romeo.png",
    "audi.png",
    "bmw.png",
    "bugatti.png",
    "cherry.png",
    "chrysler.png",
    "citroen.png",
    "dodge.png",
    "ferrari.png",
    "fiat.png",
    "ford.png",
    "honda.png",
    "hyundai.png",
    "jaguar.png",
    "kia.png",
    "lamborghini.png",
    "land-rover.png",
    "lexus.png",
    "maserati.png",
    "mazda.png",
    "mercedes.png",
    "mini.png",
    "mitsubishi.png",
    "nissan.png",
    "peugeot.png",
    "porsche.png",
    "renault.png",
    "subaru.png",
    "tata-motors.png",
    "toyota.png",
    "volkswagen.png",
    "volvo.png",
];

let clickTravado = false;
let cartaVirada = false;
let pontos = 0;
let numeroCartas = 0;
let numeroColunas = 0;

let jogoRodando = false;
let btnIniciar = "";
let btnReiniciar = "";
let inputChange = "";
let btnMostrarTudo = "";
let tempoJogo = new cronometro();
let minute = 0;
let second = 0;
let millisecond = 0;
let tentativas = 0;
let pontosElemento = "";
let tentativasElemento = "";
let elementoTempo = "";
let imagensObjeto = [];
let tipoImagem = "";
let cartaDois = "";
let cartaViradaDifente = null;

const addCss = (variavel, valor) => {
    document.body.style.setProperty(variavel, valor);
};

const setImgns = (n) => {
    let imgs = [];
    while (imgs.length < n / 2) {
        let aux = imagensObjeto[Math.floor(Math.random() * imagensObjeto.length)];
        if (!imgs.includes(aux)) imgs.push(aux);
    }

    imgs.push(...imgs);
    let sorteio;
    for (let i = 0; i < n; i++) {
        sorteio = Math.floor(Math.random() * n);
        let aux = imgs[i];
        imgs[i] = imgs[sorteio];
        imgs[sorteio] = aux;
    }

    let vizinhosIguais = true;

    while (vizinhosIguais && Math.sqrt(n) > 2) {
        vizinhosIguais = false;

        for (let i = 0; i < n; i++) {
            if (i > 0) {
                if (imgs[i] == imgs[i - 1]) {
                    sorteio = Math.floor(Math.random() * n);
                    let aux = imgs[i];
                    imgs[i] = imgs[sorteio];
                    imgs[sorteio] = aux;
                    vizinhosIguais = true;
                }
                if (i > Math.sqrt(n - 1) && imgs[i] == imgs[i - Math.sqrt(n)]) {
                    sorteio = Math.floor(Math.random() * n);
                    let aux = imgs[i];
                    imgs[i] = imgs[sorteio];
                    imgs[sorteio] = aux;
                    vizinhosIguais = true;
                }
                if (
                    i < Math.sqrt(n - 1) - Math.sqrt(n) &&
                    imgs[i] == imgs[i + Math.sqrt(n)]
                ) {

                    sorteio = Math.floor(Math.random() * n);
                    let aux = imgs[i];
                    imgs[i] = imgs[sorteio];
                    imgs[sorteio] = aux;
                    vizinhosIguais = true;
                }
            }
        }

    }
    return imgs;
};

const mostrarImagens = (n) => {
    let numeroColunas = Math.sqrt(n);
    tabuleiro.innerHTML = "";

    let cartaHtml = "";
    let url = `url(../img/${tipoImagem}/1up.gif)`;

    addCss("--tamanhoCarta", `${100 / numeroColunas}%`);
    addCss("--url", url);

    setImgns(n).forEach((img) => {
        cartaHtml += `<div class="memory-card" data-card="${img}">
                 <img class="back-face" src="img/${tipoImagem}/back-face.svg">
                <img class="front-face" src="img/${tipoImagem}/${img}"/>
            </div>`;
    });

    tabuleiro.innerHTML += cartaHtml;
    tabuleiro.classList.add("filter");
};

function flipCard() {
    if (clickTravado) {
        clearTimeout(cartaViradaDifente)
        carta.classList.remove("flip");
        cartaDois.classList.remove("flip");
        carta.style.cursor = "pointer";
        cartaDois.style.cursor = "pointer";
        cartaDois.addEventListener("click", flipCard);
        carta.addEventListener("click", flipCard);
        clickTravado = false;
        cartaVirada = false;
    }

    this.removeEventListener("click", flipCard);
    this.classList.add("flip");
    this.style.cursor = "not-allowed";

    if (cartaVirada) {
        cartaDois = this;
        clickTravado = true;
        tentativas++;

        tentativasElemento.querySelector("span").innerHTML = tentativas;

        if (cartaDois.getAttribute("data-card") == carta.getAttribute("data-card")) {
            pontos += 2;
            pontosElemento.innerHTML = pontos;

            cartaDois.classList.add("checked");
            carta.classList.add("checked");

            clickTravado = false;
            cartaVirada = false;

            if (pontos == numeroCartas) {
                tempoJogo.stop();

                elementoTempo.classList.add("piscar");
                tentativasElemento.classList.add("ativo");
                tentativasElemento.classList.add("piscar");
                inputChange.forEach((range) => {

                    range.disabled = false;
                });
                inputChange.forEach((range) => {
                    range.parentElement.removeEventListener("click", alerte);
                });
            }
        } else {
            cartaViradaDifente = setTimeout(() => {
                cartaDois.classList.remove("flip");
                carta.classList.remove("flip");
                carta.style.cursor = "pointer";
                cartaDois.style.cursor = "pointer";
                cartaDois.addEventListener("click", flipCard);
                carta.addEventListener("click", flipCard);
                clickTravado = false;
                cartaVirada = false;
            }, 1500);
        }
    } else {
        cartaVirada = true;
        carta = this;
    }
}


function rangeSlide({ value } = document.querySelector(".range"),
    imagem = document.querySelector("#range-imagens").value
) {
    switch (imagem) {
        case "1":
            imagensObjeto = "";
            tipoImagem = "times";
            imagensObjeto = [...imagensTimes];
            break;
        case "2":
            imagensObjeto = "";
            tipoImagem = "programacao";
            imagensObjeto = [...imagensProgramacao];
            break;
        case "3":
            imagensObjeto = "";
            tipoImagem = "carros";
            imagensObjeto = [...imagensCarros];
            break;
        default:
    }
    numeroColunas = value;
    numeroCartas = numeroColunas * numeroColunas;
    document.getElementById("rangeValue").innerHTML = numeroColunas;
    document.getElementById("totalImagens").innerHTML = numeroCartas;
    mostrarImagens(numeroCartas);
}

const iniciarJogo = () => {
    tempoJogo.resetar();
    elementoTempo.classList.add("ativo");
    tempoJogo.start();

    inputChange.forEach((range) => {
        range.disabled = true;
    });
    btnMostrarTudo.classList.remove("show");
    inputChange.forEach((range) => {
        range.parentElement.addEventListener("click", alerte);
    });

    btnReiniciar.classList.add("show");
    btnIniciar.classList.remove("show");

    let cartas = document.querySelectorAll(".memory-card");
    cartas.forEach((carta) => carta.addEventListener("click", flipCard));
    cartaVirada = false;
    tabuleiro.classList.remove("filter");
};

const alerte = () => {
    alert("Não é possivel fazer alterações com o jogo em andamento.");
};

function reiniciarJogo() {
    tempoJogo.stop();
    tempoJogo.resetar();
    inputChange.forEach((range) => {
        range.parentElement.removeEventListener("click", alerte);
    });

    pontosElemento.innerHTML = pontos = 0;
    tentativas = 0;
    tentativasElemento.querySelector("span").innerHTML = tentativas;
    tentativasElemento.classList.remove("piscar");
    elementoTempo.classList.remove("piscar");

    elementoTempo.classList.remove("ativo");
    tentativasElemento.classList.remove("ativo");

    btnMostrarTudo.classList.add("show");
    btnReiniciar.classList.remove("show");
    btnIniciar.classList.add("show");

    inputChange.forEach((range) => {
        range.disabled = false;
    });
    rangeSlide();
}

function mostrarTudo() {
    btnMostrarTudo.classList.remove("show");
    tabuleiro.classList.remove("filter");
    let cartas = document.querySelectorAll(".memory-card");
    cartas.forEach((carta) => {
        carta.classList.add("flip");
        carta.style.cursor = "not-allowed";
    });
    setTimeout(() => {
        cartas.forEach((carta) => {
            carta.classList.remove("flip");
            carta.style.cursor = "pointer";
        });
        iniciarJogo();
    }, numeroCartas * 150);
}


function cronometro(e) {
    this.elemento = document.querySelector(".cronometro");
    this.control = null;
    this.data = null;
    this.start = () => {
        this.control = setInterval(() => {
            this.elemento.innerHTML = timer();
        }, 10);
    };
    this.stop = () => {
        clearInterval(this.control);
        this.control = null;
    };
    this.resetar = () => {
        minute = 0;
        second = 0;
        millisecond = 0;
        this.elemento.innerHTML = `${FixeZero(minute)}:${FixeZero(
			second
		)}:${FixeZero(millisecond)}`;
    };
}

function timer() {
    if ((millisecond += 10) == 1000) {
        millisecond = 0;
        second++;
    }
    if (second == 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }
    return `${FixeZero(minute)}:${FixeZero(second)}:${FixeZero(millisecond/10)}`;
}

function FixeZero(input) {
    return input > 10 ? input : `0${input}`;
}

onload = () => {
    inputChange = document.querySelectorAll(".range");

    rangeSlide();
    elementoTempo = document.querySelector(".tempo");

    btnIniciar = document.querySelector(".botao.iniciar");
    btnReiniciar = document.querySelector(".botao.resetar");

    btnMostrarTudo = document.querySelector(".botao.mostrar");
    btnMostrarTudo.classList.add("show");
    btnIniciar.classList.add("show");

    pontosElemento = document.querySelector(".pontos span");
    pontosElemento.innerHTML = pontos;

    tentativasElemento = document.querySelector(".container-tentativas");

    btnIniciar.addEventListener("click", iniciarJogo);
    btnReiniciar.addEventListener("click", reiniciarJogo);
    btnMostrarTudo.addEventListener("click", mostrarTudo);
};