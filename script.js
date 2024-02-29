let iniciar = document.querySelector("#iniciar");
let adivinhar = document.querySelector("#adivinhar");
let roleta = document.querySelector("#roleta");
let num = document.querySelector("#num");
let res = document.querySelector("p");
let intervalo;
let acumulador;
let numAleatorio;
let tentativas;

function TrocarNumeros(){
    tentativas = 3;
    acumulador = 0;
    res.innerHTML = "";
    num.disabled = true;
    iniciar.disabled = true;
    intervalo = setInterval(GerarNumeros, 90);
}

function GerarNumeros(){
    roleta.innerHTML = Math.floor(Math.random() * 10);
    
    acumulador+=1;
    if(acumulador==20){
        clearInterval(intervalo);
        roleta.innerHTML = "?";
        adivinhar.disabled = false;
        num.disabled = false;
        numAleatorio = Math.floor(Math.random() * 10);
    }
}

function AdivinharNumero(){

    if(num.value>10 || num.value<0 || num.value==""){
        res.innerHTML = "Valor inválido! Tente novamente.";
    }
    else{
        if(num.value==numAleatorio){
            res.innerHTML = "Acertou! Tente mais vezes!";
            roleta.innerHTML = "( 'U')";
            iniciar.disabled = false;
            adivinhar.disabled = true;
        }
        else{
            tentativas-=1;
            res.innerHTML = `Errou! Você tem mais ${tentativas} chances`;
            if(tentativas==0){
                res.innerHTML = `Errou de novo! Mais sorte na próxima!`;
                roleta.innerHTML = "( T-T)";
                iniciar.disabled = false;
                adivinhar.disabled = true;
                num.disabled = true;
            }      
        }
    }
    num.value="";
}

iniciar.addEventListener("click", TrocarNumeros);
adivinhar.addEventListener("click", AdivinharNumero);