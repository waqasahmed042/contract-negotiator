/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Typography, RadioGroup, FormControlLabel, Radio, FormControl, TextField, Button, Box } from '@mui/material';
import UIText from '../../../utilities/textResource';
import Loader from '../../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { questionsArray } from '../../../utilities/questions';
import { searchDocument } from '../../../utilities/serchDocument';
import { generateComments } from '../../../services/openaiApi';
import { UserFormData } from '../../../utilities/types';
import { debugLog } from '../../../utilities/debugLog';
import { getDocBody } from '../../../utilities/getDocBody';
import { deleteAllComments } from '../../../utilities/deleteAllComment';
import Toast from '../../Toast/Toast';

const Questions: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = React.useState<{ [key: number]: string }>({});
    const [textAreaValues, setTextAreaValues] = React.useState<{ [key: number]: string }>({});

    // Handle the selection of a radio button
    const handleRadioChange = (questionIndex: number, answer: string) => {
        setAnswers((prevValues) => ({
            ...prevValues,
            [questionIndex]: answer
        }));

        if (answer === 'Skip') {
            // Update textarea value when 'Skip' is selected
            setTextAreaValues((prevValues) => ({
                ...prevValues,
                [questionIndex]: 'Skip'
            }));
        } else {
            // Clear the textarea value when other options are selected
            setTextAreaValues((prevValues) => ({
                ...prevValues,
                [questionIndex]: ''
            }));
        }
    };

    // Handle textarea change
    const handleTextAreaChange = (questionIndex: number, value: string) => {
        setTextAreaValues((prevValues) => ({
            ...prevValues,
            [questionIndex]: value
        }));
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        setError(null);

        // Delete all comments
        await deleteAllComments();
        const documentBody = await getDocBody();

        const allAnswers = questionsArray.map((item, index) => ({
            question: item.question,
            answer: answers[index] || '',
            textAreaValue: textAreaValues[index] || ''
        }));

        event.preventDefault();

        if (allAnswers) {
            try {
                const contractText = documentBody;
                const userResponses: UserFormData = {
                    commentsPreference: allAnswers[0].answer,
                    commentsFocus: allAnswers[1].answer,
                    detailedFeedbackSection: allAnswers[2].textAreaValue,
                    stylePreference: allAnswers[3].answer,
                    commentsFormatting: allAnswers[4].answer,
                    additionalRequests: allAnswers[5].textAreaValue,
                };

                // Call Generate comments using OpenAI API
                handleGenerateComments(contractText, userResponses);
            } catch (error) {
                debugLog('Question.tsx, Line No: 87, Error generating comments:', error);
                setIsLoading(false);
            }
        }
    };

    // Generate comments using OpenAI
    const handleGenerateComments = async (contractText: string, userResponses: UserFormData) => {
        setIsLoading(true);
        try {
            const data: any = await generateComments(contractText, userResponses);
            debugLog("Question.ts, Line No: 95, generateComments Success Callback", data);

            if (data == "invalid_api_key") {
                setError("Invalid API Key");
            } else {
                setError(data);
            }

            // Iterate over the generated comments
            for (const { paragraph, comment } of data) {
                await searchDocument(paragraph, comment);

                setAnswers({});
                setTextAreaValues({});
                navigate('/comments', { state: { result: data } });
            }
        } catch (error) {
            debugLog("Question.ts, Line No: 105, Line no 82: generateComments Error Callback", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle the close action
    const handleClose = () => {
        setAnswers({});
        setTextAreaValues({});

        // close taskpane functionality
        Office.context.ui.closeContainer();
    }

    // Check if at least one question has been answered
    const isSubmitDisabled = !Object.keys(answers).length;

    return (
        <>
            {isLoading && (<Loader />)}

            <Box sx={{ marginBottom: "60px" }}>
                {questionsArray.map((item, index) => (
                    <FormControl component="fieldset" key={index} style={{ margin: '8px' }}>
                        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>{item.question}</Typography>

                        {/* Add a textarea based on the question index with different placeholders */}
                        {item.answers.length === 1 && item.answers[0] === 'Skip' && (
                            <TextField
                                variant="outlined"
                                multiline
                                rows={2}
                                value={textAreaValues[index] || ''}
                                onChange={(e) => handleTextAreaChange(index, e.target.value)}
                                sx={{ marginTop: '8px', marginBottom: '8px', maxWidth: '100%' }}
                                placeholder={
                                    index === 2 ? "Enter your detailed feedback" :
                                        index === 5 ? "Enter your additional requests" : "Enter your text here"
                                }
                            />
                        )}

                        <RadioGroup
                            aria-label={`question-${index}`}
                            name={`question-${index}`}
                            value={answers[index] || ''}  // Control the RadioGroup value
                            onChange={(e) => handleRadioChange(index, e.target.value)}
                        >
                            {item.answers.map((answer, answerIndex) => (
                                <FormControlLabel
                                    key={answerIndex}
                                    value={answer}
                                    control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: '16px' } }} />}
                                    label={answer}
                                    sx={{ fontSize: '16px' }}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                ))}
            </Box>

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
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}  // Disable when no answers are selected
                    sx={{
                        textTransform: "capitalize",
                        width: "50%",
                        borderRadius: "20px",
                        backgroundColor: isSubmitDisabled ? "#B9E3FE" : "#3C34BC",
                        color: isSubmitDisabled ? "#565656" : "white"
                    }}
                >
                    {UIText.questions.submit}
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                        textTransform: "capitalize",
                        width: "50%",
                        borderRadius: "20px",
                        borderColor: "black",
                        color: "black"
                    }}
                >
                    {UIText.questions.close}
                </Button>
            </Box>

            {/* Display error message */}
            {error && (<Toast error={error} />)}
        </>
    );
};

export default Questions;
