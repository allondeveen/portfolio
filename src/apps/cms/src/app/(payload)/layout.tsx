/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from "@payload-config";

import {
  checkCMSPackageRequirementsServerFunction,
  checkCMSPackageRequirementsServerFunctionName,
} from "@allondeveen-portfolio/setup-checklist/cms";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";

import { importMap } from "./admin/importMap.js";

import type { ServerFunctionClient } from "payload";
import "./custom.scss";

import "@allondeveen-portfolio/setup-checklist/style.css";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
    serverFunctions: {
      [checkCMSPackageRequirementsServerFunctionName]: checkCMSPackageRequirementsServerFunction,
    },
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
