import { defineConfig } from "orval";

export default defineConfig({
  test: {
    output: {
      mode: "split",
      target: "src/api/endpoints/test-api.ts",
      schemas: "src/api/model",
      client: "swr",
      prettier: true,
      mock: false,
      override: {
        mutator: {
          path: "src/api/endpoints/axios-instance.ts",
          name: "requestInstance",
        },
      },
    },
    input: {
      target: "swagger.yaml",
    },
  },
});
