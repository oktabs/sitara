// erc/models/Budget.js
import mongoose from "mongoose";
import ItemSchema from "./Item.js";

const BudgetSchema = new mongoose.Schema({
  fiscalYear: Number,
  fundingSource: {
    type: String,
    enum: ["APBD", "Village Fund", "Provincial Assistance"],
  },
  items: [ItemSchema],
  totalBudget: Number,
});

BudgetSchema.pre("validate", function (next) {
  this.totalBudget = this.items.reduce(
    (sum, item) => sum + (item.total || 0),
    0,
  );
  next();
});

export default BudgetSchema;
