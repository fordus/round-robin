import { useEffect, useState, useRef } from 'react'

import { toast } from 'sonner'

const apps = [
  {
    id: window.crypto.getRandomValues(new Uint32Array(1))[0],
    nombre: 'Calculadora',
    ordenLlegada: 0,
    rafagaCPU: 3,
    tiempoFinalizacion: -1,
    ejecucionActual: 0
  },
  {
    id: window.crypto.getRandomValues(new Uint32Array(1))[0],
    nombre: 'Word',
    ordenLlegada: 1,
    rafagaCPU: 4,
    tiempoFinalizacion: -1,
    ejecucionActual: 0
  },
  {
    id: window.crypto.getRandomValues(new Uint32Array(1))[0],
    nombre: 'Paint',
    ordenLlegada: 3,
    rafagaCPU: 6,
    tiempoFinalizacion: -1,
    ejecucionActual: 0
  },
  {
    id: window.crypto.getRandomValues(new Uint32Array(1))[0],
    nombre: 'Excel',
    ordenLlegada: 5,
    rafagaCPU: 5,
    tiempoFinalizacion: -1,
    ejecucionActual: 0
  },
  {
    id: window.crypto.getRandomValues(new Uint32Array(1))[0],
    nombre: 'PowerPoint',
    ordenLlegada: 4,
    rafagaCPU: 3,
    tiempoFinalizacion: -1,
    ejecucionActual: 0
  }
]

export default function useApp () {
  const cola = useRef([])
  const contadorQuantum = useRef(0)
  const listaDeRafagas = useRef([])
  const terminados = useRef(new Map())
  const [currentData, setCurrentData] = useState(apps)
  const [currentStats, setCurrentStats] = useState({
    quantum: 2,
    instante: 0
  })
  const [isStarted, setIsStarted] = useState(false)

  const addData = ({ nombre, ordenLlegada, rafagaCPU }) => {
    const id = window.crypto.getRandomValues(new Uint32Array(1))[0]
    const tiempoFinalizacion = -1
    const ejecucionActual = 0
    const newData = [...currentData, { id, nombre, ordenLlegada, rafagaCPU, tiempoFinalizacion, ejecucionActual }]

    newData.sort((a, b) => a.ordenLlegada - b.ordenLlegada)
    setCurrentData(newData)
  }

  const startProgram = () => {
    if (currentData.length === 0) {
      toast.error('No hay datos para iniciar el programa')
      return
    }

    if (currentStats.quantum < 1) {
      toast.error('El quantum debe ser mayor a 0')
      return
    }

    setIsStarted(true)

    toast.success('Programa iniciado')
  }

  const resetProgram = () => {
    setIsStarted(false)
    setCurrentData([])
    setCurrentStats({
      quantum: 2,
      instante: 0
    })
    contadorQuantum.current = 0
    cola.current = []
    terminados.current = new Map()

    toast.success('Datos reiniciados')
  }

  const setQuantum = (quantum) => {
    const newQuantum = parseInt(quantum)
    setCurrentStats({ ...currentStats, quantum: newQuantum })
  }

  useEffect(() => {
    if (!isStarted) {
      return
    }

    listaDeRafagas.current = currentData.map((item) => item.rafagaCPU)

    const interval = setInterval(() => {
      if (contadorQuantum.current === parseInt(currentStats.quantum)) {
        contadorQuantum.current = 0
        if (cola.current.at(-1)) {
          cola.current.unshift(cola.current.pop())
        }
      }

      contadorQuantum.current++

      currentData.forEach((item) => {
        if (item.rafagaCPU > 0 && item.ordenLlegada === currentStats.instante) {
          cola.current.unshift(item.nombre)
        }

        if (item.rafagaCPU > 0 && item.nombre === cola.current.at(-1) && contadorQuantum.current <= currentStats.quantum) {
          // console.log('Ejecutando: ', item.nombre)
          item.rafagaCPU--
          item.ejecucionActual++
        }

        if (item.rafagaCPU <= 0 && !terminados.current.has(item.nombre)) {
          terminados.current.set(item.nombre, currentStats.instante)
          item.tiempoFinalizacion = currentStats.instante
          cola.current.pop()
          contadorQuantum.current = 0
        }
      })

      setCurrentStats({ ...currentStats, instante: currentStats.instante + 1 })

      // console.log(`Instante actual: ${currentStats.instante} ContadorQuantum: ${contadorQuantum.current} currentProcess: ${cola.current.at(-1)} quantum: ${currentStats.quantum}`)
      // console.log('Cola: ', cola)
    }, 2000)

    if (currentData.every((item) => item.rafagaCPU <= 0)) {
      clearInterval(interval)
      toast.success('Programa finalizado')
    }

    return () => clearInterval(interval)
  }, [isStarted, currentStats, currentData])

  return {
    currentData,
    isStarted,
    addData,
    startProgram,
    resetProgram,
    setQuantum,
    currentStats,
    listaDeRafagas
  }
}
