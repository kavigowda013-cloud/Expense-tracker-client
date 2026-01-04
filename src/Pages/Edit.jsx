import { Category, Try } from '@mui/icons-material'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { baseurl } from '../api'
export default function Edit() {
  const Params=useParams()
  console.log(Params.id);
  const{id}=useParams()
  
  const navigate=useNavigate()
  const [formData,setFormdata]=useState({
    title:"",amount:0,category:""
  })
  const [isLoading,setIsLoading]=useState(false)
  const fetchSingleExpense=async()=>{
    try {
      const res=await axios.get(`${baseurl}/api/expense/view/${id}`)
      // console.log(res.data);
      if (res.data.success) {
        setFormdata(res.data.expensesDetails)
      } else {
        toast.error(res.data.message)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    fetchSingleExpense()

  },[])
  // console.log(formData);
  const handleSubmit=async()=>{
  // 
  setIsLoading(true)
  try {
  const res=await axios.put(`${baseurl}/api/expense/edit/${id}`,formData);
  // console.log(res);
  if (res.data.success) {
    toast(res.data.message)
    
    setTimeout(()=>{navigate("/")},2000)

  } else {
    toast(res.data.message)
  }
  
} catch (error) {
  console.log(error);
  
}
finally{setTimeout(()=>{setIsLoading(false)},2000)

}
  }
  return (
    <Box>
        <Box sx={{textAlign:"center"}}> 
            <Typography variant='h4'>Add Expense details</Typography>
        </Box>
        <Box sx={{backgroundColor:"skyblue",p:4, display:"flex",justifyContent:"center",
            alignItems:"center"}}>
            <Paper sx={{width:"70%",p:3}}>
                <TextField 
                value={formData.title}
                fullWidth onChange={(e)=>setFormdata({...formData,title:e.target.value})}
                label="Enter expensive title"
                 placeholder='enter title here' sx={{mb:2}}/>
                 
                 <TextField value={formData.amount} fullWidth  onChange={(e)=>setFormdata({...formData, amount:e.target.value})}label="Enter expensive amount"
                 placeholder='enter amount here' type='number' sx={{mb:2}}/>
                 <FormControl fullWidth>
        <InputLabel id="demo-simple-select">select expensive category</InputLabel>
        <Select  
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          value={formData.category}
          onChange={(e)=>setFormdata({...formData,category:e.target.value})}
          label="select expensive category"
          // onChange={handleChange}
        >
          <MenuItem value={"Transport"}>Transport</MenuItem>
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"Travel"}>Travel</MenuItem>
          <MenuItem value={"vlog"}>vlog</MenuItem>
          <MenuItem value={"other"}>other</MenuItem>
        </Select>
      </FormControl>
                 <Button  onClick={handleSubmit} sx={{mb:1}} variant='contained' fullWidth loading={isLoading}>Submit</Button>
                  <Button component={Link} to={"/"}sx={{mb:1}}variant='outlined' color='secondary' fullWidth>View Details</Button>
            </Paper>
        </Box>
    </Box>
  )
}
