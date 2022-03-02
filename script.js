// console.log(parseInt(Math.random()*3+1))

alert("¡Bienvenido al juego!");

function comenzar() {

    let confirmacion = confirm("¿Desea iniciar un nuevo juego?");

    if (confirmacion){
        prompt("Por favor, ingresar nombre de jugador")
    }

}