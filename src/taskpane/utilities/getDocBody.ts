/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
export const getDocBody = async () => {
    return Word.run(async (context) => {
        // Create a proxy object for the document body.
        const docBody = context.document.body;

        // Queue a command to load the text in document body.
        docBody.load("text");

        // Synchronize the document state by executing the queued commands.
        await context.sync();

        // Return the body text
        return docBody.text;
    });
}
