/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import UIText from '../../../utilities/textResource';
import { useNavigate, useLocation } from 'react-router-dom';
import { commentTypes } from '../../../utilities/types';

const Comments: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract comments from location state
    const { state } = location;
    const comments: commentTypes[] = state?.result || [];

    // Navigate back to the home page
    const handleRetryButton = async () => {
        navigate('/');
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={2}
            marginBottom="60px"
        >
            <Typography variant="body1" gutterBottom sx={{ textAlign: 'left', padding: "0 4px", fontSize: "0.9rem" }}>
                {UIText.comments.header}
            </Typography>
            <Divider sx={{ margin: '8px 0' }} />

            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <Box
                        key={index}
                        sx={{ width: '100%' }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ padding: '0 4px', fontSize: "0.8rem" }}
                        >
                            {comment.comment}
                        </Typography>
                        {index < comments.length - 1 && (
                            <Divider sx={{ margin: '16px 0' }} />
                        )}
                    </Box>
                ))
            ) : (
                <Typography variant="body2" sx={{ padding: '0 4px', fontSize: "0.8rem", color: 'grey' }}>
                    No comments available.
                </Typography>
            )}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    padding: 2,
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    marginTop: "20px",
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleRetryButton}
                    sx={{
                        textTransform: "capitalize",
                        width: "60%",
                        borderRadius: "20px",
                        backgroundColor: "#3C34BC",
                        color: "white"
                    }}
                >
                    {UIText.comments.retry}
                </Button>
            </Box>
        </Box>
    );
};

export default Comments;
