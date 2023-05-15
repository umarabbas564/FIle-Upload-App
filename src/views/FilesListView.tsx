/* @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderTree } from "@fortawesome/free-solid-svg-icons";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import ListView from "components/ListView";
import { getFileList } from "api";
import { AppDispatch, RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { addFiles } from "store/fileList";
import { useIntersectionObserver } from "hooks/useInfiniteScroll";

const rootCss = css`
  width: 100%;
`;

const folderStructureWrapperCss = css`
  padding-top: 20px;
  width: 93%;
  margin: 0 auto;
  display: flex;
  gap: 18px;
`;

const iconWrapperCss = css`
  width: 72px;
  height: 72px;
  background-color: #5ea29b;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const fileListWrappercss = css`
  width: 97%;
  background-color: white;
  margin: 20px auto;
  min-height: 400px;
`;

const toolbarCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  margin: 12px auto;
`;

const leftToolbarCss = css`
  display: flex;
  gap: 20px;
  align-items: center;
  padding-top: 12px;
`;

const rightToolbarCss = css`
  display: flex;
  gap: 20px;
  align-items: center;
  padding-top: 12px;
`;

const PAGE_SIZE = 40;

const FilesListView: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [sortList, setSortList] = useState<String>("NEWEST");
  const [currentPageRecordCount, setCurrentPageRecordCount] = useState<number>(
    1
  );
  const dispatch = useDispatch<AppDispatch>();
  const fileList = useSelector((state: RootState) => state.filesList.files);
  const ref = useRef(null);
  const isBottomVisible = useIntersectionObserver(
    ref,
    {
      threshold: 0,
    },
    false
  );
  useEffect(() => {
    if (currentPageRecordCount) {
      getFileList({ page: pageNumber, size: PAGE_SIZE, sort: sortList }).then(
        (res) => {
          dispatch(addFiles(res));
          setCurrentPageRecordCount(res.length || 0);
        }
      );
    }
  }, [pageNumber, sortList]);

  useEffect(() => {
    isBottomVisible && setPageNumber(pageNumber + 1);
  }, [isBottomVisible]);

  return (
    <div css={rootCss}>
      <div css={folderStructureWrapperCss}>
        <div css={iconWrapperCss}>
          <FontAwesomeIcon
            icon={faFolderTree}
            css={{ color: "white" }}
            size="3x"
          />
        </div>
        <div>
          <h3 css={{ fontWeight: "bolder" }}>{"Vault > One of my folders"}</h3>
          <p>22 items, created: 12.10.2020</p>
          <p>Last Modified: 19.02.2021</p>
        </div>
      </div>
      <div css={fileListWrappercss}>
        <div css={toolbarCss}>
          <div css={leftToolbarCss}>
            <FontAwesomeIcon icon={faFolderPlus} size="2x" />
            <FontAwesomeIcon icon={faFileArrowUp} size="2x" />
            <div>
              <input type="checkbox" id="file-select" name="files" />
              <label css={{ paddingLeft: 6 }} htmlFor="files">
                Select all
              </label>
            </div>
          </div>
          <div css={rightToolbarCss}>
            <FontAwesomeIcon icon={faArrowDownShortWide} size="2x" />
            <FontAwesomeIcon icon={faListUl} size="2x" />
          </div>
        </div>
        <ListView files={fileList} renderUploadedFiles={true} />
        <div ref={ref} style={{ width: "100%", height: "100px" }}></div>
      </div>
    </div>
  );
};

export default FilesListView;
