/* @jsxImportSource @emotion/react */
import * as React from "react";
import { forwardRef } from "react";
import { css } from "@emotion/react";

const buttonCss = css`
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
  background-color: #1c6a97;
`;

const buttonTextCss = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  color: white;
`;

interface ButtonProps<T extends React.ElementType> {
  as?: T;
}

const Button = forwardRef(
  <T extends React.ElementType = "button">(
    {
      as,
      children,
      ...rest
    }: ButtonProps<T> &
      Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
    ref?: React.ComponentPropsWithRef<T>["ref"]
  ) => {
    const Component = as || "button";
    return (
      <Component css={buttonCss} {...rest} ref={ref}>
        <span css={buttonTextCss}>{children}</span>
      </Component>
    );
  }
);

export default Button;
