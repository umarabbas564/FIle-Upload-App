/* @jsxImportSource @emotion/react */
import * as React from "react";
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons/faFile";
import { FileUploader } from "react-drag-drop-files";
import BottomNavbar from "components/BottomNavbar";
import ListView from "components/ListView";
import { authenticateUser } from "store/auth/index";
import { AppDispatch } from "store";
import { uploadFile } from "api";
import { getToken } from "lib/axios";

const rootCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const mainCss = css`
  flex-grow: 1;
`;

const uploadSectionCss = css`
  background-color: #ffffff;
  width: 100%;
  height: 150px;
  box-shadow: 0 6px 6px #0000000f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  label {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }
`;

const UploadView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const jwtToken = getToken();
  const [fileList, setFileList] = useState<File[]>([]);
  const handleUpload = () => {
    fileList.forEach((item) => {
      toast.promise(
        uploadFile({ file: item, fileName: item.name, onRoot: true }),
        {
          success: "Uploaded SuccessFully",
          error: "Uploaded Fialed",
          loading: "Uploading",
        },
        { id: "upload-file" }
      );
    });
    setFileList([]);
  };

  const handleFileChange = (file: File) => {
    setFileList([...fileList, file]);
  };

  useEffect(() => {
    if (!jwtToken) {
      dispatch(authenticateUser());
    }
  }, []);
  return (
    <div css={rootCss}>
      <div css={mainCss}>
        <div css={uploadSectionCss}>
          <FileUploader handleChange={handleFileChange} name="file">
            <FontAwesomeIcon
              icon={faFile}
              css={{ color: "#61b3ff", cursor: "pointer" }}
              size="5x"
            />
            <p>{"Drag and drop or Browse your files"}</p>
          </FileUploader>
        </div>
        <ListView files={fileList} />
      </div>
      <BottomNavbar handleButtonClick={handleUpload} />
    </div>
  );
};

export default UploadView;
