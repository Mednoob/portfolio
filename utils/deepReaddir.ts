export function deepReaddir(path: string): string[] {
    const files = Deno.readDirSync(path);
    const result = [];
    for (const file of files) {
        if (file.isDirectory) {
            result.push(
                ...deepReaddir(`${path}/${file.name}`)
                    .map(x => `/${file.name}${x}`)
            );
        } else {
            result.push("/" + file.name);
        }
    }
    return result;
}
