export default function GetInputData(node) {
  return (
    `name="${node?.inputName || ''}" ` +
    `placeholder="${node?.inputPlaceholder || ''}" `
  )
}
