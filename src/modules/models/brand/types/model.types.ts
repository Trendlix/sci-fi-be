import mongoose from "mongoose";

export interface IBrand {
    whatsAppMe: string;
}

export interface IBrandDocument extends IBrand, mongoose.Document { }