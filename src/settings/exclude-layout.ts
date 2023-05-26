export const EXCLUDE_LAYOUT_PATHS = ['']
export const EXCLUDE_NAVBAR_PATHS = ['']
export const EXCLUDE_HEADER_PATHS = ['']

export const shouldExcludeHeader = (path: string) =>
  // EXCLUDE_HEADER_PATHS.some(p => path.startsWith(p))
  false
export const shouldExcludeNavbar = (path: string) =>
  // EXCLUDE_LAYOUT_PATHS.includes(path) ||
  // EXCLUDE_NAVBAR_PATHS.some(p => path.startsWith(p))
  false
