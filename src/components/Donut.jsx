import { Text, Card, Title, DonutChart } from '@tremor/react'

const valueFormatter = (number) =>
  `${number}`

const Donut = ({ listaCola }) => {
  const data = listaCola?.map((proceso) => {
    return {
      name: proceso.nombre,
      sales: proceso.rafagaCPU
    }
  })

  return (

    <Card className='max-w-xs'>
      <Title>Cola preparados</Title>
      <DonutChart
        className='mt-6'
        data={data}
        category='sales'
        index='name'
        valueFormatter={valueFormatter}
      />
      {listaCola?.map((proceso) => {
        return (
          <div key={proceso.nombre}>
            <Text>{proceso.nombre} {proceso.rafagaCPU}</Text>
          </div>
        )
      })}
    </Card>
  )
}

export default Donut
