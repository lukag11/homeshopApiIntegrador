import nodemailer from "nodemailer";

// COnfiguracion del transporte
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lgiobanellicospt@gmail.com",
    pass: "vmfajaavwvhcrvge",
  },
  from: "lgiobanellicospt@gmail.com",
});

export const sendEmail = async (
  to: string,
  code: string,
  userName: string
): Promise<void> => {
  try {
    //Configuration of details to Sent Email

    const mailOptions = {
      from: '"FootWearn Register" nickswilliamapi@gmail.com',
      to,
      subject: "Código de verificación para completar registro en FOOTWEARN!",
      text: `
            Bienvenid@ ${userName}. Gracias por registrarse en FootWearn!
            A continuación te brindamos el código de verificación para que completes el registro de tu cuenta.

            Código de verificación: ${code}.
            `,
    };
    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado");
  } catch (error) {
    console.error("Error al enviar el correo electrónico", error);
  }
};

export const sendNewEmail = async (
  to: string,
  code: string,
  userName: string
): Promise<void> => {
  try {
    //Configuration of details to Sent Email

    const mailOptions = {
      from: '"FootWearn New Code" nickswilliamapi@gmail.com',
      to,
      subject:
        "Nuevo código de verificación para completar registro en FOOTWEARN!",
      text: `
            
            Bienvenid@ nuevamente ${userName}.
            Te volvemos a enviar nuevamente tu código de verificación.

            Código de verificación: ${code}.
            `,
    };
    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado");
  } catch (error) {
    console.error("Error al enviar el correo electrónico", error);
  }
};
