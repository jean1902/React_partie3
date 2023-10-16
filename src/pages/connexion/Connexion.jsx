import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import axios, { Axios } from "axios";
// importer react hook form pour la validation des données
import "../inscription/inscription.css";
import toast, { Toaster } from "react-hot-toast";
import {Navigate, useNavigate,Link} from "react-router-dom" // pour faire des redirections 


export default function Connexion() {

  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem("utilisateur")){
      navigate("/")
    }
  })  // inscription 
  const {
    register,
    handleSubmit,
    watch, 
    formState: { errors },
  } = useForm({
    //default value
  });
  // //defaultValues: {
  //   example: "",
  //   exampleRequired: ""
  // }

  //console.log(watch("example")); // you can watch individual input by pass the name of the input

  const onSubmit = data =>console.log(data)

  // console.log(watch("example")); // you can watch individual input by pass the name of the input
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      backgroundColor={"green"}
      width={"100%"}
      height={"100vh"}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: 3,
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "7px",
        }}
      >
        <form
          onSubmit={handleSubmit((data) => {
            console.log(JSON.stringify(data));
            
            axios.get(`http://localhost:3000/utilisateur?Email=${data.Email}&password=${data.password}`)
            .then( (res)=>{
              if(res.data.length >0){
                localStorage.setItem("utilisateur", JSON.stringify(res.data[0])) // stocker les donnée dans le navigateur
                toast.success("Connexion reussi");
                navigate("/")
              }else{
                toast.error("email ou password incorrect");
              }
            })
            
          })}
        >
          <legend
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              textAlign: "center",
            }}
          >
         Connexion
          </legend>
         
          <label>entrez votre email</label>
          <input
            type="Email"
            {...register("Email", { required: "ce champs est requis" })}
          />
          <label>entrez votre password</label>
          <input
            type="password"
            {...register("password", { pattern: /^[A-Za-z]+$/i })}
          />
         

          {errors.exampleRequired && <p>This field is required</p>}
          <input type="submit" value={"connexion"} />
          <Typography> Voulez vous créer un compte ?  <Link to="/inscription" sx={{
            cursor:"pointer"
          }} > Cliquez ici</Link> </Typography>
          
        </form>
      </Box>
    </Stack>
  );
}
