import { CallbackError, model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

interface IUser {
    email: string;
    OTPCode: number|null;
    OTPExpiresAt: Date|null;
    isActivated: boolean;
};

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    OTPCode: { type: Number, default: null },
    OTPExpiresAt: { type: Date, default:null },
    isActivated: { type: Boolean, default: false },
},{ timestamps: true } );

// userSchema.pre<IUser>('save', async function (next) {
//     if (!this.isModified('OTPCode')) {
//         return next()
//     }
//     try {
//         const salt = await bcrypt.genSalt(10)
//         this.OTPCode = await bcrypt.hash(this.OTPCode, salt)
//         next();
//     } catch (error) {
//         next(error as CallbackError);
//         throw error
//     }
// })

const UserModel = model<IUser>("User", userSchema);

export default UserModel;