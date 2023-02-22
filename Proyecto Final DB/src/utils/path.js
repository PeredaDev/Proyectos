import { fileURLToPath } from 'url'
import { dirname } from 'path'

export const __filename = fileURLToPath(import.meta.url)
const tempDir = dirname(__filename)
export const __dirname = tempDir.substring(0, tempDir.length-9)
