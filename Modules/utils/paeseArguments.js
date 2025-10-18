function parseArguments(argumentString) {
    let args = {};
    argumentString.split('&').forEach(param => {
        let [key, value] = param.split('=');
        if (value) {
            value = value.replace(/^"|"$/g, '');
            if (value === 'true') {
                args[key] = true;
            } else if (value === 'false') {
                args[key] = false;
            } else if (!isNaN(value) && value.trim() !== '') {
                args[key] = Number(value);
            } else {
                args[key] = value;
            }
        }
    });
    return args;
}