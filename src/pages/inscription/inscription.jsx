import React from "react";
import { useForm } from "react-hook-form";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import axios, { Axios } from "axios";
// importer react hook form pour la validation des données
import "./inscription.css";
import Connexion from "../connexion/connexion";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom"; // pour faire des redirections

export default function inscription() {
  const navigate = useNavigate();
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

  // const onSubmit = data =>console.log(data)

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
            //console.log(JSON.stringi(data));
            console.log(data.password, "voila le password");
            if (data.password !== data.confirmpassword) {
              // alert("les mots de pass ne correpondent pas")
              toast.error("les mot de pass ne correspondent pas");
            } else {
              console.log(data);

              axios
                .get(`http://localhost:3000/utilisateur?Email=${data.Email}`) //verifie si l'user existe

                .then((response) => {
                  if (response.data.length > 0) {
                    toast.error("Un utilisateur existe deja avec ce compte");
                  } else {
                    axios
                      .post("http://localhost:3000/utilisateur", data) // ajoutez l'user

                      .then((response) => {
                        console.log(response);
                        toast.success("inscription reussi");
                        navigate("/connexion");
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                });

              //inserer des donnes dans la BD avec axios
            }
          })}
        >
          <legend
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              textAlign: "center",
            }}
          >
            INSCRIPTION
          </legend>
          <label>Nom d'user</label>
          <input {...register("utilisateur")} />
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
          <label>confirmez votrepassword</label>
          <input
            type="password"
            {...register("confirmpassword", {
              required: "ce champs est requis",
            })}
          />

          {errors.exampleRequired && <p>This field is required</p>}
          <input type="submit" />
         
        </form>
       
      </Box>
    </Stack>
  );
}
