import { Request, Response } from "express";
import { Folder } from "./folder.model";




export const getFolders = async (_req:Request, res:Response) => {
  try {
    const folders = await Folder.find({});
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createFolder = async (req:Request, res:Response) => {
  const { name, parentId:mother } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const rootFolder = await Folder.findOne({ parentId: null, name: 'root' });

    let parentId;

    if (!mother) {

        parentId =   rootFolder?._id.toString();
    } else {
        parentId = mother;
    }

    const folder = new Folder({ name, parentId });
    await folder.save();
    res.json(folder);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// export const deleteFolder = async (req:Request, res:Response) => {
//   const folderId = req.params.id;

//   try {
//     const folder = await Folder.findById(folderId);

//     if (!folder) {
//       return res.status(404).json({ error: 'Folder not found' });
//     }

//     if (!folder?.parentId) {
//       return res.status(400).json({ error: 'Root folder cannot be deleted' });
//     }

//     await folder.remove();
//     res.json({ message: 'Folder deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };
