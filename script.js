alert("¡Bienvenido al juego!");

function comenzar() {

    let confirmacion = confirm("¿Desea iniciar un nuevo juego?");
    let elegir;
    let maquina = parseInt(Math.random()*3+1);


    if (confirmacion){
        let nombre = prompt("Por favor, ingresar nombre de jugador");
        nombre

        elegir = parseInt(prompt("Elegir un número"));


        if (maquina === 3 && elegir === 2){
            alert("El ganador es: la maquina :(")
            console.log(maquina);
            console.log(elegir);
        } else if (maquina === 2 && elegir === 1){
            alert("El ganador es: la maquina :(");
            console.log(maquina);
            console.log(elegir);
        } else if (maquina === 1 && elegir === 3){
            alert("El ganador es: la maquina :(");
            console.log(maquina);
            console.log(elegir);
        } else if (maquina === elegir){
            alert("El ganador es: ¡no hay! Empate -_-");
            console.log(maquina);
            console.log(elegir);
        } else {
            alert("El ganador es: ¡" + nombre + "! :)");
            console.log(maquina);
            console.log(elegir);
            }
    }

}