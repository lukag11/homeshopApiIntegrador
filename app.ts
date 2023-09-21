import { Server } from "./models/server";

import dotenv from "dotenv";

import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerSpec } from "./swagger/swaggerConfig";

dotenv.config();

const server = new Server();

server.listen();
