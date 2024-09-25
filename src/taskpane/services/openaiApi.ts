/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import OpenAI from "openai";
import { debugLog } from "../utilities/debugLog";
import { UserFormData } from "../utilities/types";
import UIText from "../utilities/textResource";

// Initialize OpenAI with API Key
const openai = new OpenAI({
    apiKey: "YOUR_API_KEY",
    dangerouslyAllowBrowser: true,
});

export const generateComments = async (contractText: string, userResponses: UserFormData): Promise<any[]> => {

    // Now userResponses is of type UserFormData
    const formData = {
        commentsPreference: userResponses.commentsPreference,
        commentsFocus: userResponses.commentsFocus,
        detailedFeedbackSection: userResponses.detailedFeedbackSection,
        stylePreference: userResponses.stylePreference,
        commentsFormatting: userResponses.commentsFormatting,
        additionalRequests: userResponses.additionalRequests,
    };

    const prompt = `
      ${UIText.query.description}
      
      User Preferences:
      - Do you prefer detailed comments or brief notes? ${formData.commentsPreference}
      - Should the comments focus on strict legal accuracy or practical implications? ${formData.commentsFocus}
      - Are there any specific sections you want more detailed feedback on? ${formData.detailedFeedbackSection}
      - Do you have any style preferences for the comments (e.g., formal, casual)? ${formData.stylePreference}
      - Do you want comments on formatting and structure as well as content? ${formData.commentsFormatting}
      - Do you have any additional requests? ${formData.additionalRequests}
      
      Contract Text: ${contractText}
    `;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: "Please return the response strictly as a JSON array."
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        let jsonString = response.choices[0].message.content.trim();

        // Remove any code block markers regardless of the language type (e.g., json, jsx, etc.)
        jsonString = jsonString.replace(/```[a-z]*\n/g, '').replace(/```/g, '').trim();

        // Parse the cleaned-up JSON string to an array
        const parsedArray: any[] = JSON.parse(jsonString);

        if (Array.isArray(parsedArray)) {
            return parsedArray;
        } else {
            throw new Error("Invalid response format");
        }
    } catch (error) {
        debugLog("openaiApi.ts, Line No: 69, Error parsing response:", error);
        return error.code;
    }
};
