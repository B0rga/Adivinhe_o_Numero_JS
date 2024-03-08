class Jogo{
    
    constructor(){
        this.tentativas = 3;
        this.numAleatorio;
    }

    LimparTextos(){
        document.querySelector("h2").innerHTML="<br>";
        document.querySelector("p").innerHTML="";
    }

    LimparCampos(){
        document.querySelector("#num").value = "";
    }

    ResetarElementos(){
        this.tentativas = 3;
        document.querySelector("#iniciar").disabled = false;
        document.querySelector("#adivinhar").disabled = true;
        document.querySelector("#num").disabled = true;
    }

    // método que irá exibir o efeito de roleta de números na tela 
    RodarRoleta(){
        let acumulador = 0;

        // o setInterval irá alterar o número do h2 a cada 90ms. Quando esta alteração for realizada 20 vezes,
        // a repetição do intervalo será finalizada, o h2 exibirá "?" e o jogo de adivinhação poderá prosseguir
        let intervalo = setInterval(function(){  
            document.querySelector("h2").innerHTML = Math.floor(Math.random() * 10);
            acumulador++;
            if(acumulador==20){
                clearInterval(intervalo);
                document.querySelector("h2").innerHTML = "?";
                document.querySelector("#adivinhar").disabled = false;
                document.querySelector("#num").disabled = false;
                document.querySelector("#num").focus();
            }
        }, 90);
    }

    // método que define o número sorteado
    DefineNumAleatorio(){
        this.numAleatorio = Math.floor(Math.random() * 10);
        console.log("Número sorteado: "+this.numAleatorio);
    }

    // método do botão de iniciar a roleta
    IniciarJogo(){
        this.LimparTextos();
        document.querySelector("#iniciar").disabled = true;
        this.RodarRoleta();
        this.DefineNumAleatorio();
    }

    // método que recebe o número digitado pelo usuário
    ReceberDados(){
        let jogo = {};
        jogo.num = document.querySelector("#num").value;
        return jogo;
    }

    // método que valida o input
    ValidaCampos(jogo){
        if(jogo.num>10 || jogo.num<0 ){
            document.querySelector("p").innerHTML="Insira um valor válido!";
            return false;
        }
        else if(jogo.num == ''){
            document.querySelector("p").innerHTML="Preencha o campo!";
            return false;
        }
        else{
            document.querySelector("p").innerHTML="";
            return true;
        }
    }

    // método que verifica se o número digitado pelo usuário é o mesmo que o sorteado pelo sistema
    VerificaNumero(jogo){
        if(jogo.num == this.numAleatorio){
            document.querySelector("h2").innerHTML="( 'U')";
            document.querySelector("p").innerHTML="Parabéns, você acertou! Tente mais vezes!";
            this.ResetarElementos();
        }else{
            this.tentativas--;
            document.querySelector("p").innerHTML=`Errou! Você tem mais ${this.tentativas} chances`;
            if(this.tentativas==1){
                document.querySelector("p").innerHTML=`Última chance! Precisa que alguém te CONSOLE?`;
            };
            if(this.tentativas==0){
                document.querySelector("h2").innerHTML = "( T-T)";
                document.querySelector("p").innerHTML="Errou de novo! Mais sorte na próxima!";
                this.ResetarElementos();
            };
        }
    }

    // método principal
    AdivinharNumero(){
        let jogo = this.ReceberDados();
        if(this.ValidaCampos(jogo)){
            this.VerificaNumero(jogo);
        }
        this.LimparCampos();
        document.querySelector("#num").focus();
    }
}

const jogo = new Jogo(); // instanciando a classe