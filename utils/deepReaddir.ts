export async function deepReaddir(path: string): Promise<string[]> {
    const files = Deno.readDir(path);
    const result = [];
    for await (const file of files) {
        if (file.isDirectory) {
            result.push(
                ...(await deepReaddir(`${path}/${file.name}`))
                    .map(x => `/${file.name}${x}`)
            );
        } else {
            result.push("/" + file.name);
        }
    }
    return result;
}
