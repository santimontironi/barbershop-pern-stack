import { InfinitySpin } from "react-loader-spinner"

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <InfinitySpin width="200" color="#fff" />
    </div>
  )
}

export default Loader