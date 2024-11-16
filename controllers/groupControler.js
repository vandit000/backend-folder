import Group from "../modals/groupModal.js";

 const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ message: 'Group name and members are required' });
    }

    const newGroup = new Group({ name, members });
    const savedGroup = await newGroup.save();

    res.status(201).json(savedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating group', error });
  }
};


const getGroups = async (req, res) => {
  try {
    const groups = await Group.find(); 
    res.status(200).json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ message: 'Error fetching groups', error });
  }
};



export {createGroup,getGroups}