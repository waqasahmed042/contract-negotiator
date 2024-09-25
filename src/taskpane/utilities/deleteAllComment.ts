/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { debugLog } from "./debugLog";

export const deleteAllComments = async () => {
    await Word.run(async (context) => {
        // Get all comments in the document body
        const comments = context.document.body.getComments();

        // Load the comment items
        comments.load("items");

        await context.sync();

        if (comments.items.length > 0) {
            // Loop through each comment and delete it
            comments.items.forEach((comment: Word.Comment) => {
                comment.delete();
            });
            await context.sync();
            debugLog("deleteAllComment.ts, Line No: 21", "All comments deleted.");
        } else {
            debugLog("deleteAllComment.ts, Line No: 23", "No comments to delete.");
        }
    });
};
