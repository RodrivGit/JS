/**
 * 2C = 2 of clubs 
 * 2D = 2 of diamonds 
 * 2H = 2 of hearts
 * 2s = Two of spades
 */


 let deck         = [];
 const tipos      = ['C','D','H','S'];
 const especiales = ['A','J','Q','K'];

 let puntosJugador = 0,
     puntosComputadora = 0;


 //*Referencias HTML
 const btnNuevo = document.querySelector('#btnNuevo');
 const btnPedir = document.querySelector('#btnPedir');
 const btnDetener = document.querySelector('#btnDetener');
 const divCartasJugador = document.querySelector('#jugador-cartas');
 const puntosHTML = document.querySelectorAll('small');
 const divCartasComputadora = document.querySelector('#computadora-cartas');

 /* Creacion de deck de cartas */

 const crearDeck = () => {
     for (let i = 2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i+tipo);
        }
     }

     for ( let tipo of tipos){
         for( let especial of especiales){
             deck.push(especial+tipo)
         }
     }
     deck = _.shuffle(deck);
     console.log(deck); 
     return deck;
 }

 crearDeck();


 //* Esta funcion me permite tomar una carta

const pedirCarta = () => {
    if( deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    carta = deck.pop();


    return carta;
}

/* Esta funcion permite asignar valor del total de las cartas */

 const valorCarta = ( carta ) => {
    const valor = carta.substring(0,carta.length-1);
    return (isNaN(valor)) ?
          (valor === 'A') ? 11 : 10 
                               : valor*1;
                            }
/* Turno de la computadora */
const turnoComputadora = (puntosMinimos) => {
    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`; //3H, JD.jpg
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if (puntosMinimos > 21){
            break;
        }
    } while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    if (puntosComputadora === puntosMinimos) {
        alert('Nadie gana');
    } else if (puntosMinimos > 21) {
        alert('Computadora Gana!!');
    } else if (puntosComputadora > 21){
        alert('Jugador 1 Gana!!!');
    } else {
        alert('Computadora Gana!!!')
    }
    
}


 

 //*Eventos*//
btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`; //3H, JD.jpg
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21){
        console.warn('Haz perdido');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21){
        console.warn('21!!, Genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
    
})

//Listener Detener
btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
    
})
//Listener Nuevo Juego
btnNuevo.addEventListener('click', ()=>{
    deck = [];
    deck = crearDeck();
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntosComputadora = 0;
    puntosJugador = 0;
    
    puntosHTML[0].innerText=0;
    puntosHTML[1].innerText=0;
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';


});


 
