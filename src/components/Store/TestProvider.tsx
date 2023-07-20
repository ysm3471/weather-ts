import React, { createContext, useContext, useState } from 'react'

export type test = {
  print:(str:string) => void,
  setStr:React.Dispatch<React.SetStateAction<string>>,
  str:string
}

export const TestContext = createContext<test | null>(null)

export default function TestProvider({children}:{children:React.ReactNode}) {
  const [str,setStr] = useState<string>("test");

  const [number, setNumber] = useState<number>(1);    // api의 페이지넘버
  
  
  function print(str:string) {
    console.log(str,"print")
  }

  return (
    <TestContext.Provider value={{str,setStr,print}}>
      {children}
    </TestContext.Provider>
  )
}

export function useTestContext() {
  const ctx = useContext(TestContext);
  if(!ctx) throw new Error('Cannot not find Context');
  console.log(ctx);
  return ctx
}
