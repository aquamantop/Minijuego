const btn = document.querySelector("#btn-comenzar");
const volverAJugar = document.querySelector("#btn-jugar");
const opciones = document.querySelectorAll(".opciones");
const imagen = document.querySelector("#imagenPpt");
const caja = document.querySelector("#caja");
const reglas = document.querySelector("#reglas");
const juego = document.querySelector("#juego");
const historialGanadores = document.querySelector("#historial-ganadores");
const historialRondas = document.querySelector("#historial-rondas");
const ganador = document.querySelector("#ganador");

let getLocalPC = sessionStorage.getItem("Contador general PC");
let getLocalUsuario = sessionStorage.getItem("Contador general Usuario");
let eleccionJugador = "";
let ganadorRonda = "";
let contadorJugador = 0;
let contadorPC = 0;
let contadorRondas = 0;
let contadorGeneralPC = 0;
let contadorGeneralJugador = 0;

window.addEventListener("load", () => {
  historialGanadoresRender();
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  funcionBoton(btn.innerHTML);
});

volverAJugar.addEventListener("click", (e) => {
  e.preventDefault();
  imagen.classList.add("hide");
  reglas.classList.add("hide");
  historialGanadores.classList.add("hide");
  caja.classList.remove("hide");
  juego.classList.remove("hide");
  contadorJugador = 0;
  contadorPC = 0;
  contadorRondas = 0;
  eleccionJugador = "";
  ganadorRonda = "";
  historialRondas.innerHTML = "";
  historialRondas.innerHTML = `<h2 class="sub">Historial de rondas</h2>`;
  ganador.innerHTML = "";
});

function funcionBoton(data) {
  if (data === "¡Comenzar!") {
    historialGanadoresRender();
    imagen.classList.add("hide");
    reglas.classList.add("hide");
    historialGanadores.classList.add("hide");
    caja.classList.remove("hide");
    juego.classList.remove("hide");
    historialRondas.classList.remove("hide");
    historialRondas.innerHTML = `<h2 class="sub">Historial de rondas</h2>`;
    btn.innerHTML = "Volver";
  }
  if (data === "Volver") {
    historialGanadoresRender();
    imagen.classList.remove("hide");
    reglas.classList.remove("hide");
    historialGanadores.classList.remove("hide");
    historialRondas.classList.add("hide");
    juego.classList.add("hide");
    caja.classList.add("hide");
    volverAJugar.classList.add("hide");
    contadorJugador = 0;
    contadorPC = 0;
    contadorRondas = 0;
    eleccionJugador = "";
    ganadorRonda = "";
    ganador.innerHTML = "";
    btn.innerHTML = "¡Comenzar!";
  }
}

opciones.forEach((e) => {
  e.addEventListener("click", () => {
    if (contadorRondas < 3) {
      jugarRonda(e.innerText.trim());
    }
    if (contadorRondas === 3) {
      finDeRonda();
    }
  });
});

function finDeRonda() {
  if (contadorJugador > contadorPC) {
    Swal.fire({
      title: "¡Felicidades!",
      text: "Ganaste la partida",
      icon: "success",
    });
    caja.classList.add("hide");
  } else if (contadorJugador < contadorPC) {
    Swal.fire({
      title: "¡Suerte la próxima!",
      text: "La PC gano la partida",
      icon: "error",
    });
    caja.classList.add("hide");
  } else {
    Swal.fire({
      title: "¡Estuviste cerca!",
      text: "La partida tertminó en empate",
      icon: "info",
    });
    caja.classList.add("hide");
  }

  if (contadorJugador > contadorPC) {
    contadorGeneralJugador++;
  }
  if (contadorJugador < contadorPC) {
    contadorGeneralPC++;
  }
  if (contadorJugador === contadorPC) {
    contadorGeneralJugador++;
    contadorGeneralPC++;
  }

  volverAJugar.classList.remove("hide");
  historialGanadores.classList.remove("hide");
  juego.classList.add("hide");
  historialGanadoresRender();
}

function jugarRonda(eleccion) {
  switch (eleccion) {
    case "Piedra":
      eleccionJugador = "piedra";
      break;
    case "Papel":
      eleccionJugador = "papel";
      break;
    case "Tijera":
      eleccionJugador = "tijera";
      break;
  }
  contadorRondas += 1;
  ronda();
}

function eleccionAleatoria() {
  let resultado = "";
  let aleatorio = parseInt(Math.random() * 3 + 1);

  switch (aleatorio) {
    case 1:
      resultado = "piedra";
      break;
    case 2:
      resultado = "papel";
      break;
    case 3:
      resultado = "tijera";
      break;
  }

  return resultado;
}

function ronda() {
  let maquina = eleccionAleatoria();
  let jugador = eleccionJugador;
  let ganador = "";
  let resultadoRonda = "";
  let h2 = "";

  switch (`${maquina}-${jugador}`) {
    case "piedra-tijera":
    case "papel-piedra":
    case "tijera-papel":
      contadorPC++;
      ganador = "La PC";
      resultadoRonda = "¡Perdiste!";
      break;

    case "tijera-piedra":
    case "piedra-papel":
    case "papel-tijera":
      contadorJugador++;
      ganador = "El Usuario";
      resultadoRonda = "¡Ganaste!";
      break;

    case "piedra-piedra":
    case "papel-papel":
    case "tijera-tijera":
      ganador = "Empate de ronda";
      resultadoRonda = "¡Empate!";
      h2 = `<h2>Resultado de la ${rondasJugadas()}: La ronda terminó en empate</h2>`;
      break;
  }

  resultadoRonda === "¡Empate!"
    ? (h2 = `<h2>Resultado de la ${rondasJugadas()}: La ronda terminó en empate</h2>`)
    : (h2 = `<h2>Resultado de la ${rondasJugadas()}: ${ganador} ganó la ronda</h2>`);

  Swal.fire({
    title: resultadoRonda,
    text: resultadoRonda === "¡Empate!" ? ganador : ganador + " ganó la ronda",
    icon:
      ganador === "El Usuario"
        ? "success"
        : ganador === "Empate de ronda"
        ? "info"
        : "error",
  });

  twoWins();

  historialRondas.innerHTML += h2;
}

function rondasJugadas() {
  let rondasJugadas = "";
  switch (contadorRondas) {
    case 1:
      rondasJugadas = "primera ronda";
      break;
    case 2:
      rondasJugadas = "segunda ronda";
      break;
    case 3:
      rondasJugadas = "tercera ronda";
      break;
  }
  return rondasJugadas;
}

function historialGanadoresRender() {
  sessionStorage.setItem("Contador general Usuario", contadorGeneralJugador);
  sessionStorage.setItem("Contador general PC", contadorGeneralPC);

  historialGanadores.innerHTML = `
    <h2 class="sub">Historial de partidas<h2>
    <h2>Partidas que ganó la PC: ${contadorGeneralPC}</h2>
    <h2>Partidas que ganó el Usuario: ${contadorGeneralJugador}</h2>
  `;
}

function twoWins() {
  if (contadorJugador === 2 || contadorPC === 2) {
    finDeRonda();
  }
}
