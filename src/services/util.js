export default {
    getOrdinal,
}

export function getOrdinal(n) {
    const ordinals = [ "th", "st", "nd", "rd" ];
    const mod = n % 100;
    const ordinal = ordinals[ ( mod - 20 ) % 10 ] || ordinals[ mod ] || ordinals[ 0 ];
    return `${ n }${ ordinal }`;
}

export function getBlindString( blind ) {
    return `${ blind }/${ blind * 2 }`;
}
