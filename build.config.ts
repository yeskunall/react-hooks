import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
  entries: [
    "hooks/index",
  ],
  clean: true,
  declaration: "node16",
  externals: [],
  rollup: {
    dts: {
      respectExternal: true,
    },
    inlineDependencies: true,
  },
})
