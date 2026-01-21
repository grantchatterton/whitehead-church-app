import "server-only";

import mongoose from "mongoose";

export interface StaffMember extends mongoose.Document {
  name: string;
  roles: string[];
  avatarUrl?: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type StaffMemberDTO = Pick<
  StaffMember,
  "name" | "roles" | "avatarUrl" | "order"
> & { _id: string; createdAt: string; updatedAt: string };

const StaffMemberSchema = new mongoose.Schema<StaffMember>({
  name: { type: String, required: true },
  roles: { type: [String], required: true },
  avatarUrl: { type: String, required: false },
  order: { type: Number, required: false },
}, { timestamps: true });

export default (mongoose.models.StaffMember as mongoose.Model<StaffMember>) || mongoose.model<StaffMember>("StaffMember", StaffMemberSchema);
