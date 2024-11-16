import mongoose from "mongoose";



const expenseSchema = new mongoose.Schema({
  paidBy: {
    id: {
      type: String, 
      required: true,
    },
    name: {
      type: String, 
      required: true,
    },
    email: {
      type: String, 
    },
  },
  owedBy: {
  
    id: {
      type: String, 
      required: true,
    },
    name: {
      type: String, 
      required: true,
    },
    email: {
      type: String, 
    },
  },
  amount: {
    type: Number, 
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
