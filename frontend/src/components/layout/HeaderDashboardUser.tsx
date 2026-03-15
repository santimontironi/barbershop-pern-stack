import type { HeaderDashboardUserProps } from "../../types"
import { Link } from "react-router-dom"

const HeaderDashboardUser = ({ photo, name, logout }: HeaderDashboardUserProps) => {
  return (
    <header className="w-full bg-blue-950 border-b shadow-[10px_10px_12px_rgba(0,0,0,0.5)] sticky top-0 z-50">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 px-5 py-4 md:px-8 md:py-0 md:h-20 xl:px-30 xl:h-24 2xl:px-60">

        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative shrink-0">
            <img
              src={photo}
              alt={name}
              className="w-11 h-11 md:w-12 md:h-12 xl:w-14 xl:h-14 2xl:h-18 2xl:w-18 rounded-full object-cover border-2 border-red-500 ring-2 ring-red-500/20"
            />
          </div>
          <div>
            <span className="block text-blue-300 text-[10px] xl:text-xs tracking-widest uppercase">
              Panel de usuario
            </span>
            <h1 className="text-white font-serif font-bold text-base md:text-lg xl:text-xl 2xl:text-2xl leading-tight">
              {name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Link to="/editar-perfil" className="flex items-center gap-2 px-3 py-2 md:px-4 xl:px-5 xl:py-2.5 rounded-lg border border-blue-700 text-blue-200 text-xs xl:text-sm font-medium tracking-wide transition-all duration-200 hover:border-white hover:text-white hover:bg-white/10 cursor-pointer">
            <i className="bi bi-person-gear text-base xl:text-lg" />
            <span>Editar perfil</span>
          </Link>
          <button onClick={logout} className="flex items-center gap-2 px-3 py-2 md:px-4 xl:px-5 xl:py-2.5 rounded-lg border border-red-500 bg-red-500/10 text-red-400 text-xs xl:text-sm font-medium tracking-wide transition-all duration-200 hover:bg-red-500 hover:text-white cursor-pointer">
            <i className="bi bi-box-arrow-right text-base xl:text-lg" />
            <span>Cerrar sesión</span>
          </button>
        </div>

      </div>
    </header>
  )
}

export default HeaderDashboardUser