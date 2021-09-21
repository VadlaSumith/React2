    import React, { useState } from 'react';
    import Container  from '@material-ui/core/Container';
    import  TextField from '@material-ui/core/TextField';
    import Button from '@material-ui/core/Button';
    import IconButton from '@material-ui/core/IconButton';
    import RemoveIcon from '@material-ui/icons/Remove';
    import AddIcon from '@material-ui/icons/Add';
    import Icon from '@material-ui/core/Icon'; 
    import Axios from 'axios';


    import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import axios from 'axios';

    const useStyles = makeStyles((theme) => ({
      root : {
        '& .MuiTextField-root' : {
          margin : theme.spacing(3),
        },
      
      },
      button : {
        margin : theme.spacing(1),
      }
    }))

    
    


    function App(){

      const classes = useStyles()
      const [inputFields , setInputFields] = useState([
        {Order_detail_id: '' , Tracking_number:'' , Device_serial_number: '' },//number of objs to add ie fields
      ]);


      const [Status, setStatus] = useState('');

      //connection code
      
      const getdetails = (e) =>{
        let Order_detail_id = inputFields[0].Order_detail_id;
        let Tracking_number =inputFields[0].Tracking_number;
        let Device_serial_number =inputFields[0].Device_serial_number;
        
        console.log('formvalues',inputFields[0]  , e);
      
        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
          }
        };
        
        Axios({
           method: 'post',
           url: 'http://localhost:3002/getdetails',
          data:[
             ...inputFields
         ],
           headers : {'Content-Type': 'application/json'},
         }).then((result , err) => 
          {if(result.status == 200){
            setStatus("Data Added");
          }
        else if(err){
          setStatus("Error Occurred");
        }});
          
       };

      //axios.post(`http://localhost:3002/getdetails`,getdetails).
                    

        const handleSubmit = (e) => {
          e.preventDefault();
          console.log("InputFields" , inputFields);
          console.log(e);
        };

      const handleChangeInput = (index,event) =>{
        const values =[...inputFields];
        values[index][event.target.name] = event.target.value;
        console.log("val",values);
        setInputFields(values);
      }

    //  const getdetailsstatus = (e) =>{
    //    const send = [...inputFields];
    //    ("bajvis");
    //   } 
      
      
      const [counter , updateCounter]= useState(0);

      const handleRemoveFields = (index)=>{
        updateCounter(counter - 1);
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
        }

      const handleAddFields = ()=>{
        updateCounter(counter + 1);
        setInputFields([...inputFields, {Order_detail_id: '' , Tracking_number:'' , Device_serial_number: '' }])
      }

      

      return ( 
        <Container>
          <h1> Order Details</h1>
          <form className = {classes.root} onSubmit = {handleSubmit}>
          {inputFields.map((inputField,index) => (
            <div key ={index}>
              <TextField 
                name = "Order_detail_id"
                label = "Order_detail_id"
                variant = "filled"
                value = {inputField.Order_detail_id}
                onChange = {event => handleChangeInput (index,event)}
              />

              <TextField 
                name = "Tracking_number"
                label = "Tracking_number"
                variant = "filled"
                value = {inputField.Tracking_number}
                onChange = {event => handleChangeInput (index,event)}
              />

              <TextField 
                name = "Device_serial_number"
                label = "Device_serial_number"
                variant = "filled"
                value = {inputField.Device_serial_number}
                onChange = {event => handleChangeInput(index,event)}
              />
              
              {counter >0 && (<IconButton
              onClick = { () => handleRemoveFields(index)}
              >
                <RemoveIcon />
              </IconButton>)}

            </div>
          ))}

            

              <IconButton
                onClick = { () => handleAddFields()}
                >
                <AddIcon />
              </IconButton>

          <Button 
          className = {classes.button}
          variant = "contained" 
          color = "secondary" 
          type = "submit" 
          onClick ={getdetails} //getdetails
          endIcon = {
          <Icon>send</Icon>
          }>
            Send</Button>
          </form>

          <h1>{Status}</h1>

        </Container>
      ); 

      
    }

      export default App;
  