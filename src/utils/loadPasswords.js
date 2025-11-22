export async function loadPasswords() {
    const response = await fetch("/password-list.txt");
    const text = await response.text();

    return new Set(
        text
            .split("\n")
            .map(p => p.trim().toLowerCase())
            .filter(Boolean)
    );
}
