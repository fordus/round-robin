import { Text, TextInput, Card, Title, Metric } from '@tremor/react'

export default function Header ({ children, setQuantum, isStarted }) {
  const handleOnChange = (e) => {
    if (isStarted) return
    setQuantum(e.target.value)
  }
  return (
    <>
      <Metric>Round Robin</Metric>
      <Title>Simulador de planificación Round-robin.</Title>
      <Text>Ingresa los procesos que deseas ejecutar y presiona el botón iniciar.</Text>
      <aside className='flex flex-col gap-4 py-3 sm:items-end sm:flex-row'>
        <Card className='flex flex-col gap-4 w-fit'>
          <Text>Quantum</Text>
          <TextInput name='name' type='number' className='w-11' onChange={handleOnChange} disabled={isStarted} placeholder='2' />
          {children}
        </Card>
      </aside>
    </>
  )
}
