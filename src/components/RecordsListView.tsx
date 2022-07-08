import React from 'react'
import RecordView from './RecordView';
import DiaryRecord from '../model';
import { Slide, Box, Grow } from '@mui/material';

export default function RecordsListView(props:any) {

    const [showSlide,setShowSlide] = React.useState(false);
    React.useEffect(()=>{
        setTimeout(()=> setShowSlide(true),50);
    },[])

    let records : Array<DiaryRecord> = props.records ;
  return (
    <Grow in={showSlide}>
    <Box>
  
    {
        records.map((record:DiaryRecord)=> <RecordView entry={record} key={record} />)
    }
    </Box>
    </Grow>
    
  );
}
