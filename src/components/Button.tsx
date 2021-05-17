import React, { ReactElement } from "react";

export interface ButtonProps {
  content?: string;
}

export default function Button({ content }: ButtonProps): ReactElement {
  return <button type="button">{content}</button>;
}
