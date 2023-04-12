import { useEffect, useState } from 'react'

const quantum = 2

export function useRoundRobin ({ listaProcesos: listaProcesosInicio, isStarted }) {
  const [procesosTerminados, setProcesosTerminados] = useState([])
  const [procesosCola, setProcesosCola] = useState([])
  const [enProceso, setEnProceso] = useState(null)
  const [tiempoActual, setTiempoActual] = useState(0)
  const [listaProcesosInicial, setListaProcesosInicial] = useState([])

  const listaProcesos = listaProcesosInicio.map(proceso => ({ ...proceso, rafagaCPUInicio: proceso.rafagaCPU }))
  let tiempo = 0
  const completado = []
  const cola = []
  let contador = 0
  let procesoActual = null

  useEffect(() => {
    if (isStarted) {
      const intervalId = setInterval(() => {
        listaProcesos.forEach(proceso => {
          if (proceso.tiempoLlegada === tiempo) {
            cola.push(proceso)
            listaProcesos.splice(listaProcesos.indexOf(proceso), 1)
          }
        })

        if (cola.length > 0 && procesoActual === null) {
          procesoActual = cola.shift()
        }

        setProcesosTerminados(completado)
        setProcesosCola(cola)
        setEnProceso(procesoActual)
        setTiempoActual(tiempo)
        setListaProcesosInicial(listaProcesos)

        if (procesoActual !== null && procesoActual.rafagaCPU !== 0 && contador <= quantum) {
          procesoActual.rafagaCPU--
          if (procesoActual.rafagaCPU === 0) {
            completado.push({
              id: procesoActual.id,
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

        if ((listaProcesos.length === 0) && (cola.length === 0) && (procesoActual === null)) {
          clearInterval(intervalId)
        }
      }, 2000)
    }
  }, [isStarted, listaProcesosInicio])

  return {
    listaTerminados: procesosTerminados,
    procesosCola,
    enProceso,
    tiempo: tiempoActual,
    listaProcesosInicial
  }
}
