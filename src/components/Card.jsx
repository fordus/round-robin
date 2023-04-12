import { Card, Metric, Text } from '@tremor/react'

export default ({ procesoActual }) => (
  <Card className='max-w-xs h-fit' decoration='top' decorationColor='indigo'>
    <Text>Ùltimo proceso en CPU</Text>
    <Metric>{procesoActual?.nombre || 'Ninguno'}</Metric>
  </Card>
)
