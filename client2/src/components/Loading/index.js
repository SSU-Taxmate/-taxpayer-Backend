import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading() {
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:"20vh"}}>
            <CircularProgress />
        </div>
    )
}

export default Loading
