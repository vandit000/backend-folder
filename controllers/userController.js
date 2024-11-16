import User from "../modals/userModal.js";

export const loginUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email });
      await user.save();
    }

    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email"); 
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};
