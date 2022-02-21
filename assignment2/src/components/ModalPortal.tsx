import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

export const ModalPortal: FunctionComponent = ({ children }) => {
  const el = useRef(document.createElement("div"));

  useEffect((): any => {
    if (!modalRoot) return;
    modalRoot.appendChild(el.current);

    return () => modalRoot.removeChild(el.current);
  }, []);
  return createPortal(<>{children}</>, el.current);
};
