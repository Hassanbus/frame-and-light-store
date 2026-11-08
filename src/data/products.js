// All 24 prints in the store. This is demo data for a fictional brand.
// WHY a plain JS file: there is no backend, so our small "database" lives in the code.
// imageSeed is the picsum.photos seed we used ONCE to download each photo into
// public/images/ (see scripts/download-images.js). Nothing is loaded from the internet at runtime.

export const CATEGORIES = ['Nature', 'City', 'Ocean', 'Mountains', 'Minimal', 'Night']

// The home page shows these prints in the "Featured prints" section.
export const FEATURED_IDS = ['blue-cliffs', 'snow-peak', 'lighthouse-stars', 'orange-tulips']

export const products = [
  { id: 'quiet-pine-forest', title: 'Quiet Pine Forest', category: 'Nature', basePrice: 34, createdAt: '2026-02-14', imageSeed: 'fl-37',
    description: 'Tall pines stand in soft green light. A calm print for a bedroom or a reading corner.' },
  { id: 'orange-tulips', title: 'Orange Tulips', category: 'Nature', basePrice: 28, createdAt: '2026-04-03', imageSeed: 'fl-08',
    description: 'Bright orange tulips open in the spring sun. A warm splash of color for a kitchen or a hallway.' },
  { id: 'morning-drop', title: 'Morning Drop', category: 'Nature', basePrice: 24, createdAt: '2026-05-21', imageSeed: 'fl-02',
    description: 'One drop of water hangs from a fresh green leaf. Small details, big calm.' },
  { id: 'frost-at-sunrise', title: 'Frost at Sunrise', category: 'Nature', basePrice: 30, createdAt: '2026-01-09', imageSeed: 'fl-21',
    description: 'A frozen meadow glows at dawn while mist rises behind the trees. Cold air, warm light.' },
  { id: 'midtown-skyline', title: 'Midtown Skyline', category: 'City', basePrice: 42, createdAt: '2026-03-17', imageSeed: 'fl-38',
    description: 'New York towers in the warm haze of early morning. A classic city view for a modern room.' },
  { id: 'twin-classics', title: 'Twin Classics', category: 'City', basePrice: 36, createdAt: '2026-06-02', imageSeed: 'fl-22',
    description: 'Two old classic cars wait in front of bright yellow garage doors. Full of color and story.' },
  { id: 'iron-lines', title: 'Iron Lines', category: 'City', basePrice: 32, createdAt: '2026-08-11', imageSeed: 'fl-28',
    description: 'A steel tower seen from below, in black and white. Strong lines for a clean, graphic wall.' },
  { id: 'striped-facade', title: 'Striped Facade', category: 'City', basePrice: 26, createdAt: '2026-09-25', imageSeed: 'fl-23',
    description: 'Red, yellow and white stripes cover a modern building. Bold, playful and very graphic.' },
  { id: 'blue-cliffs', title: 'Blue Cliffs', category: 'Ocean', basePrice: 44, createdAt: '2026-07-04', imageSeed: 'fl-41',
    description: 'Green cliffs drop into deep blue water on a clear summer day. You can almost hear the waves.' },
  { id: 'storm-coast', title: 'Storm Coast', category: 'Ocean', basePrice: 38, createdAt: '2026-02-27', imageSeed: 'fl-10',
    description: 'Dark clouds roll over a wild beach and a rocky shore. Dramatic and moody.' },
  { id: 'lonely-rock', title: 'Lonely Rock', category: 'Ocean', basePrice: 29, createdAt: '2026-05-08', imageSeed: 'fl-11',
    description: 'A single rock rests in a calm blue sea under a pastel sky. Simple and peaceful.' },
  { id: 'island-view', title: 'Island View', category: 'Ocean', basePrice: 27, createdAt: '2026-10-06', imageSeed: 'fl-01',
    description: 'A quiet beach with dark rocks and small islands far away. A slow morning by the sea.' },
  { id: 'snow-peak', title: 'Snow Peak', category: 'Mountains', basePrice: 46, createdAt: '2026-08-29', imageSeed: 'fl-27',
    description: 'A sharp, snowy summit against a clear blue sky. Bold, clean and full of light.' },
  { id: 'cloud-ridge', title: 'Cloud Ridge', category: 'Mountains', basePrice: 35, createdAt: '2026-01-22', imageSeed: 'fl-07',
    description: 'Low clouds wrap around a forest-covered mountain. Soft greys and deep greens.' },
  { id: 'granite-range', title: 'Granite Range', category: 'Mountains', basePrice: 33, createdAt: '2026-06-18', imageSeed: 'fl-32',
    description: 'Grey stone mountains rise above a dark green valley. A strong print for a big wall.' },
  { id: 'lake-pier', title: 'Lake Pier', category: 'Mountains', basePrice: 31, createdAt: '2026-09-12', imageSeed: 'fl-06',
    description: 'An old wooden pier on a still lake, with misty mountains behind. Quiet and timeless.' },
  { id: 'lone-sail', title: 'Lone Sail', category: 'Minimal', basePrice: 25, createdAt: '2026-03-05', imageSeed: 'fl-09',
    description: 'A small sailboat on a silver sea, in black and white. Lots of space to breathe.' },
  { id: 'into-the-fog', title: 'Into the Fog', category: 'Minimal', basePrice: 22, createdAt: '2026-07-19', imageSeed: 'fl-13',
    description: 'Wooden boards, one rock and a soft wall of grey fog. Calm and almost empty.' },
  { id: 'dune-line', title: 'Dune Line', category: 'Minimal', basePrice: 28, createdAt: '2026-04-24', imageSeed: 'fl-14',
    description: 'One clean line of sand divides light from shadow. Simple shapes, warm tones.' },
  { id: 'sky-mirror', title: 'Sky Mirror', category: 'Minimal', basePrice: 30, createdAt: '2026-10-21', imageSeed: 'fl-30',
    description: 'Clouds reflect on a flat, wet salt plain until sky and ground meet. Light and airy.' },
  { id: 'milky-way-fence', title: 'Milky Way Fence', category: 'Night', basePrice: 37, createdAt: '2026-02-03', imageSeed: 'fl-03',
    description: 'The Milky Way rises over an old wooden fence. A deep green and gold night sky.' },
  { id: 'lighthouse-stars', title: 'Lighthouse Stars', category: 'Night', basePrice: 40, createdAt: '2026-05-30', imageSeed: 'fl-16',
    description: 'A glowing lighthouse under a deep blue, starry sky. Calm, bright and hopeful.' },
  { id: 'falling-star', title: 'Falling Star', category: 'Night', basePrice: 34, createdAt: '2026-08-02', imageSeed: 'fl-18',
    description: 'A bright meteor crosses a sky full of stars. Time to make a wish.' },
  { id: 'night-hills', title: 'Night Hills', category: 'Night', basePrice: 26, createdAt: '2026-10-30', imageSeed: 'fl-04',
    description: 'Stars over a dark meadow and low hills, just after the last light. Quiet and mysterious.' },
]
