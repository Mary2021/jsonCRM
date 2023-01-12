import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PopConfirm({ title = '', message = '', onConfirm, confirmBtnText = 'OK', cancelBtnText = 'Loobu', children }) {
    const [open, setOpen] = useState(false);

    const handleOpen = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleConfirm = () => {
        setOpen(false);
        onConfirm()
    }

    return (
        <>
            <span onClick={(e) => handleOpen(e)}>{children}</span>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                    <Button onClick={handleClose}>{cancelBtnText}</Button>
                    <Button onClick={handleConfirm}>{confirmBtnText}</Button>
                </Box>
            </Modal>
        </>
    );
}