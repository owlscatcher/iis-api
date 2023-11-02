export default function TrimName(name: string): string {
    return name.substr(name.lastIndexOf(".") + 1)
}