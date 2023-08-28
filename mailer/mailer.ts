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

// Funcion para enviar un correo electronico

export const sendEmail = async (to: string, code: string): Promise<void> => {
  try {
    // configuracion detalles del correo
    const mailOptions = {
      from: "lgiobanellicospt@gmail.com",
      to,
      subject: "Codigo de verificacion para tu cuenta",
      text: `Llego tu codigo al correo.
      El codigo para verificarte es : ${code}`,
    };

    // enviar el correo electronico

    await transporter.sendMail(mailOptions);
    console.log("Correo electronico enviado");
  } catch (error) {
    console.log("Error al enviar el correo electronuco", error);
  }
};
