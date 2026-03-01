const { HANDLER_NAME_PATTERN } = require("../consts")

function checkValidHandlerName(name) {
    if (name.match(HANDLER_NAME_PATTERN)) return true
    return false
}

module.exports = {
    checkValidHandlerName
}
