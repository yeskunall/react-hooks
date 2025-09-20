import { createMDX } from "fumadocs-mdx/next"

import type { NextConfig } from "next"

const withMDX = createMDX()

export default withMDX({}) satisfies NextConfig
