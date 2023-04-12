
// import BarList from './components/BarList'
import CardList from './components/CardList'
import Form from './components/Form'
import StartButton from './components/StartButton'
import ResetButton from './components/ResetButton'
import useApp from './hooks/useApp'
import { Toaster, toast } from 'sonner'
import Table from './components/Table'
import Header from './components/Header'
import Donut from './components/Donut'
import Card from './components/Card'
import EntryTable from './components/EntryTable'
import FinalTable from './components/FinalTable'

function App () {
  const {
    isStarted,
    addData,
    startProgram,
    resetProgram,
    listaProcesos,
    listaCola,
    listaTerminados,
    tiempo,
    setQuantum,
    procesoActual,
    preProcesos
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
          <EntryTable apps={listaProcesos} preProcesos={preProcesos} />
        </div>

        <div className='flex flex-col gap-4 sm:flex-row '>
          <Table apps={listaCola} isStarted={isStarted} />
          <Donut listaCola={listaCola} />
        </div>
        <FinalTable apps={listaTerminados} />
        <div className='flex flex-col gap-4 sm:flex-row '>
          <CardList
            listaTerminados={listaTerminados}
            tiempo={tiempo}
          />

          <Card procesoActual={procesoActual} />
        </div>

        {/* <BarList listaTerminados={listaTerminados} /> */}
      </div>
    </main>
  )
}

export default App
