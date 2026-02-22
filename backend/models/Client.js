import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema(
  {
    clientRef: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    riskCategory: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High']
    },
    classification: { type: String, required: true, trim: true },
    advisor: { type: String, required: true, trim: true },
    notes: { type: String, default: '', trim: true }
  },
  { timestamps: true }
);

// Helpful text index for future search improvements (optional)
ClientSchema.index({ fullName: 'text', email: 'text', clientRef: 'text', advisor: 'text' });

export default mongoose.model('Client', ClientSchema);
