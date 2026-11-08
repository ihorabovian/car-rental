import type { CodegenConfig } from "@graphql-codegen/cli"
import { loadEnvConfig } from "@next/env"

loadEnvConfig(process.cwd())

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  documents: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}", "!lib/gql/**"],
  ignoreNoDocuments: true,
  generates: {
    "lib/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        enumsAsTypes: true,
        onlyOperationTypes: true,
        useTypeImports: true,
      },
    },
  },
}

export default config
