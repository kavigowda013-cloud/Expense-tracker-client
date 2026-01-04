import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExpenseTable from '../Components/Table'
import FloatingAddButton from '../Components/FlotingAddButton'
import axios from 'axios'
import { baseurl } from '../api'

export default function View() {
  const [allExpense,setAllExpense]=useState([])

  const fetchAllExpense=async()=>{
  try {
    const res=await axios.get(`${baseurl}/api/expense/view-all`)
    //console.log(res.data);
    if(res.data.success){
      setAllExpense(res.data.expenses)
    }
    
  } catch (error) {
    console.log(error);
  } 
    
  }
  // useEffect(arrowFunction, dependency)
  useEffect(()=>{fetchAllExpense()},[])
  // 
  
  return (
    <Box>
        <Box sx={{textAlign:"center"}}>
            <Typography variant='h4'>Expense List</Typography>
        </Box>
    <Box sx={{p:2}}></Box>
    <ExpenseTable allExpense={allExpense} fetchAllExpense={fetchAllExpense}/>
    <FloatingAddButton/>
    </Box>
  )
}
