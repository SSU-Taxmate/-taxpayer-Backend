import React from 'react'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
function Snackbar({open,message,color}) {
    const closesnackbar=()=>{
        
    }
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                message={`${message}`}
                autoHideDuration={2000}
                action={<IconButton
                    aria-label="close"
                    color={color}
                    onClick={closesnackbar}
                >
                    <CloseIcon />
                </IconButton>} />
        </>
    )
}

export default Snackbar
