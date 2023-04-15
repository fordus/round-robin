import { Card, List, ListItem, Title } from '@tremor/react'

function calcularPromedio (procesos, propiedad) {
  if (procesos.length === 0) return 0
  return procesos.reduce((acumulador, proceso) => acumulador + proceso[propiedad], 0) / procesos.length
}

export default ({ listaTerminados, tiempo = 0 }) => {
  const promedioTiempoServicio = calcularPromedio(listaTerminados, 'tiempoServicio')
  const promedioTiempoEspera = calcularPromedio(listaTerminados, 'tiempoEspera')
  const promedioIndice = calcularPromedio(listaTerminados, 'indice')
  return (
    <Card className='max-w-xs'>
      <Title>Resultados</Title>
      <List>
        <ListItem>
          <span>Tiempo actual</span>
          <span>{tiempo}</span>
        </ListItem>
        <ListItem>
          <span>Tiempo de servicio</span>
          <span>{promedioTiempoServicio.toFixed(2)}</span>
        </ListItem>
        <ListItem>
          <span>Tiempo de espera</span>
          <span>{promedioTiempoEspera.toFixed(2)}</span>
        </ListItem>
        <ListItem>
          <span>Índice de servicio</span>
          <span>{promedioIndice.toFixed(2)}</span>
        </ListItem>
      </List>
    </Card>
  )
}
