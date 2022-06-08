import React, {useEffect, useState} from "react";
import Layout from "../layout/Layout";
import {useRouter} from "next/router";
import axios from "axios";
import swal from 'sweetalert';
function AddStation() {
const[Nom_station , setNom_station]=useState("")

const[email , setEmail]=useState("")
const[password , setPassword]=useState("")
const[longitude , setLongitude]=useState("")
const[latitude , setLatitude]=useState("")
const[jourPT , setJour]=useState("")
const[ville , setVille]=useState("")
const[adresse , setAdresse]=useState("")
   
const router = useRouter()

const[error , setError]=useState(false);

const styleObj = {

 paddingTop:'50px',
  height:"150px",
  alignContent:'center'
}
    async function Add(){

      if( !email || !password   || password.length<6){
        setError(true);
        return false;
          
      }
        let item = {Nom_station , email ,ville , adresse,jourPT, password , longitude , latitude , Role:"lavage"}
        console.warn(item)
        let result = await fetch("http://localhost:3001/utilisateur/register" , {
            method: 'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type" : 'application/json',
                "Accept" : 'application/json'
            }
        })
       
        result = await result.json();
        if(result){
          swal({
            title: "Ajouté avec succes",
            icon: "success",
            button: "Valider",
          });
        }
        else{
            swal({
                title: "Echec d'ajout  ",
               
                icon: "warning",
                buttons: true,
                dangerMode: true,
              });
        }
       
        router.push('/')
       
    }
    
    
       
    

   


    return (
        <div className="py-1 bg-blueGray-50 pr-10 lg:pr-0">
            <section className="py-1 bg-blueGray-50 pr-10 lg:pr-0">
                <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-5 mt-12 mr-40 lg:mr-0">
                    <h1 className="text-3xl my-2" size="10px"><i><b><u>Ajouter une Station de lavage</u></b></i></h1><br />
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="lg:flex items-center">
                                <div className="relative w-full px-4 max-w-full flex">
                                    
                                   
                            </div>
                            
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto bg-gray-80"  >
                        <form className="f bg-gray-80"  >
                        <div className="mt-5 flex flex-col gap-2">
                        <p className="text-sm text-gray-700 grid grid-cols-3 ">
                          <b className="">&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Nom station</b>
                          <input
                            type="text"
                            onChange={(e)=>setNom_station(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            value={Nom_station}
                            placeholder="Saisir le nom de station"
                          />
                         
                                 </p>
                                 
                        
                        <p className="text-sm text-gray-700 grid grid-cols-3">
                          <b>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Ville :</b>
                          <input
                            type="text"
                            onChange={(e)=>setVille(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            placeholder="Saisir la ville"
                          />
                        </p>
                         <p className="text-sm text-gray-700 grid grid-cols-3">
                          <b>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Adresse :</b>
                          <input
                            type="text"
                            onChange={(e)=>setAdresse(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            placeholder="Saisir l'adresse de la station"
                          />
                        </p>
                        
                        
                        <p className="text-sm text-gray-700 grid grid-cols-3">
                          <b>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Email :</b>
                          <input
                            type="email"
                            onChange={(e)=>setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            placeholder="email@serveur.com"
                          />
                        </p>
                        {error && !email &&<span className="text-sm text-red-600 grid grid-cols-2 " > &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>champ obligatoire*</b></span>}
                                 
                        <p className="text-sm text-gray-700 grid grid-cols-3 ">
                          <b>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;password :</b>
                          <input
                            type="password"
                            onChange={(e)=>setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-grey-darker"
                            placeholder="Saisir le password"
                          />
                        </p>
                        {error && !password &&<span className="text-sm text-red-600 grid grid-cols-2 " >&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>champ obligatoire *</b></span>}
                        {error && password.length<6 && <span className="text-sm text-red-600 grid grid-cols-2 " >&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Mot de passe doit contenir minimum 6 caractére</b></span>}        
                        
                        <p className="text-sm text-gray-700 grid grid-cols-3 ">
                          <b>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;longitude:</b>
                          <input
                            type="Number"
                            onChange={(e)=>setLongitude(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            placeholder="Saisir longitude"
                          />
                        </p>
                                 
                        <p className="text-sm text-gray-700 grid grid-cols-3 ">
                          <b>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Latitude :</b>
                          <input
                            type="Number"
                            onChange={(e)=>setLatitude(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            placeholder="Saisir latitude"
                          />
                        </p>
                                 
                        
                     
                        <p className="text-sm text-gray-700 grid grid-cols-3">
                        
                          <b><br/><br/>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Horaire :</b>
                          <textarea
                            onChange={(e)=>setJour(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            placeholder="Saisir les heures de travail"
                           
                            style={styleObj}
                        
                          />
                         
                          <br/>
                        </p>
                        <br/>
                      </div>   &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   
                      <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() =>Add()}
                  >
                   Ajouter station
                  </button> </form><br/><br/>




                        
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
}

export default Layout(AddStation);




