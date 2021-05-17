import React, { ReactElement } from "react";

interface Props {
  content?: string;
}

export default function Button({ content }: Props): ReactElement {
  return <button type="button">{content}</button>;
}
