import nodemailer from "nodemailer";

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
    const mailOptions = {
      from: '"HomeShop Register" lukg2211@gmail.com',
      to,
      subject: "Código de verificación para registrarse en HomeShop!",
      text: `
            Bienvenid@ ${userName}. Gracias por registrarse en HomeShop!
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
    const mailOptions = {
      from: '"HomeShop Nuevo Codigo" lukg2211@gmail.com',
      to,
      subject:
        "Nuevo código de verificación para completar registro en HomeShop!",
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
