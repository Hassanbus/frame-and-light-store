// Small, safe helpers around localStorage.
// WHY: localStorage can throw an error (private mode, full disk, blocked storage)
// and the saved text can be broken. The app must keep working in all these cases.

export function loadState(key, fallback) {
  try {
    const text = localStorage.getItem(key)
    // Nothing saved yet, so we use the default value.
    if (text === null) return fallback
    return JSON.parse(text)
  } catch {
    // Broken JSON or blocked storage: start fresh instead of crashing the app.
    return fallback
  }
}

export function saveState(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    // Saving is "nice to have". If it fails, the app still works for this visit.
    return false
  }
}
