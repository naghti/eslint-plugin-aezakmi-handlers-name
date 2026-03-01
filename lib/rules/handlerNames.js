const { SHARED_HANDLERS, WRONG_HANDLER_NAME_MESSAGE } = require("../consts")
const { checkValidHandlerName } = require("../helpers")

module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "saf",
      category: "Fill me in",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
          ignoreImportPatterns: {
            type: 'array',
          }
        },
      }
    ],
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        const componentName = node.name.name
        const componentHandlers = SHARED_HANDLERS[componentName] || []

        node.attributes.forEach(prop => {
          if (prop.type !== 'JSXAttribute') return;

          const propName = prop.name.name
          const isHandler = componentHandlers.includes(propName)

          if (isHandler) {
            const propValueName = prop?.value?.value || prop?.value?.expression?.name

            if (typeof propValueName === 'string' && !checkValidHandlerName(propValueName)) {
              context.report({
                node: prop,
                message: WRONG_HANDLER_NAME_MESSAGE
              })
            }
          }
        })
      }
    };
  },
};
