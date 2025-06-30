import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import PrintUploader from './printuploader.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      

  <div className="bg-red-500 text-white p-4 text-center">
  Automated Printer
</div>
    <PrintUploader />

    </>
  )
}

export default App
