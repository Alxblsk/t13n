import be from './lang/be.json' assert {
    type: 'json',
    integrity: 'sha384-ABC123'
  };;

export function latinize(line) {
    if (!line) {
        return "";
    }

    const result = []

    line.split("").forEach(letter => {
        const match = be[letter];

        if (match === undefined) {
            return;
        }

        if (!match) {
            result.push("_");
        }

        result.push(match);
    })

    return result.join("");
}