import React, {useState} from "react";
import { Modal,Label, Input, Form, FormGroup, Col, Card, CardHeader,CardBody, CardFooter, Row } from 'reactstrap'
import { TextField } from '@material-ui/core';
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel'
import lbl from '../const/Const'

export const FrmNuevaPregunta = ({tipo,closeModal, pregunta,savePregunta}) => {


    const [ form, setForm ] = useState({}) 
    const [ errorInput, setErrorInput ] = useState(false)   

    const closeFrm = () => {
        if(closeModal) closeModal()
    }

    const guardarPregunta = () =>{
        if(!validarCampos()){
            if(savePregunta) savePregunta(form,pregunta)
        }
    }

    const handelInputChange = (e) => {   
        setForm({...form, [e.target.name] : e.target.value })
    }

    function validarCampos () {
        let exito = false;
        if(form.nombre == '' || form.nombre == null || form.nombre == undefined){            
            setErrorInput(true)   
            exito = true         
        }else if(form.pregunta == '' || form.pregunta == null || form.pregunta == undefined){
            setErrorInput(true)
            exito = true                     
        }

        return exito;
    }

    return(
        <>    
            
            <Card>
                <CardHeader style={{background : '#002b36', color:'white'}}>
                    {tipo == 1 ? `DETALLE SU PREGUNTA` : 'DETALLE SU RESPUESTA'}
                </CardHeader>
                <CardBody>                                                                   
                    <Form variant="outlined" style={{marginTop:'20px'}} action="" method="post" className="form-horizontal">                       
                        <FormGroup row >
                            <Col xs="12" md="12">
                                <TextField
                                    label={`${lbl.hl_nombre}`}
                                    size="small"
                                    variant="outlined"
                                    id="nombre"
                                    name="nombre"
                                    value={form.nombre}
                                    onChange={handelInputChange}
                                    fullWidth
                                    error={(form.nombre === '' || form.nombre === undefined) && errorInput === true ? true : false}
                                    helperText={(form.nombre === '' || form.nombre === undefined) && errorInput === true ? 'Campo requerido' : ''}                                      
                                />
                            </Col>                            
                        </FormGroup>  
                        <FormGroup row>
                            <Col xs="12" md="12" style={{marginTop:'2%'}}>
                                <TextField
                                    label={tipo == 1 ? `${lbl.hl_pregunta}` : `${lbl.hl_respuesta}`}
                                    size="small"
                                    variant="outlined"
                                    id="pregunta"
                                    name="pregunta"
                                    value={form.pregunta}
                                    onChange={handelInputChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    error={(form.pregunta === '' || form.pregunta === undefined) && errorInput === true ? true : false}
                                    helperText={(form.pregunta === '' || form.pregunta === undefined) && errorInput === true ? 'Campo requerido' : ''}
                                />
                            </Col>
                        </FormGroup>                                                                        
                    </Form>
                </CardBody>
                <CardFooter>                                                    
                    <div style={{marginTop : '2%',display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={()=> closeFrm()} style={{marginRight: '10px', backgroundColor: `${lbl.color_danger}`}} variant="contained" endIcon={<CancelIcon />}>
                            {lbl.btn_cancelar}
                        </Button> 
                        <Button onClick={()=> guardarPregunta()} variant="contained" endIcon={<SendIcon />}>
                            {lbl.btn_registrar}
                        </Button>                                                                                                                          
                    </div>                                                
                </CardFooter>
            </Card>
                     
        </>
    )
}