import { Button } from '@tremor/react'
import { RefreshIcon } from '@heroicons/react/outline'

export default ({ resetProgram }) => (
  <Button icon={RefreshIcon} className='w-40 h-10' onClick={resetProgram} variant='secondary'>
    Reiniciar
  </Button>
)
