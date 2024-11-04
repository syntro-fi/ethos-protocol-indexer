import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/types/contracts.ts",
  contracts: [],
  plugins: [
    foundry({
      project: ".",
      artifacts: "./abis",
      include: ["Mission.json", "ModuleRegistry.json"],
    }),
  ],
});
