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

    <Card>
      <Title>Cola preparados</Title>
      <div className='flex flex-row'>
        <div className='mt-7 min-w-[8rem]'>
          {listaCola?.map((proceso) => {
            return (
              <div key={proceso.nombre}>
                <Text className='text-base text-[#3f4553]'><strong>{proceso.nombre}</strong>  {proceso.rafagaCPU}</Text>
              </div>
            )
          })}
        </div>
        <DonutChart
          className='max-w-[12rem] p-0 mt-6'
          data={data}
          category='sales'
          index='name'
          valueFormatter={valueFormatter}
        />

      </div>
    </Card>

  )
}

export default Donut
