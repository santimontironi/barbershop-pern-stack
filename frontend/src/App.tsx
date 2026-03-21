import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./components/layout/Landing"
import ConfirmedUser from "./pages/ConfirmedUser"
import AuthProvider from "./context/AuthContext"
import LoginUser from "./pages/LoginUser"
import UserPanel from "./pages/UserPanel"
import VerifyAuth from "./components/auth/VerifyAuth"
import RegisterUser from "./pages/RegisterUser"
import LoginAdmin from "./pages/LoginAdmin"
import AdminPanel from "./pages/AdminPanel"
import NewTurn from "./pages/NewTurn"
import TurnProvider from "./context/TurnContext"
import ServiceProvider from "./context/ServiceContext"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<AuthProvider />}>
          <Route path="/confirmar/:token" element={<ConfirmedUser />} />
          <Route path="/ingreso-usuario" element={<LoginUser />} />
          <Route path="/registro-usuario" element={<RegisterUser />} />

          <Route element={<TurnProvider />}>
            <Route element={<ServiceProvider />}>
              <Route path="/panel-usuario" element={<VerifyAuth><UserPanel /></VerifyAuth>} />
              <Route path="/panel-admin" element={<VerifyAuth><AdminPanel /></VerifyAuth>} />
              <Route path="/ingreso-admin" element={<LoginAdmin />} />
              <Route path="/nuevo-turno" element={<VerifyAuth><NewTurn /></VerifyAuth>} />
            </Route>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App