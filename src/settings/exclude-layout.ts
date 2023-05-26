export const EXCLUDE_LAYOUT_PATHS = ['/', '/app-shell-demo']
export const EXCLUDE_NAVBAR_PATHS = ['/app-shell-demo']
export const EXCLUDE_HEADER_PATHS = ['/app-shell-demo']

export const shouldExcludeHeader = (path: string) =>
  EXCLUDE_HEADER_PATHS.some(p => path.startsWith(p))

export const shouldExcludeNavbar = (path: string) =>
  EXCLUDE_LAYOUT_PATHS.includes(path) ||
  EXCLUDE_NAVBAR_PATHS.some(p => path.startsWith(p))
