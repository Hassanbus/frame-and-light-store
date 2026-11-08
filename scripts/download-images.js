// One-time script: downloads every product photo into public/images/.
// Run it with: npm run images
// WHY: the website must not load images from the internet at runtime, so we keep
// local copies. Files that already exist (and are valid) are skipped: download ONCE.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { products } from '../src/data/products.js'

const SIZES = [
  { width: 1200, height: 900 },
  { width: 600, height: 450 },
]
const folder = new URL('../public/images/', import.meta.url)

// A complete JPEG file starts with the bytes FF D8 FF and ends with FF D9.
function isJpeg(bytes) {
  const end = bytes.length
  return (
    end > 1000 &&
    bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff &&
    bytes[end - 2] === 0xff && bytes[end - 1] === 0xd9
  )
}

async function isValidFile(fileUrl) {
  try {
    return isJpeg(await readFile(fileUrl))
  } catch {
    return false // the file does not exist yet
  }
}

await mkdir(folder, { recursive: true })
let downloaded = 0

for (const product of products) {
  for (const { width, height } of SIZES) {
    const fileUrl = new URL(`${product.imageSeed}-${width}.jpg`, folder)
    if (await isValidFile(fileUrl)) continue

    const response = await fetch(`https://picsum.photos/seed/${product.imageSeed}/${width}/${height}`)
    if (!response.ok) throw new Error(`Download failed for ${product.id}: HTTP ${response.status}`)

    const bytes = new Uint8Array(await response.arrayBuffer())
    if (!isJpeg(bytes)) throw new Error(`Not a valid JPEG: ${product.id} (${width}px)`)

    await writeFile(fileUrl, bytes)
    downloaded += 1
    console.log(`saved ${product.imageSeed}-${width}.jpg (${bytes.length} bytes)`)
  }
}

console.log(`Done. Downloaded ${downloaded} new file(s). All ${products.length * SIZES.length} images are valid JPEGs.`)
