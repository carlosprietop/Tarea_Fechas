// obtenemos el div donde vamos a insertar todos los elementos.
let contenedor = document.getElementById("contenedor");
contenedor.setAttribute("id", "estilo_contenedor");
let h1 = document.createElement("h1");
h1.textContent = "Fecha Límite";
h1.setAttribute("id", "id_h1");
contenedor.append(h1);

let tabla = document.createElement("table");

// funcion para crear la tabla
function crearTabla() {
  tabla.setAttribute("id", "tabla_estilo");

  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  let newFila1 = document.createElement("tr");

  let newFila2 = document.createElement("tr");

  let columMes = document.createElement("th");
  columMes.setAttribute("id", "estilo_columMes");
  let columDia = document.createElement("th");
  let columHora = document.createElement("th");
  let columMinuto = document.createElement("th");
  let columSegundo = document.createElement("th");

  columMes.textContent = "Mes";
  columDia.textContent = "Dia";
  columHora.textContent = "Hora";
  columMinuto.textContent = "Minuto";
  columSegundo.textContent = "Segundo";

  let valorMes = document.createElement("td");
  valorMes.setAttribute("id", "columna_mes");
  let valorDia = document.createElement("td");
  valorDia.setAttribute("id", "columna_dias");
  let valorHora = document.createElement("td");
  valorHora.setAttribute("id", "columna_horas");
  let valorMinuto = document.createElement("td");
  valorMinuto.setAttribute("id", "columna_minutos");
  let valorSegundo = document.createElement("td");
  valorSegundo.setAttribute("id", "columna_segundos");

  newFila1.append(columMes, columDia, columHora, columMinuto, columSegundo);
  newFila2.append(valorMes, valorDia, valorHora, valorMinuto, valorSegundo);
  thead.append(newFila1);
  tbody.append(newFila2);
  tabla.append(thead, tbody);
  contenedor.append(tabla);
  newFila1.setAttribute("id", "estilo_fila1");
  newFila2.setAttribute("id", "estilo_fila2");
}

//lamamos a la funcion que crea la tabla
crearTabla();

// Input para introducir la fecha
let botonIntroducir = document.createElement("input");
botonIntroducir.type = "text";
botonIntroducir.name = "input_fecha";
botonIntroducir.placeholder = "Fecha en formato DD/MM/AA, HH/MM/SS";
botonIntroducir.setAttribute("id", "estilo_boton1");

// funcion para formatear la fecha a dia/mes/año, hora/minutos,segundos
function formatearFecha(fechaHora) {
  const [fecha, hora] = fechaHora.split(", ");
  const [dia, mes, anio] = fecha.split("/");
  const [horas, minutos, segundos] = hora.split(":");

  const fechaFormato = new Date(anio, mes - 1, dia, horas, minutos, segundos);

  return fechaFormato;
}

// funcion para calcular el tiempo restante a la fecha introducida por el usuario

function calcularTiempo() {
  let valorInput = document.getElementById("estilo_boton1").value;

  // formateamos la fecha.
  const fechaLimite = formatearFecha(valorInput);

  h1.textContent = "Fecha Límite " + valorInput;

  let valorMes = document.getElementById("columna_mes");
  let valorDia = document.getElementById("columna_dias");
  let valorHoras = document.getElementById("columna_horas");
  let valorMinutos = document.getElementById("columna_minutos");
  let valorSegundos = document.getElementById("columna_segundos");

  let ahora = new Date().getTime();

  // Calcular la diferencia en segundos
  let diferencia = (fechaLimite.getTime() - ahora) / 1000;
  if (diferencia > 0) {
    // Calcular la diferencia por magnitud
    let segundos = Math.floor(diferencia) % 60;
    let minutos = Math.floor(diferencia / 60) % 60;
    let horas = Math.floor(diferencia / 3600) % 24;
    let dias = Math.floor(diferencia / 3600 / 24) % 30;
    let meses = Math.floor(diferencia / 3600 / 24 / 30) % 12;

    // Añadir el valor calculado a cada columna.
    valorDia.textContent = dias;
    valorMes.textContent = meses;
    valorHoras.textContent = horas;
    valorMinutos.textContent = minutos;
    valorSegundos.textContent = segundos;

    let newFila1 = document.getElementById("estilo_fila1");
    let newFila2 = document.getElementById("estilo_fila2");

    newFila2.style.textAlign = "center";

    // Cambiamos el color del contador en según el tiempo que quede para la fecha limite.
    if (meses >= 1) {
      newFila2.style.color = "green";
    }
    if (meses == 0 && dias >= 14) {
      newFila2.style.color = "green";
    }

    if (meses == 0 && dias < 14) {
      newFila2.style.color = "orange";
    }
    if (meses == 0 && dias < 7) {
      newFila2.style.color = "red";
    }
  } else {
    valorDia.textContent = "0";
    valorMes.textContent = "0";
    valorHoras.textContent = "0";
    valorMinutos.textContent = "0";
    valorSegundos.textContent = "0";
  }
}

// creamos el boton de cambiar fecha y lo añadimos al contenedor

let botonCambiar = document.createElement("button");
botonCambiar.setAttribute("id", "estilo_boton2");
botonCambiar.textContent = "Cambiar Fecha";
botonCambiar.onclick = calcularTiempo;
contenedor.append(botonIntroducir, botonCambiar);

// llamamos a la funcion calcular tiempo cada 1 segundo.
window.setInterval(calcularTiempo, 1000);
