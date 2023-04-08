import { ClockIcon } from '@heroicons/react/outline'
import {
  Badge,
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

export default ({ apps, isStarted }) => {
  return (
    <Card>
      <Title>Lista de procesos</Title>
      <Table className='mt-5'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre proceso</TableHeaderCell>
            <TableHeaderCell>Orden de llegada</TableHeaderCell>
            <TableHeaderCell>Ráfaga de CPU restante</TableHeaderCell>
            <TableHeaderCell>Tiempo finalización</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apps.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>
                <Text>{item.ordenLlegada}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.rafagaCPU <= 0 ? 0 : item.rafagaCPU}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.tiempoFinalizacion === -1 ? 'N/A' : item.tiempoFinalizacion}
                </Text>
              </TableCell>
              <TableCell>
                {item.rafagaCPU <= 0 && <BadgeDelta deltaType='decrease'>Terminado</BadgeDelta>}
                {item.rafagaCPU > 0 && isStarted && <Badge icon={ClockIcon}>En proceso</Badge>}
                {item.rafagaCPU > 0 && !isStarted && <BadgeDelta deltaType='unchanged'>Preparado</BadgeDelta>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {apps.length === 0 && <div className='py-10 text-center text-gray-700 '>No hay procesos en cola</div>}
    </Card>
  )
}
