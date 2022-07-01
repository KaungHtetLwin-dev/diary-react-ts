import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

export default function RecordPreview() {
  return (
    <>
        

<Card variant="outlined" sx={{ my: 2 }}>
  <CardContent>
    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
    Title
    </Typography>
    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
    Comment
    </Typography>
   
  </CardContent>
</Card>

    </>
  )
}
