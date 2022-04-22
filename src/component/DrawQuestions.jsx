import React, {useEffect, useState} from "react";
import { Col, Card, CardHeader,CardBody, Row, CardTitle, CardSubtitle, CardGroup} from 'reactstrap'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import lbl from '../const/Const'

export const DrawQuestions = ({ datos, handleResp}) =>{

    /* useEffect(()=>{
        console.log("cambios")
    },[datos]) */

    const maperDatos = (it, index) =>{        
        return (
            <Row key={index}>
                <Card>
                    <CardHeader style={{background : `${lbl.color_headers}`, color:'white'}}>
                        <Row>
                            <Col xs="12" md="3">
                                <CardTitle tag="h5">{`${it.usuario}`}</CardTitle>                             
                                <CardSubtitle className="mb-2 text-muted" tag="h6">Usuario:</CardSubtitle>                            
                            </Col>                            
                            <Col xs="12" md="6">
                                <CardTitle tag="h5">{`${it.pregunta}`}</CardTitle>                             
                                <CardSubtitle className="mb-2 text-muted" tag="h6">Comentario:</CardSubtitle>                            
                            </Col>                                                            
                            <Col xs="12" md="3">
                                <IconButton onClick={()=> openModalRespuest(it)}  color="primary">
                                    <ModeEditIcon />
                                </IconButton> 
                            </Col>                         
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {it.lstRespuestas?.map((it2, index) => it2.lstRespuestas ? maperDatos(it2, index) : <></>)} 
                    </CardBody>
                </Card>                
            </Row>
        )
                  
    }

    const openModalRespuest = (it) => {        
        if(handleResp)  handleResp(it)        
    }

    return(
        <>
           {
              datos && datos.map((it, index) => (it.lstRespuestas ? maperDatos(it, index) : <></>))
           }
        </>
    )
}