import swaggerJSDoc from "swagger-jsdoc";
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "HOMESHOP",
      version: "1.0.0",
      description: "API correspondiente al HOMESHOP",
    },
    servers: [
      {
        url: "https://homeshop-api-integrador.vercel.app/",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
