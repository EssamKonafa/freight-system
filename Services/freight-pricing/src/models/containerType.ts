import exp from "constants";
import { model, Schema } from "mongoose";

interface ContainerType {
        type: string;
        price: number;
};

const containerTypeSchema = new Schema<ContainerType>({
        type: { type: String },
        price: { type: Number }
});

const ContainerTypeModel = model<ContainerType>("ContainerType", containerTypeSchema);

export default ContainerTypeModel; 