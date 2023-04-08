import { TextInput, Flex, Text, Title, Card } from '@tremor/react'
import AddButton from './AddButton'

export default ({ addData, toast }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const { nombre, ordenLlegada, rafagaCPU } = Object.fromEntries(data.entries())

    if (!nombre.trim() || !ordenLlegada.trim() || !rafagaCPU.trim()) {
      toast.error('Ingresa los datos del proceso')
      return
    }

    addData({ nombre, ordenLlegada, rafagaCPU })
    toast.success('Proceso agregado')
    e.target.reset()
  }
  return (
    <Card className='max-w-xs h-fit'>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-3'>
          <Title>Agregar proceso</Title>
          <Text>Nombre del proceso</Text>
          <TextInput name='nombre' placeholder='' />
          <Text>Orden de llegada</Text>
          <TextInput name='ordenLlegada' placeholder='' type='number' />
          <Text>Ráfaga de CPU </Text>
          <TextInput name='rafagaCPU' placeholder='' type='number' />
          <Flex>
            <AddButton />
          </Flex>
        </div>
      </form>
    </Card>

  )
}
