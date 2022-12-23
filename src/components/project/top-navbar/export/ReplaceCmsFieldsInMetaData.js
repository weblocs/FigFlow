export default function replaceCmsFieldsInMetaData(field, collection, item) {
  const str = collection?.[field]
  const regex = /{{(.*?)}}/gm
  let m
  let texts = []

  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }
    m.forEach((match, groupIndex) => {
      if (groupIndex === 0) {
        texts.push(match)
      }
    })
  }

  texts.forEach((text) => {
    const textFieldId = collection?.fields?.find(
      ({ name }) => name === text.replace('{{', '').replace('}}', '')
    )?.id
    const textData =
      item.data?.find(({ fieldId }) => fieldId === textFieldId)?.fieldValue ||
      ''
    str = str.replaceAll(text, textData)
  })
  return str
}
