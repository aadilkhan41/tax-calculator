export function toNumber(value){
    if (!value.includes('$')) value = `$ ${value}`;
    value = value.split(' ');
    value = Number(value[1].replace(/\D/g, ""));
    return value;
}

export function totext(value){
    value = value.toLocaleString();
    if (!value.includes('$')) value = `$ ${value}`;
    return value;
}