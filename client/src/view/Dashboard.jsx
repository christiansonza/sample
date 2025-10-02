import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector} from 'react-redux';
import { addProd, getProd,logOut,deleteProd} from '../slice/itemSlice';
import {useNavigate} from 'react-router-dom'

function Dashboard() {
  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const dispatch = useDispatch()
  const {items,loading,error} = useSelector(state=>state.items)
  const navigate = useNavigate()

  const addproducts = ()=>{

    if(!name.trim() || !price.trim()) return console.log('all fields are required')
    dispatch(addProd({name:name,price:price}))
    setName('')
    setPrice('')
  }

  useEffect(()=>{
    dispatch(getProd())
  },[dispatch])

const handleLogout = ()=>{
  dispatch(logOut())
  navigate('/login')
}
const delbtn = (id)=>{
  dispatch(deleteProd(id))
}
  if(loading) return <p>loading...</p>
  if(error) return <p>{error}</p>
  return (
    <section>
      <button onClick={handleLogout}>logout</button>
      <input type="text"
      value={name} onChange={e=>setName(e.target.value)}
      />
      <input type="text"
      value={price} onChange={e=>setPrice(e.target.value)}
      />
      <button onClick={addproducts}>add</button>

      {items.map(item=>(
        <div key={item._id} className='cards'>
          <p>{item.name}</p>
          <p>{item.price}</p>
          <button onClick={()=>delbtn(item._id)}>x</button>
        </div>
      ))}
    </section>
  )
}

export default Dashboard