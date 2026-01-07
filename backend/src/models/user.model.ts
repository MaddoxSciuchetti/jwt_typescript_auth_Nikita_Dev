import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";


export interface UserDocument extends mongoose.Document{
    email: string; 
    password: string;
    verfified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(val: string): Promise<string>
    omitPassword(): Pick<
    UserDocument,
    "_id" | "email" | "verfified" | "createdAt" | "updatedAt" >;
}

const userSchema = new mongoose.Schema<UserDocument>({
    email: {type: String, required: true},
    password: {type: String, required: true}, 
    verfified: {type: Boolean,required: true,  default: false},
},

{
    timestamps: true,
}
);

userSchema.pre("save", async function(){
    if(this.isModified("password")){
        this.password = await hashValue(this.password);
    };
})

userSchema.methods.comparePassword = async function(val: string){
    return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user
}

const UserModel = mongoose.model<UserDocument>("User", userSchema)
export default UserModel;