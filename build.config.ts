import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
  name: "@yeskunall/react-hooks",
  entries: [
    "hooks/index",
  ],
  clean: true,
  declaration: "node16",
  externals: [
    "react",
    "react-dom",
  ],
  peerDependencies: [
    "react",
  ],
  rollup: {
    dts: {
      respectExternal: true,
    },
    inlineDependencies: true,
  },
})
