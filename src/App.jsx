import './App.css'
import CheckInstances from './components/CheckInstances'
import ModulePicker from './components/ModulePicker/ModulePicker'
import Navbar from './components/Navbar/Nav'
import AppContextProvider from './contexts/context'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

    return (
        <AppContextProvider>

            <Navbar />
            <ModulePicker />
            <Router>
                <Routes>
                    <Route path='/' element={<CheckInstances />} />
                </Routes>
            </Router>

        </AppContextProvider>
    )
}

export default App
