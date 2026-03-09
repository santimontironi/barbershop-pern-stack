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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<AuthProvider />}>
          <Route path="/confirmar/:token" element={<ConfirmedUser />} />
          <Route path="/ingreso-usuario" element={<LoginUser />} />
          <Route path="/registro-usuario" element={<RegisterUser />} />


          <Route path="/panel-usuario" element={<VerifyAuth><UserPanel /></VerifyAuth> }/>

          <Route path="/panel-admin" element={<VerifyAuth><AdminPanel /></VerifyAuth>} />
          <Route path="/ingreso-admin" element={<LoginAdmin />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App