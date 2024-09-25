/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';
import { ToastProps } from '../../utilities/types';

const Toast: React.FC<ToastProps> = ({ error, success }) => {
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (error) {
            setShowError(true);
        } else {
            setShowError(false);
        }

        if (success) {
            setShowSuccess(true);
        } else {
            setShowSuccess(false);
        }
    }, [error, success]);

    // Hide toast on cancel icon or timeout
    const handleCloseToast = (type: 'error' | 'success') => (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;

        if (type === 'error') {
            setShowError(false);
        } else if (type === 'success') {
            setShowSuccess(false);
        }
    };

    return (
        <>
            {/* Display error message if error state is true */}
            {showError && (
                <Slide direction="up" in={showError} mountOnEnter unmountOnExit>
                    <Snackbar
                        open={showError}
                        autoHideDuration={5000}
                        onClose={handleCloseToast('error')}
                        sx={{
                            marginBottom: success ? '80px' : '0',
                        }}
                    >
                        <Alert
                            onClose={handleCloseToast('error')}
                            severity="error"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {error}
                        </Alert>
                    </Snackbar>
                </Slide>
            )}

            {/* Display success message if success state is true */}
            {showSuccess && (
                <Slide direction="up" in={showSuccess} mountOnEnter unmountOnExit>
                    <Snackbar
                        open={showSuccess}
                        autoHideDuration={5000}
                        onClose={handleCloseToast('success')}
                    >
                        <Alert
                            onClose={handleCloseToast('success')}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {success}
                        </Alert>
                    </Snackbar>
                </Slide>
            )}
        </>
    );
};

export default Toast;
