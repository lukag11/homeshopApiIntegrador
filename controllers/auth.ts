import { Request, Response } from "express";

import Usuario, { IUser } from "../models/user";

import { ROLES } from "../helpers/constants";

import { sendEmail } from "../mailer/mailer";

import bcryptjs from "bcryptjs";

import randomstring from "randomstring";
import generarJWT from "../helpers/generarJWT";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { nombre, email, password }: IUser = req.body;

  const usuario = new Usuario({ nombre, email, password });

  const salt = bcryptjs.genSaltSync();

  // encriptamos atraves de la funcion
  usuario.password = bcryptjs.hashSync(password, salt);

  const adminKey = req.headers["admin-key"];

  if (adminKey === process.env.KEYFORADMIN) {
    usuario.rol = ROLES.admin;
  }

  const newCode = randomstring.generate(6);

  usuario.code = newCode;

  await usuario.save();

  await sendEmail(email, newCode);

  res.status(201).json({
    usuario,
  });
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, code } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      res.status(400).json({
        msg: "No se encontro el email en la BD",
      });
      return;
    }

    if (usuario.verified) {
      res.status(400).json({
        msg: "El usuario esta correctamente verificado",
      });
      return;
    }

    if (usuario.code !== code) {
      res.status(401).json({
        msg: "el codigo ingresado es incorrecto",
      });
      return;
    }

    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { email },
      { verified: true }
    );

    res.status(200).json({
      msg: "Usuario verificado con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      res.status(400).json({
        msg: "No se encontro el emal en la base de datos",
      });
      return;
    }
    // compara el pass que tenemos alamcenado en la base de datos
    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validarPassword) {
      res.status(400).json({
        msg: "La contraseña es incorrecta",
      });
      return;
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};
