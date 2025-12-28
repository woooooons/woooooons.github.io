import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import { FullSlug } from "../../util/path"

function generateRobotsTxt(baseUrl?: string) {
  const lines = ["User-agent: *", "Allow: /"]

  if (baseUrl) {
    lines.push(`Sitemap: https://${baseUrl}/sitemap.xml`)
  }

  return lines.join("\n") + "\n"
}

export const Robots: QuartzEmitterPlugin = () => ({
  name: "Robots",
  async emit(ctx) {
    const content = generateRobotsTxt(ctx.cfg.configuration.baseUrl)
    const path = await write({
      ctx,
      content,
      slug: "robots" as FullSlug,
      ext: ".txt",
    })
    return [path]
  },
  async *partialEmit() {},
})
