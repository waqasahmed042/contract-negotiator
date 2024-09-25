/* eslint-disable prettier/prettier */
export interface UserFormData {
    commentsPreference: string;
    commentsFocus: string;
    detailedFeedbackSection: string;
    stylePreference: string;
    commentsFormatting: string;
    additionalRequests: string;
}

export interface commentTypes {
    title: string;
    comment: string;
    paragraph: string;
}

export interface ToastProps {
    error?: string;
    success?: string;
}