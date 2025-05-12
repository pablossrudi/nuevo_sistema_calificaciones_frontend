/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  VITE_API_URL: string
  // más variables de entorno...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}