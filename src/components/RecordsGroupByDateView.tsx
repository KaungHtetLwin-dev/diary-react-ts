import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import Controller from '../controller';
import RecordView from './RecordView';

export default function RecordsGroupByDateView() {
    let initObj: Record<string,any>  = {};
    const [groupedEntries,setGroupedEntries] = React.useState(initObj);
    const [tabindex,setTabIndex] = React.useState(0);

    let sortedDates = Object.keys(groupedEntries);
    sortedDates.sort((keyA,keyB) =>{
        let arrayA = keyA.split('.');
        let dayA  = parseInt(arrayA[0]);
        let monthA = parseInt(arrayA[1]);
        let yearA = parseInt(arrayA[2]);
        let dateA = new Date(yearA,monthA,dayA);

        let arrayB = keyB.split('.');
        let dayB  = parseInt(arrayB[0]);
        let monthB = parseInt(arrayB[1]);
        let yearB = parseInt(arrayB[2]);
        let dateB = new Date(yearB,monthB,dayB);
        

        return  dateB.getTime() -dateA.getTime()   ;

    });
    

    useEffect(()=> {
        
        Controller.getController().readAllAndGroupByDate().then((data) => setGroupedEntries(data) ) ;
     },[]);

   
    
  return (
    <div > 
    
    <Stack direction="row" spacing={2} width="100%" justifyContent="space-between"  alignItems="center">
    <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=> (tabindex < (sortedDates.length-1)) ? setTabIndex(tabindex+1): ''}
          >
            <ArrowBack/>
          </IconButton>
         
          <Typography >
            {sortedDates[tabindex]}
          </Typography>
          
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=> tabindex > 0 ?setTabIndex(tabindex-1):''}
            
          >
            <ArrowForward/>
          </IconButton>
    </Stack>
   
     
        {
            groupedEntries[sortedDates[tabindex]]? 
            groupedEntries[sortedDates[tabindex]]
                .map( (entry:any) => <RecordView entryID={entry.id} key={entry.id} /> )
            :<></> 
        }
     
      
    

    </div>
  )
}


