import { Title, Card, Metric, Grid } from '@tremor/react'
import BarList from './components/BarList'
import CardList from './components/CardList'
import Form from './components/Form'

function App () {
  return (
    <main class='relative'>
      <div class='absolute opacity-20 h-full w-full bg-[url(https://www.tremor.so/grid.svg)] [background-position:calc(100%+5px)_calc(100%+29px)]' />
      <div className='relative flex flex-col max-w-3xl min-h-screen gap-4 py-40 m-auto '>
        <Metric>Round Robin</Metric>
        <Title>Drei Weieren is an oasis of peace in the middle of St.Gallen.</Title>
        <Card className='max-w-md mx-auto'>
          <Form />
        </Card>
        <Grid numCols={1} numColsSm={2} numColsLg={2} className='gap-2'>
          <BarList />
          <CardList />
        </Grid>

      </div>

    </main>
  )
}

export default App
