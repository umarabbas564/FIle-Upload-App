import { AxiosError } from "axios";
import axios from "lib/axios";
import {UploadFileParams, FileItem, GetFilelistParams, BackendErrorCode } from "./types";

export class BackendError extends Error {
  code: BackendErrorCode;

  constructor(code: BackendErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

export type ApiError = BackendError | AxiosError;

export const uploadFile = async (
  params: UploadFileParams
): Promise<FileItem> => {
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("fileName", params.fileName);
  //@ts-ignore
  formData.append("onRoot", params.onRoot);

  const data: {} = await axios.post("vault/file", formData);

  return data as FileItem;
};

export const getFileList = async (
  params: GetFilelistParams
): Promise<FileItem[]> => {
  const response = await axios.get("vault/items/me", {
    params: {
      page: params.page,
      size: params.size,
      sort: params.sort,
    },
  });

  if (response?.data) {
    return response?.data;
  }

  return [];
};
