import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";

export interface IUser {
  nombre: string;
  email: string;
  password: string;
  rol?: string;
  code?: string;
  verified?: boolean;
}

const UserSchema = new Schema<IUser>({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },

  email: {
    type: String,
    required: [true, "El email es obligatorio"],
  },

  password: {
    type: String,
    required: [true, "La contraseñña es obligatoria"],
  },
  rol: {
    type: String,
    default: ROLES.user,
  },
  code: {
    type: String,
  },

  verified: {
    type: Boolean,
    default: false,
  },
});

// Borramos el guion bajo cuando hacemos post
// Nos permite modificar el schema al momento que le respondemos al cliente
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, code, ...usuario } = this.toObject();
  return usuario;
};

const Usuario: Model<IUser> = model<IUser>("Usuario", UserSchema);

export default Usuario;
