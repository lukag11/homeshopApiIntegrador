import mongoose from "mongoose";

export const connectionDB = async (): Promise<void> => {
  try {
    const dbURL = process.env.DB_URL;
    if (!dbURL) {
      throw new Error("La Url no esta bien definida en los .env");
    }
    await mongoose.connect(dbURL);
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos");
  }
};
