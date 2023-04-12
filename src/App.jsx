
// import BarList from './components/BarList'
import CardList from './components/CardList'
import Form from './components/Form'
import useApp from './hooks/useApp'
import { Toaster, toast } from 'sonner'
import Table from './components/Table'
import Header from './components/Header'
import Donut from './components/Donut'
import Card from './components/Card'
import EntryTable from './components/EntryTable'
import FinalTable from './components/FinalTable'
import ReadyTable from './components/ReadyTable'

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
    listaProcesosInicial,
    setExampleData
  } = useApp({ toast })

  console.log(listaTerminados)
  return (

    <main className='relative'>
      <Toaster expand />
      <div className='absolute opacity-20 h-full w-full bg-[url(https://www.tremor.so/grid.svg)] [background-position:calc(100%+5px)_calc(100%+29px)]' />
      <div className='relative flex flex-col max-w-5xl min-h-[101vh] gap-4 px-4 py-20 m-auto'>
        <Header
          setQuantum={setQuantum}
          isStarted={isStarted}
          toast={toast}
          startProgram={startProgram}
          resetProgram={resetProgram}
          setExampleData={setExampleData}
        />

        <div className='flex flex-col gap-4 sm:flex-row '>
          {isStarted && <ReadyTable preProcesos={listaProcesosInicial} />}
          {!isStarted && <EntryTable apps={listaProcesos} />}
          {!isStarted && <Form addData={addData} toast={toast} />}
        </div>

        <div className='flex flex-col gap-4 sm:flex-row '>
          {isStarted && <Table apps={listaCola} isStarted={isStarted} />}
          {isStarted && <Donut listaCola={listaCola} />}
        </div>
        {isStarted && <FinalTable apps={listaTerminados} />}
        <div className='flex flex-col gap-4 sm:flex-row '>
          {isStarted && <CardList
            listaTerminados={listaTerminados}
            tiempo={tiempo}
                        />}

          {isStarted && <Card procesoActual={procesoActual} />}
        </div>

      </div>
    </main>
  )
}

export default App
