import mongoose from "mongoose";
import Expense from "../modals/expenseModal.js";
import User from "../modals/userModal.js";


export const createExpense = async (req, res) => {
  try {
    const expenses = req.body; 

    for (let expenseData of expenses) {
      try {
          const { paidBy, owedBy, amount, description, createdAt } = expenseData;
  
          if (!paidBy || !owedBy || !amount || !description || !createdAt) {
              throw new Error('Missing required fields.');
          }

          const paidByUser = await User.findById(paidBy.id);
          const owedByUser = await User.findById(owedBy.id);
  
          if (!paidByUser || !owedByUser) {
              throw new Error('User not found.');
          }

          const newExpense = new Expense({
              paidBy,
              owedBy,
              amount,
              description,
              createdAt
          });
  
          await newExpense.save();  
  
      } catch (error) {
          console.error("Error processing expense:", error.message);
        
      }
  }
  
    res.status(201).json({
      message: "Expenses created successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while creating the expenses."
    });
  }
};


export const getAllExpenses = async (req, res) => {
  try {
    const { userId } = req.query;


    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }


    const filter = {
      "$or": [
        { "paidBy.id": new mongoose.Types.ObjectId(userId) },  
        { "owedBy.id": new mongoose.Types.ObjectId(userId) },   
      ],
    };

    const expenses = await Expense.find(filter)
      .populate("paidBy.id", "name")  
      .populate("owedBy.id", "name") 
      .exec();


    return res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({ error: "Failed to fetch expenses" });
  }
};



export const getFriendTransactions = async (req, res) => {
  try {
    const { userId, friendId } = req.query;

    if (!userId || !friendId) {
      return res.status(400).json({ message: 'User ID and Friend ID are required.' });
    }

    const transactions = await Expense.find({
      $or: [
        { 'paidBy.id': userId, 'owedBy.id': friendId },
        { 'paidBy.id': friendId, 'owedBy.id': userId },
      ],
    });


    const formattedTransactions = transactions.map((transaction) => {
      const isUserPayer = transaction.paidBy.id === userId;
      return {
        description: transaction.description || 'No description provided',
        amount: isUserPayer ? transaction.amount : -transaction.amount,
        date: transaction.date || null, 
      };
    });

    res.status(200).json({ transactions: formattedTransactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};