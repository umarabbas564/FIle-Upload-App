export enum BackendErrorCode {
  TOKEN_EXPIRED = 403,
}

export interface authenticationResponse {
  jwttoken: string;
}

export type UploadFileParams = {
  file: File;
  fileName: string;
  onRoot: boolean;
};

export type FileItem = {
  uuid: string;
  name: string;
  type: string;
  gaawkFolder: boolean;
  file: {
    uuid: string;
    originalName: string;
    size: number;
    extension: string;
    customName: string;
    previewType: string;
    fileTypeDTO: {
      uuid: string;
      name: string;
      url: string;
    };
  };
  subCount: number;
  insertionTime: number;
  updateTime: number;
  favorite: boolean;
  sharedItem: boolean;
  owner: {
    uuid: string;
    type: string;
    url: string;
    name: string;
    tagLine: string;
    deleted: boolean;
  };
  dirs: Array<any>;
  dirCounts: number;
  size: number;
  enableDelete: boolean;
};

export type GetFilelistParams = {
  page: number;
  size: number;
  sort: String;
};
