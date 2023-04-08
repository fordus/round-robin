import { Button } from '@tremor/react'
import { PlusIcon } from '@heroicons/react/outline'

export default function AddButton () {
  return (
    <Button icon={PlusIcon} size='sm' className=''>
      Agregar a la lista
    </Button>
  )
}
