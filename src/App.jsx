import { useCallback, useEffect, useRef, useState } from 'react'
import './index.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [btnclass,setBtnClass]=useState(false)
  const [lastpass,setLastPass]=useState(null)


  const passref=useRef(null)
  const passwordGenerator=useCallback(()=>{
    setLastPass(password)
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed)   str+="0123456789";
 
    if(charAllowed) str+="!@#$%^&*()-+{}~`]["

    for (let i = 0; i < length; i++) {
      let char=Math.floor(Math.random()*str.length + 1);
      pass+=str.charAt(char);

    }
    setBtnClass(false)
    setPassword(pass)
    console.log(pass)
    // return pass;
  },[length,charAllowed,numberAllowed,setPassword])

const copyTOClip=useCallback(()=>{
  passref.current?.select();
  setBtnClass(true)
  // passref.current?.setSelectionRange(0,4)
  window.navigator.clipboard.writeText(passref.current.value)
  // document.querySelector('.btn').innerHTML="Copied"
  // btnref.current.setValue="copied"
//   setTimeout(() => {
//     // setBtnClass(false)
// }, 2000);
},[password,lastpass])

useEffect(()=>{
passwordGenerator();
},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="bg-red-200  flex content-center justify-around mx-auto">
        
        <p className="text-xl font-medium ">Password Generator using React-js with Vite</p>
       
      </div>
      <div className='w-[500px] h-[150px] bg-white max-w-md text-center mx-auto shadow-lg border-transparent rounded-lg px-4 my-10 text-zinc-600'>
        Password Generator
        <div className='flex content-center justify-center items-end shadow rounded-lg overflow-hidden mb-4'>
<input 
ref={passref}
type='text'
value={password}
className='outline-none w-full py-1 px-3'
placeholder='password'
readOnly
/>
<button onClick={copyTOClip}
className='btn outline-none bg-slate-500 text-teal-300 px-3 py-1 shrink-0'>{btnclass?'Copied':'Copy'}</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type='range'
            min={6}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{
              setlength(e.target.value)
            }}
            />
            <label>Length:{length}</label>
          </div>
            <div className='flex items-center gap-x-1'>
            <input 
            type='checkbox'
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>
            {
              setnumberAllowed((prev)=>!prev);
            }
            }
            />
            <label htmlFor="numberAllowed">Numbers</label>

            </div>
            <div className='flex items-center gap-x-1'>
            <input 
            type='checkbox'
            defaultChecked={charAllowed}
            id='charInput'
            onChange={()=>
            {
              setcharAllowed((prev)=>!prev);
            }
            }
            />
            <label htmlFor="numberAllowed">Characters</label>

            </div>
        </div>
        <div className='flex float-start my-3'>
          <label htmlFor="lastpass">Last Password Copied : </label>
            <h4 className='mx-2 text-red-400'>{lastpass}</h4>
        </div>
      </div>
      
    </>
  )
}

export default App
