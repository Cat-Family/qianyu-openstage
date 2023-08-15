export const EXCLUDE_LAYOUT_PATHS = ['/users/login']
export const EXCLUDE_NAVBAR_PATHS = ['/users/login']
export const EXCLUDE_HEADER_PATHS = ['/users/login']

export const shouldExcludeHeader = (path: string) =>
  EXCLUDE_HEADER_PATHS.some(p => path.startsWith(p))
export const shouldExcludeNavbar = (path: string) =>
  EXCLUDE_LAYOUT_PATHS.includes(path) ||
  EXCLUDE_NAVBAR_PATHS.some(p => path.startsWith(p))
