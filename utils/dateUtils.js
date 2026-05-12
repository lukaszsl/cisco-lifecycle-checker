
// Format ISO timestamp into readable UTC date and time
function formatTimestamp(timestamp) {
    if (!timestamp) return null;

    return new Date(timestamp)
        .toISOString()
        .slice(0, 16)
        .replace("T", " ");
}

export { formatTimestamp };