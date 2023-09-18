import jwt from "jsonwebtoken";

export const generarJWT = async (id: string = ""): Promise<string> => {
  return new Promise((res, rej) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.SECRETPASS as string,
      {
        expiresIn: "60m",
      },
      (error: Error | null, token: string | undefined) => {
        if (error) {
          console.log(error);
          rej("No se pudo generar el token");
        } else {
          res(token as string);
        }
      }
    );
  });
};
