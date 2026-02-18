import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./components/Landing"
import ConfirmedUser from "./pages/ConfirmedUser"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path='/confirmar/:token' element={<ConfirmedUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App