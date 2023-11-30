const lastPattern = /(?<=<)([\S]*)(?=>; rel="last")/i;

export function getTotalPages(link: string) {
    const matches = link.match(lastPattern);
    if(!matches || !matches[0]) return undefined; 
    const url = new URL(matches[0]);
    return url.searchParams.get("page");
}