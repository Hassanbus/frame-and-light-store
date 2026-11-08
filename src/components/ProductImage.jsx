import { getAltText, getImageSrc } from '../utils/catalog.js'

// One photo in two sizes.
// WHY srcSet + sizes: the browser picks the small 600px file on phones and the
// 1200px file on big or sharp screens, so phones download less data.
// WHY width/height: the browser keeps the right space free before the photo loads,
// so the page does not jump.
export default function ProductImage({ product, sizes, alt = getAltText(product), eager = false, className }) {
  return (
    <img
      className={className}
      src={getImageSrc(product, 600)}
      srcSet={`${getImageSrc(product, 600)} 600w, ${getImageSrc(product, 1200)} 1200w`}
      sizes={sizes}
      width="1200"
      height="900"
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
