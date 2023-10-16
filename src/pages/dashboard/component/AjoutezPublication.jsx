import React from "react";
import { Stack, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function AjoutezPublication() {

  const user =JSON.parse(localStorage.getItem("utilisateur")) //JSON.Parse pour convertir en objet
  console.log(user,"variable")

const {
  register,
  handleSubmit,
  watch,
  reset,
  formState: { errors },
} = useForm();
const onSubmit =(data) =>{
  console.log(errors,"Erreu ")
  //  console.log(data,"data")
   const publication={
    ...data ,
     idUtilisateur: user.id,
    datePublication: new Date(),
    likePublication:0,
     auteur:user.utilisateur
   }  

   axios.post("http://localhost:3000/Publication",publication)
   .then((res)=>{
    console.log(res.data);
    toast.success("Publication ajoutée")
    reset();
   }).catch((err)=>{
    console.log(err)
    toast.error("une erreur est survenue")
   })


 
} 




  return (
    <Stack>
      <h1
        style={{
          textAlign: "center",
          color: "black",
          margin: "40px ",
          borderBottom: "none",
        }}
      >
        Ajouter une publication{" "}
      </h1>
      <br />{" "}
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <TextField
          type="text"
          id="outlined-basic"
          label="decrivez votre publication"
          sx={{
            maxwidth: "700px",
            width: "900px",
            paddingTop: "26px",
            marginBottom: "20px",
          }}
          variant="outlined"
          multiline
          rows={4}
          {...register("textePublication",{
            required:"veuillez saisir un texte",
            minLength:{
              value:10,
              message:"veuiller saisir un texte de plus de 5 carractère"
            }
          })}
        />
        <TextField
          type="url"
          id="outlined-basic"
          label="coller l'url de l'image"
          sx={{ maxwidth: "700px", width: "900px", paddingTop: "26px" }}
          variant="outlined"
          multiline
          rows={1}
          {...register("imagePublication",{
            required:"veuillez saisir une url",
            minLength:{
              value:10,
              message:"veuiller saisir un texte de plus de 5 carractère"
            }})}
        />
        {/* <Button variant="contained" type="submit">Publier</Button> */}
        <Button type="submit" variant="contained">
          Publier
        </Button>
      </form>
    </Stack>
  );
}

//

//----------------  premiere partie ----------


//      idUtilisateur: user.id,
//       // datePublication: new Date();
//     //   likePublication:0,
//     //  auteur:user.utilisateur
//    }
//   //  console.log(publication,'publication')
//   axios.post("http://localhost:3000/Pulication", data)
//   .then(
//     (res)=>{console.log(res)
//     toast.success("publication ajoutée");
// }).catch((err) =>{
//   console.log(err)
//   toast.error("une erreur est survenue");
// })
