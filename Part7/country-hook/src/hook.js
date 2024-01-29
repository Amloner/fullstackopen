import React, { useState, useEffect } from 'react'
import axios from 'axios'


export const useField = (type) => {
  const [value, setValue] = useState('')

  useEffect(() => {
   
    // skip if currency is not defined
   
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`+'finland')
        .then(response => {
          setRates(response.data)
        })
       
  }, [])



  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = (event) => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,clear
  }
}

// modules can have several named exports

export const useAnotherHook = () => {
  // ...
}