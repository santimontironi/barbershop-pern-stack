import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import ConfirmedUser from "./pages/user/ConfirmedUser"
import AuthProvider from "./context/AuthContext"
import LoginUser from "./pages/user/LoginUser"
import UserPanel from "./pages/user/UserPanel"
import VerifyAuth from "./components/auth/VerifyAuth"
import RegisterUser from "./pages/user/RegisterUser"
import LoginAdmin from "./pages/admin/LoginAdmin"
import AdminPanel from "./pages/admin/AdminPanel"
import NewTurn from "./pages/user/NewTurn"
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