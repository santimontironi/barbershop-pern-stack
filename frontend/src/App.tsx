import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./components/Landing"
import ConfirmedUser from "./pages/ConfirmedUser"
import AuthProvider from "./context/AuthContext"
import LoginUser from "./pages/LoginUser"
import UserPanel from "./pages/UserPanel"
import VerifyAuth from "./components/VerifyAuth"
import RegisterUser from "./pages/RegisterUser"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>

      <AuthProvider>
        <Routes>
          <Route path='/confirmar/:token' element={<ConfirmedUser />} />

          <Route path='/ingreso-usuario' element={<LoginUser />} />
          
          <Route path='/registro-usuario' element={<RegisterUser />} />

          <Route path='/panel-usuario' element={
            <VerifyAuth>
              <UserPanel />
            </VerifyAuth>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App