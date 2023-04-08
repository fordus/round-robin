import { Card, List, ListItem, Title } from '@tremor/react'

export default ({ data, listaDeRafagas = [] }) => {
  const tiempoServicio = data?.reduce((acc, curr) => acc + (curr.tiempoFinalizacion - curr.ordenLlegada), 0) / data?.length
  let tiempoEspera = 0
  let mediaIndiceServicio = 0

  if (listaDeRafagas.length > 0) {
    let contador = 0
    const arrayConTiempoEspera = data?.map((item) => {
      const rafaga = item.tiempoFinalizacion - item.ordenLlegada - listaDeRafagas[contador]
      contador++
      return rafaga
    })

    tiempoEspera = arrayConTiempoEspera?.reduce((acc, curr) => acc + curr, 0) / arrayConTiempoEspera?.length
  }

  if (listaDeRafagas.length > 0) {
    let contador = 0
    const arrayIndiceServicio = data?.map((item) => {
      const indiceServicio = listaDeRafagas[contador] / (item.tiempoFinalizacion - item.ordenLlegada)
      contador++
      return indiceServicio
    })

    mediaIndiceServicio = arrayIndiceServicio?.reduce((acc, curr) => acc + curr, 0) / arrayIndiceServicio?.length
    mediaIndiceServicio = Math.round(mediaIndiceServicio * 100) / 100
  }

  return (
    <Card className='max-w-xs'>
      <Title>Resultados</Title>

      <List>
        <ListItem>
          <span>Media tiempo de servicio</span>
          <span>{tiempoServicio}</span>
        </ListItem>
        <ListItem>
          <span>Media tiempo de espera</span>
          <span>{tiempoEspera}</span>
        </ListItem>
        <ListItem>
          <span>Media índice de servicio</span>
          <span>{mediaIndiceServicio}</span>
        </ListItem>
      </List>
    </Card>
  )
}
