import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config";


class Sockeyt {
    constructor(Server){
        this.io = new Server(server, {
            cors : {
                origin: '*',
            },
        })
    }
};

this.io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if(!token) {
        return next(new Error('Autehntication error'));
    }
    jwt.verify(token, config.jwt.secretKey, (error, decoded) =>{
        if(error) {
            return next(next Error('Authentication error'));
        }
        next();
    })
})