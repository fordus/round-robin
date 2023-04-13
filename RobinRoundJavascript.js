
function roundRobin (procesos, quantum) {
  const listaProcesos = procesos.map(proceso => ({ ...proceso, rafagaCPUInicio: proceso.rafagaCPU }))
  let tiempo = 0
  const completado = []
  const cola = []
  let contador = 0
  let procesoActual = null

  while (listaProcesos.length > 0 || cola.length > 0 || procesoActual !== null) {
    listaProcesos.forEach(proceso => {
      if (proceso.tiempoLlegada === tiempo) {
        cola.push(proceso)
        listaProcesos.splice(listaProcesos.indexOf(proceso), 1)
      }
    })

    if (cola.length > 0 && procesoActual === null) {
      procesoActual = cola.shift()
    }

    if (procesoActual !== null && procesoActual.rafagaCPU !== 0 && contador <= quantum) {
      procesoActual.rafagaCPU--
      if (procesoActual.rafagaCPU === 0) {
        completado.push({
          nombre: procesoActual.nombre,
          rafagaCPU: procesoActual.rafagaCPUInicio,
          tiempoLlegada: procesoActual.tiempoLlegada,
          tiempoFinalizacion: tiempo + 1,
          tiempoServicio: tiempo + 1 - procesoActual.tiempoLlegada,
          tiempoEspera: (tiempo + 1 - procesoActual.tiempoLlegada) - procesoActual.rafagaCPUInicio,
          indice: procesoActual.rafagaCPUInicio / (tiempo + 1 - procesoActual.tiempoLlegada)
        })
        contador = 0
        procesoActual = null
      } else {
        contador++
        if (contador === quantum) {
          listaProcesos.forEach(proceso => {
            if (proceso.tiempoLlegada === (tiempo + 1)) {
              cola.push(proceso)
              listaProcesos.splice(listaProcesos.indexOf(proceso), 1)
            }
          })

          cola.push(procesoActual)
          contador = 0
          procesoActual = null
        }
      }
    }

    tiempo++
  }

  return completado.sort((a, b) => a.nombre.localeCompare(b.nombre))
}

function calcularPromedio (procesos, propiedad) {
  return procesos.reduce((acumulador, proceso) => acumulador + proceso[propiedad], 0) / procesos.length
}

// AQUI EMPIEZA EL CODIGO DE PRUEBA

const procesos = [
  { nombre: 'A', tiempoLlegada: 0, rafagaCPU: 3 },
  { nombre: 'B', tiempoLlegada: 1, rafagaCPU: 4 },
  { nombre: 'C', tiempoLlegada: 3, rafagaCPU: 6 },
  { nombre: 'D', tiempoLlegada: 5, rafagaCPU: 5 },
  { nombre: 'E', tiempoLlegada: 4, rafagaCPU: 3 }
]

const quantum = 2

console.log(procesos)
console.log(roundRobin(procesos, quantum))
console.log('Promedio de tiempo de servicio:', calcularPromedio(roundRobin(procesos, quantum), 'tiempoServicio'))
console.log('Promedio de tiempo de espera:', calcularPromedio(roundRobin(procesos, quantum), 'tiempoEspera'))
console.log('Promedio de indice:', calcularPromedio(roundRobin(procesos, quantum), 'indice'))
