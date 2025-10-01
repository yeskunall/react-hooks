import z from "zod"

import { hooks } from "./hooks.js"
import { registryItemSchema } from "./schema.js"

import type { Registry } from "./schema.js"

export const registry = {
  name: "@yeskunall/react-hooks",
  homepage: "https://trigram.studio/hooks",
  items: z.array(registryItemSchema).parse(
    [...hooks],
  ),
} satisfies Registry

export default registry
