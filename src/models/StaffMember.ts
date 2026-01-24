import "server-only";

import mongoose from "mongoose";

export interface IStaffMember {
  name: string;
  roles: string[];
  order: number;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StaffMemberSchema = new mongoose.Schema<IStaffMember>(
  {
    name: { type: String, required: true },
    roles: { type: [String], required: true },
    order: { type: Number, required: true },
    avatarUrl: { type: String, required: false },
  },
  { timestamps: true }
);

export default (mongoose.models.StaffMember as mongoose.Model<IStaffMember>) ||
  mongoose.model<IStaffMember>("StaffMember", StaffMemberSchema);
