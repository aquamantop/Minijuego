// Constantes
const btn = document.querySelector("#btn-comenzar")
const opciones = document.querySelectorAll(".opciones")
const imagen = document.querySelector("#imagenPpt")
const caja = document.querySelector("#caja")
const reglas = document.querySelector("#reglas")
const historialRondas = document.querySelector("#historial-rondas")
const ganador = document.querySelector("#ganador")

// Strings
let eleccionJugador = ""
let ganadorRonda = ""

// Contadores
let contadorJugador = 0
let contadorPC = 0
let contadorRondas = 0
let contadorGeneralPC = 0
let contadorGeneralJugador = 0

// Boton
btn.addEventListener("click", (e) => {
    e.preventDefault()
    funcionBoton(btn.innerHTML)
})

function funcionBoton(data) {
    if(data === "¡Comenzar!"){
        imagen.classList.add("hide")
        caja.classList.remove("hide")
        btn.innerHTML = "Volver"
    }
    if(data === "Volver"){
        imagen.classList.remove("hide")
        caja.classList.add("hide")
        contadorJugador = 0
        contadorPC = 0
        contadorRondas = 0
        eleccionJugador = ""
        ganadorRonda = ""
        historialRondas.innerHTML = ""
        ganador.innerHTML = ""
        reglas.innerHTML = `<li>Piedra le gana a tijera, papel le gana a piedra y tijera le gana a papel</li>
                            <li>Se deberá elegir una opción por ronda, ya sea piedra, papel o tijera.</li>
                            <li>La máquina elegirá aleatoriamente otra opción para completar la ronda y se determinará quien gana.</li>`
        btn.innerHTML = "¡Comenzar!"
    }
}

// Eleccion y juego
opciones.forEach(e => {
    e.addEventListener("click", () => {
        if(contadorRondas < 3){
            jugarRonda(e.innerText.trim())
        }
        if(contadorRondas === 3){
            finDeRonda(e.innerText.trim())
        }
    })
})

// Logica
function finDeRonda(){
    if(contadorJugador > contadorPC){
        let h1 = `<h1>Partida ganada por Usuario</h1>`
        ganador.innerHTML = h1
        caja.classList.add("hide")
    } else if(contadorJugador < contadorPC){
        let h1 = `<h1>Partida ganada por PC</h1>`
        ganador.innerHTML = h1
        caja.classList.add("hide")
    } else {
        let h1 = `<h1>Partida empatada</h1>`
        ganador.innerHTML = h1
        caja.classList.add("hide")
    }
    
    if(contadorJugador > contadorPC){
        contadorGeneralJugador++
    } else contadorGeneralPC++
}
function jugarRonda(eleccion){
    if(eleccion === "Piedra"){
        eleccionJugador = "piedra"
    } else if (eleccion === "Papel"){
        eleccionJugador = "papel"
    } else if (eleccion === "Tijera"){
        eleccionJugador = "tijera"
    }
    contadorRondas += 1
    ronda()
}
// Eleccion de maquina
function eleccionAleatoria(){
    let resultado = ""
    let aleatorio = parseInt(Math.random()*3+1)

    if(aleatorio === 1){
        resultado = "piedra"
    } else if (aleatorio === 2){
        resultado = "papel"
    } else if (aleatorio === 3){
        resultado = "tijera"
    }
    console.log(resultado)
    return resultado
}

function ronda(){
    let maquina = eleccionAleatoria()
    let jugador = eleccionJugador
    let ganador = ""

    // Gana maquina
    if (maquina === "piedra" && jugador === "tijera"){
        contadorPC++
        ganador = "Ganador PC"
    }
    if (maquina === "papel" && jugador === "piedra"){
        contadorPC++
        ganador = "Ganador PC"
    }
    if (maquina === "tijera" && jugador === "papel"){
        contadorPC++
        ganador = "Ganador PC"
    }

    // Empate
    if (maquina === jugador){
        ganador = "Empate de ronda"
    }

    // Gana jugador
    if (jugador === "piedra" && maquina === "tijera"){
        contadorJugador++
        ganador = "Ganador Usuario"
    }
    if (jugador === "papel" && maquina === "piedra"){
        contadorJugador++
        ganador = "Ganador Usuario"
    }
    if (jugador === "tijera" && maquina === "papel"){
        contadorJugador++
        ganador = "Ganador Usuario"
    } 
    console.log(contadorJugador)
    console.log(contadorPC)
    console.log(ganador)

    reglas.innerHTML = ""
    historialRondas.innerHTML += `<p>${ganador}</p>`
}


