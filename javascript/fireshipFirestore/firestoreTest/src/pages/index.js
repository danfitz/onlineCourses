import React, { useEffect } from 'react'
import { db } from '../firebase'

export default () => {
  useEffect(() => {
    db.collection('users').get()
      .then(snapshot => {
        console.log(snapshot)
        snapshot.forEach(doc => console.log(doc.data()))
      })
  }, [])
  
  return (
    <div>Hello world!</div>
  )
}