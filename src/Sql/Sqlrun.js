import React, {useEffect} from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import axios from 'axios';
import './Sqlrun.css'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-xcode";




const Sqlrun = () => {
    const [output, setOutput] = React.useState('');
    const [data, setData] = React.useState([]);
    const [code, setCode] = React.useState(() => JSON.parse(localStorage.getItem('colab')) || "");
    const [send, setSend] = React.useState(false)

    const handleChange = event => {
        setOutput(event.target.output);
        event.preventDefault();
      };

      function onChange(newValue) {
        console.log("change", newValue);
        setCode(newValue)
      }

      console.log(output)

     


     
    

      function runSQL(){


          
        localStorage.setItem('colab', JSON.stringify(code))
        console.log(code)
        setOutput('Wait...running')



        const payload = {
            data : code
        }
  
        axios.post(`https://sql-dash-backend.herokuapp.com/sqlrun`, payload)
              .then(res => {
                console.log(res);
              
                if(Object.keys(res.data).length != 0){
                  setOutput(res.data)
                setData(res.data.rows)
                }
            
      }).catch((error) => {
        console.log(error);
        setOutput(error.response.data)
    }) 

      }

      useEffect(()=>{
        if (send === true){
          runSQL()
          }
          setSend(false)
      },[send])

var column = {}
      // get table column
  console.log(data[0])
 if (data[0] != undefined){
column = {...(data[0])}
 }
 
 console.log(column)
  


    return (
        <div >
       <Box  sx={{p : 2}}>

<AceEditor
    mode="mysql"
    className='code1'
    theme="xcode"
    height='290px'
    width='89vw'
    fontSize={14}
    onChange={onChange}
    id="sqlid1"
    value={code}
    name="sqlid1"
    useWrapMode = {true}
    editorProps={{ $blockScrolling: true, useWaapMode :true  }} 
  />
</Box>


<Box pt={2} pb={2}>
<Stack direction="row" spacing={15}>
      
    
<Button variant="contained" onClick = {()=>setSend(true)} color="primary" >
 Execute
</Button>

    {(output.hasOwnProperty("Error")) ? <Typography  variant="body1" display="block" gutterBottom alignItems='center'>
        Error : {output['Message']}
      </Typography> : output.hasOwnProperty("command") ? <><Typography  variant="overline" display="block" gutterBottom alignItems='center'>
        Command : {output['command']}
      </Typography>
      <Typography  variant="overline" display="block" gutterBottom>
        Row Affect : {output['rowCount']}
      </Typography> </> : ""}
</Stack>
</Box>



 <div className="tableFixHead">
<table id="customers">
     <thead>
     <tr >
          {Object.keys(column).map((row2)=>(
              <th>{row2}</th>
          ))}
        </tr>
     </thead>
     <tbody>
     
        
    
     {data.map((row1)=>(
        <tr key={row1[0]}>
          {Object.values(row1).map((row2)=>(
              <td>{row2}</td>
            )) }
            
        </tr>
     ))}
     </tbody>

   </table>
   </div>
   </div>

   
    );
}

export default Sqlrun;
