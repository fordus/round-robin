import { useEffect, useState } from 'react'

const quantum = 2

export function useRoundRobin ({ listaProcesos: listaProcesosInicio, isStarted }) {
  const [procesosTerminados, setProcesosTerminados] = useState([])
  const [procesosCola, setProcesosCola] = useState([])
  const [enProceso, setEnProceso] = useState(null)
  const [tiempoActual, setTiempoActual] = useState(0)
  const [listaProcesosInicial, setListaProcesosInicial] = useState([])

  let listaProcesos = listaProcesosInicio.map(proceso => ({ ...proceso, rafagaCPUInicio: proceso.rafagaCPU }))
  let tiempo = 0
  let completado = []
  let cola = []
  let contador = 0
  let procesoActual = null

  useEffect(() => {
    if (isStarted) {
      const intervalId = setInterval(() => {
        const newCola = listaProcesos.filter(proceso => proceso.tiempoLlegada === tiempo)
        const newListaProcesos = listaProcesos.filter(proceso => proceso.tiempoLlegada !== tiempo)
        cola = [...cola, ...newCola]
        listaProcesos = newListaProcesos

        if (cola.length > 0 && procesoActual === null) {
          procesoActual = cola.shift()
          setEnProceso(procesoActual)
        }

        setProcesosCola(cola)
        setTiempoActual(tiempo)
        setListaProcesosInicial(listaProcesos)

        if (procesoActual !== null && procesoActual.rafagaCPU !== 0 && contador <= quantum) {
          procesoActual.rafagaCPU--
          if (procesoActual.rafagaCPU === 0) {
            completado = [
              ...completado,
              {
                id: procesoActual.id,
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
            setProcesosTerminados(completado)
            setEnProceso(procesoActual)
          } else {
            contador++
            if (contador === quantum) {
              const newCola = listaProcesos.filter(proceso => proceso.tiempoLlegada === tiempo + 1)
              const newListaProcesos = listaProcesos.filter(proceso => proceso.tiempoLlegada !== tiempo + 1)
              cola = [...cola, ...newCola]
              listaProcesos = newListaProcesos
              cola = [...cola, procesoActual]

              contador = 0
              procesoActual = null
              setEnProceso(procesoActual)
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
