import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import { columsResp} from '../columns/Constantes'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { RowRespuestas } from "../component/RowRespuestas";

const customStyles = {
    headCells: {
      style: {
          border: ".01px solid #002b36",
          backgroundColor: '#173b54',
          color: '#FFFF',
          fontSize: '13px',
          borderRadius:'3px',
          '&:hover': {
            cursor: 'pointer',
          },
      },        
    }
  }


export const DetalleRespuestas = ({...props}) =>{
    
    const {data} = props
    const [datosRespuestas, setDatosRespuestas] = useState([])

    useEffect(()=>{

        if(data != null){
            maperRespuesta(data)
        }

    },[data])

    function maperRespuestas(lista){
        let dto=[]
        if(lista != undefined){
            if(lista.length > 0){
                lista.map((it,index)=>{
                    dto.push({
                        idR         : it.idR,
                        respuesta   : it.respuesta,
                        usuario     : it.usuario,   
                        acciones : (
                            <div>
                                <IconButton onClick={()=> handleResponder(it)} color="primary">
                                    <ModeEditIcon />
                                </IconButton>                
                            </div>
                        ),                     
                        lstRespuestas   : maperRespuestas(it.lstRespuestas)
                    })
                })
                return dto
            }else{
                return []
            }
        }else{
            return []
        }
        
    }


    const handleResponder = (it) =>{
        console.log("reponder a")
        console.log(it)
        console.log("reponder a")
        var ob = data.lstRespuestas.find(it1 => it1.idR === it.idR)
        if(ob != null){
            ob.lstRespuestas.push({
                idR : ob.lstRespuestas.length +1,
                nombre: "chelo",
                respuesta: "respuesta prueba",
                lstRespuestas   : it.lstRespuestas
            })
        }
        
        setDatosRespuestas(maperRespuestas(ob))
        //setDataResp(data)
    }


    function maperRespuesta (data){
        console.log("cambio")
        console.log(data)
        let objInfo = []
        if(data.lstRespuestas.length > 0){
            data.lstRespuestas.map((obj,index)=>{
                objInfo.push(
                    {
                        idR: obj.idR,
                        respuesta: obj.respuesta,
                        usuario: obj.usuario,
                        acciones : (
                            <div>
                                <IconButton onClick={()=> handleResponder(obj)} color="primary">
                                    <ModeEditIcon />
                                </IconButton>                
                            </div>
                        ),
                        lstRespuestas: obj.lstRespuestas//maperRespuestas(obj.lstRespuestas)
                    }
                )                
            })

            setDatosRespuestas(objInfo)
            return objInfo
        }else{
            return []
        }
        
    }
                    
    return(
        <>
            <center>        
                <div style={{marginTop: '2%'}}>
                    <DataTable
                        style={{ backgroundColor: "#f0f3f5", width: "80%" }}
                        columns={columsResp}
                        data={datosRespuestas}
                        noDataComponent={"No hay respuestas"}
                        persistTableHead={true}
                        highlightOnHover
                        customStyles={customStyles}
                        noHeader={true}
                        expandOnRowClicked                            
                        /* expandableRowsComponent={<RowRespuestas respuesta={{}}/>} */
                        expandableRowsComponent={<RowRespuestas respuesta={{}}/>}
                    />
                </div>
            </center>
        </>
    )
}