import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Controller from '../controller';
import DiaryEntry from '../model';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

/**
 * Component Name : RecordView
 * Data Input : ID of diary entry
 * Function : Show record data in Card component
 *            If long press, switch to edit record view screen
 * 
 * 
 */

export default function RecordView(props: { entryID: any; } ) {

  let { entryID } = props;

  let [entry,setEntry] = React.useState(new DiaryEntry());
  const  navigate = useNavigate(); 
  useEffect(()=>{
    Controller.getController().read(entryID).then((data ) => setEntry(data || new DiaryEntry()));
  },[])
  


  const [action, setAction] = useState('');

  const timerRef :Record<string,any> = useRef();
  const isLongPress:Record<string,any>= useRef();

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction('longpress');
      navigate('/edit-record/'+entryID)

    }, 500)
  }

  function handleOnClick() {
    
    if ( isLongPress.current ) {
      console.log('Is long press - not continuing.');
      return;
    }
    setAction('click')
  }

  function handleOnMouseDown() {
    
    startPressTimer();
  }

  function handleOnMouseUp() {
    
    clearTimeout(timerRef.current);
  }

  function handleOnTouchStart() {
    
    startPressTimer();
  }

  function handleOnTouchEnd() {
    if ( action === 'longpress' ) return;
    
    clearTimeout(timerRef.current);
  }
  
  
  
  
  return (  
      <Card 
        variant="outlined" sx={{ my: 2 }} 
        onClick={handleOnClick}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={handleOnTouchEnd}  
      >
        <CardContent  sx={{p:0.5}}>
          <Typography sx={{ fontSize: 14 , m:1 }} color="text.primary" gutterBottom>
          {entry.date.getDate()+'.'+(entry.date.getMonth()+1)+'.'+entry.date.getFullYear()}
          </Typography>
          <Divider/>
          <Typography sx={{ fontSize: 14 , m:1 }} color="text.primary" gutterBottom>
          {entry.title}
          </Typography>
          <Divider/>
          <Typography sx={{ fontSize: 14 , m:1 }} color="text.primary" gutterBottom>
          {entry.comment}
          </Typography>
        
        </CardContent>
      </Card>

    
  )
}
