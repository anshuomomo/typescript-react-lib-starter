// @ts-ignore
import { clientReactRender } from "onefx/lib/iso-react-render/client-react-render";
import React from "react";
import Component from "../src/index";

clientReactRender({
  VDom: <Component />,
  clientScript: "/main.js"
});
