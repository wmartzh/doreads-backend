import swaggerJSDoc from "swagger-jsdoc";
import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express"

const swaggerOptions: swaggerJSDoc.Options ={
    definition:{
    openapi: "3.0.3",
    info:{
        title: "Documentation of the API",
        version: "1.0.0",
    },
    servers:[
        {
            url: "http://127.0.0.1:8000",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type:"http",
                scheme: "bearer",
            },
        },
        schemas: {
            user:{
                type:"class",
                required: ["email", "password","name"],
                properties: {
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },
            book:{
                type:"class",
                required: ["title", "author","isbn","category","year","picture","editorial","langage"],
                properties: {
                    title: {
                        type: "string",
                    },
                    author: {
                        type: "string",
                    },
                    isbn: {
                        type: "int",
                    },
                    category: {
                        type: "string",
                    },
                    year: {
                        type: "int",
                    },
                    picture: {
                        type: "string?",
                    },
                    editorial: {
                        type: "string?",
                    },
                    language: {
                        type: "String",
                    },
                },
            },
            bookInfo:{
                type:"class",
                required: ["code", "status","book","bookId","loan"],
                properties: {
                    code: {
                        type: "int",
                    },
                    status: {
                        type: "object",
                    },
                    book: {
                        type: "object",
                    },
                    bookId: {
                        type: "int",
                    },
                    loan: {
                        type: "object",
                    },
                },
            },
            student:{
                type:"class",
                required: ["code", "name","email","phone","status","loan","penalty",],
                properties: {
                    code: {
                        type: "int",
                    },
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    phone: {
                        type: "string",
                    },
                    status: {
                        type: "object",
                    },
                    loan: {
                        type: "object",
                    },
                    penalty: {
                        type: "object",
                    },
                },
            },
            penalty:{
                type:"class",
                required: ["amount", "status","student","studentId"],
                properties: {
                    amount: {
                        type: "int",
                    },
                    status: {
                        type: "object",
                    },
                    student: {
                        type: "object",
                    },
                    studentId: {
                        type: "int",
                    },
                },
            },
            loan:{
                type:"class",
                required: ["student", "studentId","bookInfo","bookInfoId"],
                properties: {
                    student: {
                        type: "object",
                    },
                    studentId: {
                        type: "int",
                    },
                    bookInfo: {
                        type: "object",
                    },
                    bookInfoId: {
                        type: "int",
                    },
                },
            },
        },
    },
},
    apis: ["../routes/*.ts"],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

function swaggerDocs (app: Express, port: number){
    // Swagger Page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Docs in Json format
    app.get("docs.json", (req : Request, res: Response)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec)
    })

    console.log(`The documentation is aviable at http://localhost:${port}/docs`)
}

export default swaggerDocs