export function bgGradientColor(color) {
    let className;
    switch (color) {
        case 'yellow':
            className = 'bg-gradient-yellow'
            break;
        case 'orange':
            className = 'bg-gradient-orange'
            break;
        case 'purple':
            className = 'bg-gradient-purple'
            break;
        case 'blue':
            className = 'bg-gradient-blue'
            break;
        case 'red':
            className = 'bg-gradient-red'
            break;

        default:
            break;
    }
    return className;
}