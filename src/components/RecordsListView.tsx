import React from 'react'
import RecordView from './RecordView';
import DiaryRecord from '../model';
import { Slide, Box, Grow } from '@mui/material';

export default function RecordsListView(props:any) {


    let records : Array<DiaryRecord> = props.records ;
  return (
    <Grow in={true} style={{transitionDelay:'50ms'}}>
    <Box>
  
    {
        records.map((record:DiaryRecord)=> <RecordView entry={record} key={record} />)
    }
    </Box>
    </Grow>
    
  );
}
