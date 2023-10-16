import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Navbar from './component/Navbar.jsx'
import axios, { Axios } from "axios";
import { Box, Stack, Typography, TextField, Button,Avatar } from "@mui/material";
import AjoutezPublication from './component/AjoutezPublication.jsx';

export default function dashboard() {

    const [Publications ,setPublications]=React.useState([]) // declarer des variable pour la ublication
  const  navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("utilisateur")){
      navigate("/connexion")
    }
    axios.get("http://localhost:3000/Publication") // recuperer la publication dans le serveur 
    .then((res)=>{
     setPublications(res.data)  // actualiser la table de publicaion
    }).catch((err)=>{
     console.log(err)
    })
  })
  return (
    <Stack>
      <Navbar/>
      <AjoutezPublication/>

      <Box>
        { Publications.map((publication) => // faire une boucle sur le tableau de publications 
        <Box sx={{
          display: "flex",
          flexDirection: "column"
        }}> 
          <Stack>
           <Stack> <Avatar src={publication.photoUtilisateur} ></Avatar>  
            <Typography>{publication.auteur}</Typography>
            </Stack>
          </Stack>
          <Typography>{publication.textePublication}</Typography>
          <img style={{height:"300px",width:"500px"}} src={publication.imagePublication}  />
        </Box>  )}
      </Box>
    </Stack>
  )
}
