alert("¡Bienvenido al juego!");

let elegir;

function comenzar() {

    let confirmacion = confirm("¿Desea iniciar un nuevo juego?");

    if (confirmacion){
        let nombre = prompt("Por favor, ingresar nombre de jugador");
    
        if (!nombre || nombre.trim() === ""){
            alert("¡Debe escribir un nombre!");
        } else {
            let contadorUsuario = 0;
            let contadorPC= 0;

            for (let i = 0; i < 3; i++) {
                elegir = parseInt(prompt("Elegir un número"));
                let resultado = ronda(elegir);

                if (resultado === 0){
                    contadorPC++;
                    alert("Ganador de ronda PC");
                } else if (resultado === 1){
                    contadorUsuario++;
                    alert("Ganador de ronda " + nombre);
                }else if (resultado === 2){
                    i--;
                } else alert("Empate de ronda");
            }

            if (contadorPC > contadorUsuario){
                alert("Ganador de la partida PC");
            } else if (contadorPC < contadorUsuario){
                alert("Ganador de la partida " + nombre);
            } else alert("Empate de partida");
        }
    }
}

function ronda (elegir){
    
    let maquina = parseInt(Math.random()*3+1);
    
    if (elegir >= 1 && elegir <= 3){
        if (maquina === 3 && elegir === 2){
            return 0;
        } else if (maquina === 2 && elegir === 1){
            return 0;
        } else if (maquina === 1 && elegir === 3){
            return 0;
        } else if (maquina === elegir){
            return -1;
        } else {
            return 1;
            }
    } else {
        alert("ELEGIR ENTRE 1 Y 3");
        return 2;
        }
}