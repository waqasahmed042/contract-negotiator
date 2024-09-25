/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Box, CircularProgress, circularProgressClasses } from '@mui/material';

const Loader = () => {
    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                }}
            >
                <Box sx={{ position: "relative" }}>
                    <CircularProgress
                        variant="determinate"
                        sx={{
                            color: (theme) =>
                                theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                        }}
                        size={40}
                        thickness={4}
                        value={100}
                    />
                    <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        sx={{
                            color: (theme) => (theme.palette.mode === 'light' ? '#3C34BC' : '#308fe8'),
                            animationDuration: '550ms',
                            position: 'absolute',
                            left: 0,
                            [`& .${circularProgressClasses.circle}`]: {
                                strokeLinecap: 'round',
                            },
                        }}
                        size={40}
                        thickness={4}
                    />
                </Box>
            </div>
        </>
    )
}

export default Loader;
