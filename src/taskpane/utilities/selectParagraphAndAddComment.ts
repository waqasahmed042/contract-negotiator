/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { debugLog } from "./debugLog";

export const selectParagraphAndAddComment = async (comment: string) => {
    try {
        await Word.run(async (context) => {
            // Search for the substring in the document body
            if (comment) {
                var selection = context.document.getSelection();

                // Add a comment to the found paragraph
                selection.insertComment(comment);
            } else {
                debugLog("selectParagraphAndAddComment.ts, Line No: 15", "Paragraph not found");
            }

            await context.sync();
        });
    } catch (error) {
        debugLog("selectParagraphAndAddComment.ts, Line No: 21: Error adding comment to paragraph:", error);
    }
};

