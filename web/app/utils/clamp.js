//
// ——— Constrain a number to be between a min and max
//
export default function clamp(number, min, max) {
    number = min ? Math.max(number, min) : number
    number = max ? Math.min(number, max) : number
    return number
}
