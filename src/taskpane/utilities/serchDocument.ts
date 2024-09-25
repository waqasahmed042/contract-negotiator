/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
/* eslint-disable prettier/prettier */
/* eslint-disable office-addins/no-navigational-load */
/* eslint-disable office-addins/load-object-before-read */
import { debugLog } from "./debugLog";
import { selectParagraphAndAddComment } from "./selectParagraphAndAddComment";

export const searchDocument = async (paragraph: string, comment: string) => {
    await Word.run(async (context) => {
        let SearchOptions = {
            ignoreSpace: false,
            matchCase: false,
        }

        let paragraphtext: string;

        if (paragraph.length >= 160) {
            debugLog("searchDocumen.ts, Line No: 19,", "paragraph size is to big");
            paragraphtext = paragraph.substring(0, 150);
        } else {
            debugLog("searchDocumen.ts, Line No: 22", "normal paragraph");
            paragraphtext = paragraph;
        }

        const results: Word.RangeCollection = context.document.body.search(paragraphtext, SearchOptions);
        results.load("length");

        await context.sync();

        if (results.items.length > 0) {
            results.items[0].select();
            var selection = context.document.getSelection();

            // Load the paragraphs of the current selection
            selection.paragraphs.load("items");
            await context.sync();
            // Check if there are any paragraphs in the selection
            if (selection.paragraphs.items.length > 0) {
                // Get the first paragraph in the selection
                var selectedParagraph = selection.paragraphs.items[0];

                // Select the paragraph
                selectedParagraph.select();
                await context.sync();

                await selectParagraphAndAddComment(comment);
            }

            await context.sync();
            debugLog("searchDocumen.ts, Line No: 51", Selection)
        } else {
            debugLog("searchDocumen.ts, Line No: 53, No match found for the given paragraph : ", paragraphtext);
            let newparagraph = paragraphtext.split(".")[1];
            const removeSpacing = newparagraph.trimStart();
            debugLog("newparagraph", newparagraph);
            debugLog("removeSpacin", removeSpacing);
            const results: Word.RangeCollection = context.document.body.search(removeSpacing, SearchOptions);
            results.load("length");

            await context.sync();

            if (results.items.length > 0) {
                debugLog("searchDocumen.ts, Line No: 64", paragraphtext);
                results.items[0].select();
                var selection = context.document.getSelection();

                // Load the paragraphs of the current selection
                selection.paragraphs.load("items");
                await context.sync();
                // Check if there are any paragraphs in the selection
                if (selection.paragraphs.items.length > 0) {
                    // Get the first paragraph in the selection
                    var selectedParagraph = selection.paragraphs.items[0];

                    // Select the paragraph
                    selectedParagraph.select();
                    await context.sync();

                    await selectParagraphAndAddComment(comment);
                }
                await context.sync();
            } else {
                debugLog("searchDocumen.ts, Line No: 84, No match found for the given paragraph : ", paragraphtext);
            }
        }

        await context.sync();
    });
}
