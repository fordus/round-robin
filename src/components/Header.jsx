import { CogIcon, RefreshIcon, ArrowDownIcon } from '@heroicons/react/outline'
import { Button, Text, TextInput, Card, Title, Metric } from '@tremor/react'

export default function Header ({ setQuantum, isStarted, toast, startProgram, resetProgram, setExampleData }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isStarted) return

    const data = new FormData(e.target)
    const { quantum } = Object.fromEntries(data.entries())

    if (quantum === '') {
      toast.error('Ingresa un quantum válido.')
      return
    }

    if (quantum < 1) {
      toast.error('Ingresa un quantum mayor a 0.')
      return
    }
    setQuantum(quantum)
    startProgram()
  }
  return (
    <>
      <Metric>Round Robin</Metric>
      <Title>Simulador de planificación Round-robin.</Title>
      <Text>Ingresa los procesos que deseas ejecutar y presiona el botón iniciar.</Text>
      <aside className='flex flex-col gap-4 py-3 sm:items-end sm:flex-row'>
        <Card className='flex flex-col gap-4 w-fit'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <Text>Quantum</Text>
            <TextInput name='quantum' type='number' className='w-11' disabled={isStarted} placeholder='2' defaultValue='2' />
            <Button icon={CogIcon} className='w-40 h-10' disabled={isStarted}>
              Iniciar
            </Button>
          </form>
          <Button icon={ArrowDownIcon} className='w-40 h-10' variant='secondary' onClick={setExampleData}>
            Cargar ejemplo
          </Button>
          <Button icon={RefreshIcon} className='w-40 h-10' variant='secondary' onClick={resetProgram}>
            Reiniciar
          </Button>
        </Card>
      </aside>
    </>
  )
}
