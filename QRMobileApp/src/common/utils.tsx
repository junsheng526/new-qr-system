var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;

export const sortAlphaNum = (a: any, b: any) => {
    a = a.name;
    b = b.name;
    var aA = a.replace(reA, '');
    var bA = b.replace(reA, '');
    if (aA === bA) {
        var aN = parseInt(a.replace(reN, ''), 10);
        var bN = parseInt(b.replace(reN, ''), 10);
        return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
        return aA > bA ? 1 : -1;
    }
};

export const changeTableColor = (item: { status: string }) => {
    const curr = item.status;
    switch (curr) {
        case 'NEEDTO_ORDER':
            return '#00796b';
        case 'NEEDTO_SERVE':
            return '#E8751A';
        case 'NEEDTO_PAY':
            return '#FFA500';
        case 'NEEDTO_ASSIST':
            return '#FF0000';
    }
};

export const formatData = (data: any, numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
        numberOfElementsLastRow !== numColumns &&
        numberOfElementsLastRow !== 0
    ) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }
    return data;
};