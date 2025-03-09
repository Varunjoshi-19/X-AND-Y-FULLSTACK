import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },

    website: String,

    email: {

        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },


}  ,{timestamps : true});


export default mongoose.model("User" , UserSchema);