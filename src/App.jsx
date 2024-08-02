import './App.css'
import CheckInstances from './components/CheckInstances'
import ModulePicker from './components/ModulePicker/ModulePicker'
import Navbar from './components/Navbar/Nav'
import AppContextProvider from './contexts/context'

function App() {

    return (
        <AppContextProvider>
            <div>
                <Navbar />
                <ModulePicker />
                <CheckInstances />
            </div>
        </AppContextProvider>
    )
}

export default App
