/** @format */

import { join as joinPath } from 'path';
export const makeModulePath = (basePath: string) => (path: string) =>
  joinPath(basePath, path);
