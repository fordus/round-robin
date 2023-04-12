import { BarList, Card, Title, Bold, Flex, Text } from '@tremor/react'

export default ({ listaTerminados }) => {
  const data = listaTerminados?.map((item) => {
    return {
      key: item.id,
      name: item.nombre,
      value: item.ejecucionActual
    }
  })

  return (
    <Card className='max-w-full'>
      <Title>Ejecución de procesos</Title>
      <Flex className='mt-4'>
        <Text>
          <Bold>Nombre</Bold>
        </Text>
        <Text>
          <Bold>Progreso total</Bold>
        </Text>
      </Flex>
      <BarList data={data} className='mt-2' />
    </Card>
  )
}
