import React from 'react'

function Snackbar({message,color}) {
    const [opensnackbar, setopensnackbar] = useState(false);
    const closesnackbar = () => {
        setopensnackbar(false)
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={opensnackbar}
                message={`${message}`}
                autoHideDuration={2000}
                onClose={closesnackbar}
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
