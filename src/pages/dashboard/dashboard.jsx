import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import axios, { Axios } from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Avatar,
  Icon,
} from "@mui/material";
import AjoutezPublication from "./component/AjoutezPublication.jsx";

export default function dashboard() {
  const [Publications, setPublications] = React.useState([]); // declarer des variable pour la ublication
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("utilisateur")) {
      navigate("/connexion");
    }
    axios
      .get("http://localhost:3000/Publication") // recuperer la publication dans le serveur
      .then((res) => {
        setPublications(res.data);
         // actualiser la table de publicaion
       
       
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // const  queryClient = useQueryClient();
  //  const {data:publications,onerror,isLoading} =useQuery({
  //    queryKey :["Publication"],
  //   queryFn:()=> axios.get("http://localhost:3000/Publication")
  //   .then((res)=> (res.data),
  //   //  onerror :(error) => console.log(error,"error");
  //   )
  // })

  //  if (isLoading){
  //     return <div> chargment</div>
  //  }

  return (
    <Stack sx={{}}>
      <Navbar />
      <AjoutezPublication />

      <Box sx={{ margin: "65px 0" }}>
        {Publications.map(
          (
            publication // faire une boucle sur le tableau de publications
          ) => (
            <Box
              sx={{
                width: "500px",
                margin: "80px auto",
                color: "black",
                fontSize: "23px",
                border: "1px solid grey",
                boxShadow: "-10px -1px 14px 1px rgba(0,0,0,0.39);",
                padding: "40px 20px",
                borderRadius: "6px",
              }}
            >
              <Stack>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    {" "}
                    <Avatar src={publication.photoUtilisateur}></Avatar>
                    <Typography
                      sx={{
                        marginLeft: "10px",
                        fontWeight: "bold",
                        textDecoration: "textCapitalize",
                      }}
                    >
                      {publication.auteur}
                    </Typography>
                  </Box>
                  <Button  variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </Stack>
              </Stack>
              <Typography
                sx={{ paddingLeft: "10px", color: "black", margin: "40px 0px" }}
              >
                {publication.textePublication}
              </Typography>
              <img
                style={{
                  height: "300px",
                  width: "100%",
                  objectPosition: "center",
                }}
                src={publication.imagePublication}
              />
              <Stack> </Stack>
            </Box>
          )
        )}
      </Box>
    </Stack>
  );
}
