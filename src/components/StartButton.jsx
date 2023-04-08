import { Button } from '@tremor/react'
import { CogIcon } from '@heroicons/react/outline'

export default ({ startProgram, isStarted }) => (
  <Button icon={CogIcon} className='w-40 h-10' onClick={startProgram} disabled={isStarted}>
    Iniciar
  </Button>
)
