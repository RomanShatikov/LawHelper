import React from 'react'
import { Button } from 'reactstrap';
import GradeIcon from '@mui/icons-material/Grade';

export default function MediaCardFunction({pathname, isIncluded}) {
    if (pathname !== '/cabinet/requests'){
     return   <Button size="small" onClick={addFavoritesHandler}>
          <GradeIcon />
        </Button>;
    } else if (isIncluded) {
        return <p>hello</p>
    } else {
        return <p>dsflk</p>
    }
    
}
