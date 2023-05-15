/* @jsxImportSource @emotion/react */
import * as React from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import Button from "./Button";

const bottomNavBarWrapperCss = css`
  background-color: black;
  min-height: 60px;
  width: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
`;

const buttonWrapperCss = css`
  width: 85%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
`;

const linkCss = css`
  display: inline-flex;
  align-items: center;
  gap: 1.1111em;
  border: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  padding-top: 0.55556em;
  padding-bottom: 0.55556em;
  padding-left: 1.125em;
  padding-right: 1.125em;
  border-radius: 0.55556em;
  background-color: #a7e5e5;
`;

type BottomNavabrProps = {
  handleButtonClick: () => void;
};

const BottomNavbar: React.FC<BottomNavabrProps> = ({ handleButtonClick }) => {
  return (
    <div css={bottomNavBarWrapperCss}>
      <div css={buttonWrapperCss}>
        <Button onClick={handleButtonClick}> Upload </Button>
        <Link css={linkCss} to="/filesList">
          Render
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;
