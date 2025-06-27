import { ConfirmEmailData } from "../features/auth/pages/confirmEmail/ConfirmEmailForm";
import { http, postHeaders } from "../services/http";
import { CONFIRM_EMAIL, SEND_EMAIL_CONFIRMATION } from "./apiUrls";

type SendEmailConfirmationResponse = { confirmationSent: boolean };
type ConfirmEmailResponse = { emailConfirmed: boolean };

export const sendEmailConfirmation = async (): Promise<SendEmailConfirmationResponse | undefined> => {
    return http.post<{},SendEmailConfirmationResponse>(SEND_EMAIL_CONFIRMATION, {})
}

export const confirmEmail = async (data: ConfirmEmailData, setError: (err: string) => void): Promise<ConfirmEmailResponse | undefined> => {
    return http.post<ConfirmEmailData, ConfirmEmailResponse>(CONFIRM_EMAIL, data, setError)
}