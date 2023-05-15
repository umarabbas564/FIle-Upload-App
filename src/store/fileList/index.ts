import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileItem } from "api/types";

export type FileListState = {
  files: FileItem[];
};
const initialState: FileListState = {
  files: [],
};
const filesListSlice = createSlice({
  name: "filesList",
  initialState,
  reducers: {
    addFiles: (state, { payload }: PayloadAction<FileItem[]>) => {
      for (let i = 0; i < payload.length; i++) {
        state.files.push(payload[i]);
      }
    },
  },
});
export const { addFiles } = filesListSlice.actions;
export default filesListSlice.reducer;
