import { TextInput, Button } from '@tremor/react'

export default () => (
  <div className='grid gap-3'>
    <TextInput />
    <TextInput />
    <TextInput />
    <Button size='sm' className='m-auto w-fit' onClick={() => console.log('clicked')}>
      Read more
    </Button>
  </div>
)
