import cloudflareLogo from './assets/Cloudflare_Logo.svg'
import './App.css'

function App() {


  return (
    <>  
    <header className='flex justify-between items-center border-b border-gray-500'>
      <img className='h-16' src={cloudflareLogo} alt='cloudflare logo' />
      <input className='border border-gray-500 rounded-md p-2' type='text' placeholder='Search' />
    </header>
    <main className=''>
      <h1 className='text-3xl font-bold underline'>Main content here</h1>
    </main>
    </>
    
  )
}

export default App
