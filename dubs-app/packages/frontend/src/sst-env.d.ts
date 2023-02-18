/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_GRAPHQL_URL: string
  readonly VITE_STORYBOOK_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}