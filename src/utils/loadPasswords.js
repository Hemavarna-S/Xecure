export async function loadPasswords() {
  try {
    const resp = await fetch("/password-list.txt");
    const text = await resp.text();
    // normalize to lowercase for safe matching
    return new Set(
      text
        .split("\n")
        .map((p) => p.trim().toLowerCase())
        .filter(Boolean)
    );
  } catch (e) {
    console.error("Failed to load password list:", e);
    return new Set();
  }
}
