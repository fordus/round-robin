import { TextInput, Flex, Text, Title, Card } from '@tremor/react'
import AddButton from './AddButton'

export default ({ addData, toast }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const { nombre, tiempoLlegada, rafagaCPU } = Object.fromEntries(data.entries())

    if (!nombre.trim() || !tiempoLlegada.trim() || !rafagaCPU.trim()) {
      toast.error('Ingresa los datos del proceso')
      return
    }

    if (isNaN(tiempoLlegada) || isNaN(rafagaCPU)) {
      toast.error('Ingresa un número en el tiempo de llegada y la rafaga de CPU')
      return
    }

    if (tiempoLlegada <= 0 || rafagaCPU <= 0) {
      toast.error('Ingresa un número positivo en el tiempo de llegada y la rafaga de CPU')
      return
    }

    addData({ nombre, tiempoLlegada, rafagaCPU })
    toast.success('Proceso agregado')
    e.target.reset()
  }
  return (
    <Card className='max-w-xs h-fit'>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-3'>
          <Title>Agregar proceso</Title>
          <Text>Nombre del proceso</Text>
          <TextInput name='nombre' placeholder='Firefox' />
          <Text>Orden de llegada</Text>
          <TextInput name='tiempoLlegada' placeholder='2' type='number' />
          <Text>Ráfaga de CPU </Text>
          <TextInput name='rafagaCPU' placeholder='2' type='number' />
          <Flex>
            <AddButton />
          </Flex>
        </div>
      </form>
    </Card>

  )
}
