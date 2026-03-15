import mongoose from "mongoose"

const travelerInfoSchema = new mongoose.Schema({
    travelerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fromWhere: String,
    toWhere: String,
    maxWeight: String,
    travel_date: {
        type: Date
    },
    from_country_name: {
        type: String,
        required: true,
    },
    from_state_name: {
        type: String,
        required: true,
    },
    to_country_name: {
        type: String,
        required: true,
    },
    to_state_name: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

export default mongoose.model("TravelInfo", travelerInfoSchema)