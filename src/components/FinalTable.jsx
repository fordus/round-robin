import {
  BadgeDelta,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title
} from '@tremor/react'

export default ({ apps }) => {
  return (
    <Card>
      <Title>Lista de procesos terminados</Title>
      <Table className='mt-5'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Tiempo Llegada</TableHeaderCell>
            <TableHeaderCell>Ráfaga CPU</TableHeaderCell>
            <TableHeaderCell>Tiempo espera</TableHeaderCell>
            <TableHeaderCell>Tiempo servicio</TableHeaderCell>
            <TableHeaderCell>Tiempo final</TableHeaderCell>
            <TableHeaderCell>Indice</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apps.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>
                <Text>{item.tiempoLlegada}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.rafagaCPU}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.tiempoEspera}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.tiempoServicio}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.tiempoFinalizacion}</Text>
              </TableCell>
              <TableCell>
                <Text>{Math.round(item.indice * 100) / 100}</Text>
              </TableCell>
              <TableCell>
                <BadgeDelta deltaType='decrease'>Terminado</BadgeDelta>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {apps.length === 0 && <div className='py-10 text-center text-gray-700 '>No hay procesos en cola</div>}
    </Card>
  )
}
