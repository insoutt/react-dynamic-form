

function cn(...args: Array<string | undefined>): string {
    if(typeof args === 'undefined') return '';
    return args.filter(Boolean).join(' ').trim();
}


export {
    cn,
}