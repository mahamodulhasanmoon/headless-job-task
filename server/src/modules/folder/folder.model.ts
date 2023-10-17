import { Schema, model } from "mongoose";

const folderSchema = new Schema({
    name: String,

},{timestamps:true})

export const Folder =  model('Folder',folderSchema);

