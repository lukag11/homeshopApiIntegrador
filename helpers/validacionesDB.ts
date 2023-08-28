import Usuario, { IUser } from "../models/user";
import { sendEmail } from "../mailer/mailer";

export const existeEmail = async (email: string): Promise<void> => {
  const existeMail: IUser | null = await Usuario.findOne({ email });

  if (existeMail && existeMail.verified) {
    throw new Error(`El Correo ${email} ya esta registrado`);
  }

  if (existeMail && !existeMail.verified) {
    await sendEmail(email, existeMail.code as string);
    throw new Error(
      `El usuario ya esta registrado. se envio nuevamente el codigo de verificacion a ${email}`
    );
  }
};
