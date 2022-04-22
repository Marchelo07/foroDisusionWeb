import React, {useEffect,useState} from "react"
import axios from "axios"
import { CCard } from '@coreui/react'
import { Card, CardHeader,Modal, CardFooter} from 'reactstrap'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import lbl from '../const/Const'
import { FrmNuevaPregunta } from "./FrmNuevaPregunta";
import { DrawQuestions } from "../component/DrawQuestions";
import { URL_SERVICIO } from '../Config'
/* var data = [
    {
        idP : 1,
        usuario: "Marcelo",
        pregunta: "Quien fue primero el huevo o la gallina ?",
        lstRespuestas: [
            {
                idP : 1,
                usuario: "Respuesta 02",
                pregunta: "Quien fue primero ?",
                lstRespuestas: [
                    {
                        idP : 1,
                        usuario: "Respuesta 03",
                        pregunta: "Quien fue ?",
                        lstRespuestas: [                            
                        ]
                    }
                ]
            }         
        ]
    }
] */

var data = []

const Home = (props) =>{


    const [dataForo, setDataForo] = useState([])
    const [dataPregunta, setDataPregunta] = useState({})
    const [openModal, setOpenModal] = useState(false)  
    const [openModalRespuesta, setOpenModalRespuesta] = useState(false)  
    const [tipoModal, setTipoModal] = useState(0)

     useEffect(()=>{
        console.log("consultando")
        data=[];
        consultarInformacion()
    },[])

    useEffect (()=>{
        
        setDataForo(data)        

    },[data])

    const consultarInformacion = () =>{

        axios.get(URL_SERVICIO + "/datosForo/obtenerDatos",{}
        ).then(res => {
            if(res.data.length > 0){
                data = res.data;
                setDataForo(res.data)
            }else{
                setDataForo([])
            }
        })
    }

    const updateInfo = () => {

        console.log(JSON.stringify(data))
        axios.post(URL_SERVICIO + "/datosForo/updateDataForo",data
        ).then(res => {
            if(res.data.exito){
                data=[];
                consultarInformacion()
                //setDataForo(res.data)
            }else{
                setDataForo([])
            }
        }).catch(err=>{

        })
    }

    const guardarPregunta = (obj) => {
                
        data.push({
            idP : data.length + 1,
            usuario: obj.nombre,
            pregunta: obj.pregunta,            
            lstRespuestas: []
        })

        handleCloseModal()
        setDataForo(data)
        updateInfo()
    }

    const guardarRespuesta = (it, preg) =>{

        if(preg.idR != undefined || preg.idR !=null){
            var ob = data.find(it1 => it1.idP === preg.idP ).lstRespuestas
                        
                ob.map((i,index)=>{
                    if( i.idP == preg.idP && i.idR == preg.idP ){
                        i.lstRespuestas.push({
                            idP : i.idP,
                            idR : i.lstRespuestas.length +1,             
                            usuario: it.nombre,
                            pregunta: it.pregunta,
                            lstRespuestas:[]
                        })
                    }
                })                            
        }else{
            
            var ob = data.find(it1 => it1.idP === preg.idP)
            if(ob != null){
                ob.lstRespuestas.push({
                    idP : ob.idP,
                    idR : ob.lstRespuestas.length +1,             
                    usuario: it.nombre,
                    pregunta: it.pregunta,
                    lstRespuestas:[]
                })
            }
        }        

        setDataForo(data)        
        updateInfo()
        setOpenModalRespuesta(false)        
    }

    const handleOpenModal = () => {
        setTipoModal(1)
        setOpenModal(true)
    }
    
    const handleCloseModal = () => { 
        setTipoModal(0)       
        setOpenModal(false)
        setOpenModalRespuesta(false)
    } 

    const handleRespuestaPregunta = (obj) =>{
        setDataPregunta(obj)
        setOpenModalRespuesta(true)
    }

    return(
        <>
            <div className="bg-light d-block flex-row min-vh-100  align-items-center">            
            <Modal isOpen={openModal}>  
                    <FrmNuevaPregunta tipo={tipoModal} closeModal={handleCloseModal} pregunta={{}} savePregunta={guardarPregunta}/>                 
                </Modal>
                <Modal isOpen={openModalRespuesta}>  
                    <FrmNuevaPregunta tipo={tipoModal} closeModal={handleCloseModal} pregunta={dataPregunta} savePregunta={guardarRespuesta}/>                 
                </Modal>
                <CardHeader>
                    FORO DE DISCUSIÓN
                </CardHeader>
                <Card body
                    inverse
                    style={{ backgroundColor: '#333', borderColor: '#333'}}>                
                    <div style={{marginBottom:'10px', display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={handleOpenModal} style={{ backgroundColor: `${lbl.color_sucess}`}} variant="contained" endIcon={<AddIcon />}>
                            {lbl.btn_nuevo}
                        </Button>                            
                    </div>
                    <div style={{marginBottom:'10px', marginLeft:'10%', marginRight:'10%'}}>
                        <CCard style={{borderColor: `${lbl.color_border}` ,background : `${lbl.color_fondoCards}`, color:'white'}}>
                            <DrawQuestions datos={dataForo} handleResp={handleRespuestaPregunta}></DrawQuestions>
                        </CCard>
                    </div>
                </Card>                
                <CardFooter>
                    By: Marcelo Rosero
                </CardFooter>
            </div>
        </>
    )
}

export default (Home)