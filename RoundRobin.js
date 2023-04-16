
function roundRobin (procesos, quantum) {
  // Copia los procesos para no modificar el original
  let listaProcesos = procesos.map(proceso => ({ ...proceso, rafagaCPUInicio: proceso.rafagaCPU }))

  let tiempo = 0
  let completado = []
  let cola = []
  let contador = 0
  let procesoActual = null

  // Mientras haya procesos en la lista o en la cola o haya un proceso en ejecucion
  while (listaProcesos.length > 0 || cola.length > 0 || procesoActual !== null) {
    // Agrega los procesos que llegan en este tiempo a la cola y los elimina de la lista
    const newCola = listaProcesos.filter(proceso => proceso.tiempoLlegada === tiempo)
    const newListaProcesos = listaProcesos.filter(proceso => proceso.tiempoLlegada !== tiempo)
    cola = [...cola, ...newCola]
    listaProcesos = newListaProcesos

    // Si hay procesos en la cola y no hay ninguno en ejecucion, toma el primero de la cola
    if (cola.length > 0 && procesoActual === null) {
      procesoActual = cola.shift()
    }

    // Si hay un proceso en ejecucion, lo ejecuta
    if (procesoActual !== null && procesoActual.rafagaCPU !== 0 && contador <= quantum) {
      // Se ejecuta una unidad de tiempo
      procesoActual.rafagaCPU--

      // Si el proceso termino, lo agrega a la lista de completados
      if (procesoActual.rafagaCPU === 0) {
        completado = [
          ...completado,
          {
            nombre: procesoActual.nombre,
            rafagaCPU: procesoActual.rafagaCPUInicio,
            tiempoLlegada: procesoActual.tiempoLlegada,
            tiempoFinalizacion: tiempo + 1,
            tiempoServicio: tiempo + 1 - procesoActual.tiempoLlegada,
            tiempoEspera: (tiempo + 1 - procesoActual.tiempoLlegada) - procesoActual.rafagaCPUInicio,
            indice: procesoActual.rafagaCPUInicio / (tiempo + 1 - procesoActual.tiempoLlegada)
          }]
        contador = 0
        procesoActual = null
      } else {
        // Si no termino, aumenta el contador
        contador++
        // Si el contador llego al quantum, lo agrega a la cola y reinicia el contador
        if (contador === quantum) {
          const newCola = listaProcesos.filter(proceso => proceso.tiempoLlegada === tiempo + 1)
          const newListaProcesos = listaProcesos.filter(proceso => proceso.tiempoLlegada !== tiempo + 1)
          cola = [...cola, ...newCola]
          listaProcesos = newListaProcesos
          cola = [...cola, procesoActual]

          contador = 0
          procesoActual = null
        }
      }
    }

    tiempo++
  }

  // Ordena los procesos por nombre
  return completado.sort((a, b) => a.nombre.localeCompare(b.nombre))
}

// Funcion para calcular el promedio de una propiedad de los procesos
function calcularPromedio (procesos, propiedad) {
  return procesos.reduce((acumulador, proceso) => acumulador + proceso[propiedad], 0) / procesos.length
}

// Ejemplo de uso
const procesos = [
  { nombre: 'A', tiempoLlegada: 0, rafagaCPU: 3 },
  { nombre: 'B', tiempoLlegada: 1, rafagaCPU: 4 },
  { nombre: 'C', tiempoLlegada: 3, rafagaCPU: 6 },
  { nombre: 'D', tiempoLlegada: 5, rafagaCPU: 5 },
  { nombre: 'E', tiempoLlegada: 4, rafagaCPU: 3 }
]

const quantum = 2

console.log(roundRobin(procesos, quantum))
console.log('Promedio de tiempo de servicio:', calcularPromedio(roundRobin(procesos, quantum), 'tiempoServicio'))
console.log('Promedio de tiempo de espera:', calcularPromedio(roundRobin(procesos, quantum), 'tiempoEspera'))
console.log('Promedio de indice:', calcularPromedio(roundRobin(procesos, quantum), 'indice'))
