import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Controller from '../controller';
import diaryEntry from '../model';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

export default function RecordPreview(props: { entryID: any; } ) {

  let { entryID } = props;

  let [entry,setEntry] = React.useState(new diaryEntry());
  const  navigate = useNavigate(); 
  Controller.getController().read(entryID).then((data ) => setEntry(data || new diaryEntry()));


  const [action, setAction] = useState('');

  const timerRef :Record<string,any> = useRef();
  const isLongPress:Record<string,any>= useRef();

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction('longpress');
      navigate('/view-record/'+entryID)

    }, 500)
  }

  function handleOnClick() {
    console.log('handleOnClick');
    if ( isLongPress.current ) {
      console.log('Is long press - not continuing.');
      return;
    }
    setAction('click')
  }

  function handleOnMouseDown() {
    console.log('handleOnMouseDown');
    startPressTimer();
  }

  function handleOnMouseUp() {
    console.log('handleOnMouseUp');
    clearTimeout(timerRef.current);
  }

  function handleOnTouchStart() {
    console.log('handleOnTouchStart');
    startPressTimer();
  }

  function handleOnTouchEnd() {
    if ( action === 'longpress' ) return;
    console.log('handleOnTouchEnd');
    clearTimeout(timerRef.current);
  }
  
  
  
  
  return (
    <>
        


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

    </>
  )
}
