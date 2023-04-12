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

export default ({ preProcesos }) => {
  return (
    <Card>
      <Title>Lista de procesos</Title>
      <Table className='mt-5'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Tiempo Llegada</TableHeaderCell>
            <TableHeaderCell>Ráfaga CPU</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {preProcesos.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>
                <Text>{item.tiempoLlegada}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.rafagaCPU}</Text>
              </TableCell>
              <TableCell>
                <BadgeDelta deltaType='unchanged'>Preparado</BadgeDelta>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {preProcesos.length === 0 && <div className='py-10 text-center text-gray-700 '>No hay procesos en cola</div>}
    </Card>
  )
}
