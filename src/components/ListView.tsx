/* @jsxImportSource @emotion/react */
import * as React from "react";
import { css } from "@emotion/react";
import { FileItem } from "api/types";
import { getIcon } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const filesGridWrapperCss = css`
  overflow-y: auto;
  flex-grow: 1;
  width: 100%;
`;

const filesGridCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 97%;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const fileWrapperCss = css`
  min-height: 120px;
  min-width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const thumbnailImageWrapper = css`
  border: 2px solid grey;
  border-radius: 10px;
  min-width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const thumbnailImage = css`
  width: 63%;
  height: auto;
  max-width: 120px;
  max-height: 120px;
`;

const fileNameCss = css`
  max-width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
type ListViewProps = {
  files: File[] | FileItem[];
  renderUploadedFiles?: boolean | undefined;
};

const ListView: React.FC<ListViewProps> = ({ files, renderUploadedFiles }) => {
  return (
    <div css={filesGridWrapperCss}>
      {!renderUploadedFiles && (
        <div css={filesGridCss}>
          {Array.from(files as File[])?.map((item: File, index) => (
            <div key={index} css={fileWrapperCss}>
              <div css={thumbnailImageWrapper}>
                <FontAwesomeIcon
                  icon={faFile}
                  css={{ color: "#61b3ff" }}
                  size="5x"
                />
              </div>
              <p css={fileNameCss}>{item.name}</p>
              <p>{`${item.name.split(".")[1]} file`}</p>
            </div>
          ))}
        </div>
      )}
      {renderUploadedFiles === true && (
        <div css={filesGridCss}>
          {Array.from(files as FileItem[])?.map((item: FileItem, index) => (
            <div key={index} css={fileWrapperCss}>
              <div css={thumbnailImageWrapper}>
                <img
                  css={thumbnailImage}
                  src={
                    item?.file.previewType.toLocaleLowerCase() === "image"
                      ? item?.file?.customName
                      : //@ts-ignore
                        getIcon[item?.file?.extension]
                  }
                  alt={item?.file?.customName}
                />
              </div>
              <p css={fileNameCss}>{item.name}</p>
              <p>{`${item.file.extension} file`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListView;
