
import BarList from './components/BarList'
import CardList from './components/CardList'
import Form from './components/Form'
import StartButton from './components/StartButton'
import ResetButton from './components/ResetButton'
import useApp from './hooks/useApp'
import { Toaster, toast } from 'sonner'
import Table from './components/Table'
import Header from './components/Header'

function App () {
  const {
    currentData,
    addData,
    startProgram,
    resetProgram,
    isStarted,
    setQuantum,
    listaDeRafagas,
    currentStats
  } = useApp({ toast })

  return (
    <main className='relative'>
      <Toaster expand />
      <div className='absolute opacity-20 h-full w-full bg-[url(https://www.tremor.so/grid.svg)] [background-position:calc(100%+5px)_calc(100%+29px)]' />
      <div className='relative flex flex-col max-w-5xl min-h-[101vh] gap-4 px-4 py-20 m-auto'>
        <Header setQuantum={setQuantum} isStarted={isStarted}>
          <StartButton startProgram={startProgram} isStarted={isStarted} />
          <ResetButton resetProgram={resetProgram} />
        </Header>
        <div className='flex flex-col gap-4 sm:flex-row '>
          {!isStarted && <Form addData={addData} toast={toast} />}
          <Table apps={currentData} isStarted={isStarted} />
        </div>
        {isStarted && <BarList apps={currentData} />}
        {isStarted && <CardList data={currentData} listaDeRafagas={listaDeRafagas.current} currentStats={currentStats} />}
      </div>
    </main>
  )
}

export default App
