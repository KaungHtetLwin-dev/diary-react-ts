import React, { useEffect } from 'react';
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
  
  
  
  
  return (
    <>
        

<Card variant="outlined" sx={{ my: 2 }} onClick={() => navigate('/view-record/'+entryID)}>
  <CardContent>
    <Typography sx={{ fontSize: 14 , m:1 }} color="text.primary" gutterBottom>
    {entry.date.getDate()+'.'+(entry.date.getMonth()+1)+'.'+entry.date.getFullYear()}
    </Typography>
    <Divider/>
    <Typography sx={{ fontSize: 14 , m:1 }} color="text.primary" gutterBottom>
    {entry.title}
    </Typography>
   
  </CardContent>
</Card>

    </>
  )
}
