/* @jsxImportSource @emotion/react */
import * as React from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const topNavBarWrapperCss = css`
  background-color: black;
  min-height: 60px;
  width: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
`;

const mainCss = css`
  width: 98%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const backButtonCss = css`
  font-size: 28px;
  cursor: pointer;
`;
const rightSectionCss = css`
  display: flex;
  gap: 18px;
`;
const iconCss = css`
  color: "#fffffff";
  font-size: 20px;
  cursor: pointer;
`;

const TopNavbar: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);
  return (
    <div css={topNavBarWrapperCss}>
      <div css={mainCss}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          css={iconCss}
          onClick={handleClick}
        />
        <div css={rightSectionCss}>
          <div>
            <FontAwesomeIcon icon={faSearch} css={iconCss} />
          </div>
          <FontAwesomeIcon icon={faEllipsisVertical} css={iconCss} />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
