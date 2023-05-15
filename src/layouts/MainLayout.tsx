/* @jsxImportSource @emotion/react */
import * as React from "react";
import { Suspense } from "react";
import { css } from "@emotion/react";
import TopNavbar from "components/TopNavbar";

const rootCss = css`
  height: 100%;
  background-color: #e2ebeb;
  background-attachment: fixed;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div css={rootCss}>
      <TopNavbar />
      <div css={{ flexGrow: 1 }}>
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
};

export default MainLayout;
