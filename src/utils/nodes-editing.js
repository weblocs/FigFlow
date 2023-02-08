import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { setKeyboardNavigationOn } from '../features/project'

export function getIndexOfElementInArrayById(styleNodes, id) {
  let res
  for (let i = 0; i < styleNodes.length; i++) {
    if (styleNodes[i].id === id) {
      res = i
    }
  }
  return res
}

export function getResolutionPathName(resolutionNumber, state) {
  function getState(resolution) {
    if (state !== 'default') {
      return resolution + '-' + state
    }
    return resolution
  }

  if (resolutionNumber === '1') {
    return getState('styles')
  }
  if (resolutionNumber === '2') {
    return getState('tabletStyles')
  }
  if (resolutionNumber === '3') {
    return getState('mobileStyles')
  }
  if (resolutionNumber === '4') {
    return getState('portraitStyles')
  }
  if (resolutionNumber === '5') {
    return getState('mediumDesktopStyles')
  }
  if (resolutionNumber === '6') {
    return getState('largeDesktopStyles')
  }
  if (resolutionNumber === '7') {
    return getState('xLargeDesktopStyles')
  }
}

export function getResolutionCssMedia(resolutionNumber) {
  if (resolutionNumber === '1') {
    return '@media screen '
  }
  if (resolutionNumber === '2') {
    return '@media screen and (max-width: 900px) '
  }
  if (resolutionNumber === '3') {
    return '@media screen and (max-width: 478px) '
  }
  if (resolutionNumber === '4') {
    return '@media screen and (min-width: 478px) and (max-width: 767px) '
  }
  if (resolutionNumber === '5') {
    return '@media screen and (min-width: 1280px) '
  }
  if (resolutionNumber === '6') {
    return '@media screen and (min-width: 1440px) '
  }
  if (resolutionNumber === '7') {
    return '@media screen and (min-width: 1920px) '
  }
}

export function getResolutionName(resolutionNumber) {
  if (resolutionNumber === '1') {
    return 'Base (Desktop)'
  }
  if (resolutionNumber === '2') {
    return 'Tablet'
  }
  if (resolutionNumber === '3') {
    return 'Mobile'
  }
  if (resolutionNumber === '4') {
    return 'Portrait'
  }
  if (resolutionNumber === '5') {
    return 'Medium Desktop'
  }
  if (resolutionNumber === '6') {
    return 'Large Desktop'
  }
  if (resolutionNumber === '7') {
    return 'X Large Desktop'
  }
}

export function isStyleContained(resolutionNumber, sizeResolution) {
  if (sizeResolution === '1') {
    return true
  }
  if (sizeResolution === '2') {
    return (
      resolutionNumber === '2' ||
      resolutionNumber === '3' ||
      resolutionNumber === '4'
    )
  }
  if (sizeResolution === '3') {
    return resolutionNumber === '3' || resolutionNumber === '4'
  }
  if (sizeResolution === '4') {
    return resolutionNumber === '4'
  }
  if (sizeResolution === '5') {
    return (
      resolutionNumber === '5' ||
      resolutionNumber === '6' ||
      resolutionNumber === '7'
    )
  }
  if (sizeResolution === '6') {
    return resolutionNumber === '6' || resolutionNumber === '7'
  }
  if (sizeResolution === '7') {
    return resolutionNumber === '7'
  }
}

export function doesStylePropertyBelongToActiveStyle(
  activeStyleObject,
  property
) {
  if (activeStyleObject?.[property] !== undefined) {
    return true
  }
  return false
}

export function doesStylePropertyIsInlineFx(activeNodeObject, property) {
  if (activeNodeObject?.styles?.styles?.[property] !== undefined) {
    return true
  }
  return false
}

export function getIdOfPreRenderedStyleByName(
  styleNodes,
  styleName,
  styleParents
) {
  let res
  for (let i = 0; i < styleNodes.length; i++) {
    if (
      styleNodes[i].name === styleName &&
      JSON.stringify(styleNodes[i].parents) === JSON.stringify(styleParents)
    ) {
      res = styleNodes[i].id
    }
  }
  return res
}

export function fullJSONtoCSS(_classes, _swatches) {
  let fullCSS = ''
  fullCSS += JSONtoCSS(_classes, '1', 'default', _swatches, true)
  for (let i = 2; i <= 7; i++) {
    const resolutionNumber = i.toString()
    fullCSS += getResolutionCssMedia(resolutionNumber) + '{'
    fullCSS += JSONtoCSS(_classes, resolutionNumber, 'default', _swatches, true)
    fullCSS += '}'
  }
  return fullCSS
}

export function JSONtoCSS(
  _classes,
  activeResolution,
  activeState,
  swatches,
  isSingle = false
) {
  let tempClasses = []
  let tempName = ''
  let tempResolution = ''
  let styleState = 'default'

  if (!isSingle) {
    styleState = 'default'
    for (let j = 1; j <= 7; j++) {
      tempResolution = j.toString()
      if (isStyleContained(activeResolution, tempResolution)) {
        _classes.forEach(createTempClassesResolution)
      }
    }
    styleState = 'hover'
    for (let j = 1; j <= 7; j++) {
      tempResolution = j.toString()
      isStyleContained(activeResolution, tempResolution) &&
        _classes.forEach(createTempClassesResolution)
    }
  } else {
    styleState = 'default'
    tempResolution = activeResolution
    _classes.forEach(createTempClassesResolution)
    styleState = 'hover'
    _classes.forEach(createTempClassesResolution)
  }

  function createTempClassesResolution(_class, i) {
    if (styleState === undefined) {
      styleState = 'default'
    }
    tempName = _classes[i].name
    if (styleState === 'hover') {
      if (!isSingle) {
        tempName =
          tempName +
          ':hover, .d2g3-is-hover .' +
          tempName +
          '.renderedNode.active'
      } else {
        tempName = tempName + ':hover'
      }
    }
    let resolutionPathName = getResolutionPathName(tempResolution, styleState)
    _classes[i][resolutionPathName] &&
      tempClasses.push({
        name: tempName,
        styles: _classes[i][resolutionPathName],
      })
    _classes[i].childrens?.forEach((childStyle) => {
      childStyle.options.forEach((option) => {
        let optionName =
          _classes[i].name +
          '.' +
          (childStyle?.defaultName !== undefined
            ? childStyle.defaultName?.replaceAll(' ', '-').toLowerCase() + '-'
            : '') +
          option.name
        if (styleState === 'hover') {
          optionName =
            optionName +
            ':hover, .d2g3-is-hover .' +
            optionName +
            '.renderedNode.active'
        }
        option[resolutionPathName] &&
          tempClasses.push({
            name: optionName,
            styles: option[resolutionPathName],
          })
      })
    })
  }

  let tempStyle = ''
  if (!isSingle) {
    tempStyle =
      '*{-webkit-font-smoothing: antialiased;box-sizing: border-box;}\n'
  }

  tempClasses.forEach((item) => {
    tempStyle += '.' + item.name + '{'

    for (const [key, value] of Object.entries(item.styles)) {
      const isPropertySwatch =
        value.charAt(0) === '{' && value.charAt(1) === '{'
      if (isPropertySwatch) {
        value = value.replaceAll('{{', '').replaceAll('}}', '')
        value = swatches?.find((swatch) => swatch.id === value)?.color
      }
      tempStyle += key + ': ' + value + ';'
    }
    tempStyle += '}'
  })

  return tempStyle
}

export function setStylesInActiveNode(nodes, id) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) {
      return nodes[i].class
      break
    }
    if (nodes[i].children) {
      setStylesInActiveNode(nodes[i].children, id)
    }
  }
}

export function checkIfNodeContainesStyle(node) {
  if (
    Object.keys(node?.styles?.styles || {}).length > 0 ||
    Object.keys(node?.styles?.mobileStyles || {}).length > 0 ||
    Object.keys(node?.styles?.tabletStyles || {}).length > 0 ||
    Object.keys(node?.styles?.portraitStyles || {}).length > 0 ||
    Object.keys(node?.styles?.desktopStyles || {}).length > 0 ||
    Object.keys(node?.styles?.desktopLargeStyles || {}).length > 0 ||
    Object.keys(node?.styles?.desktopExtraLargeStyles || {}).length > 0
  ) {
    return true
  }
}

export function setStylesInActiveNodeAndActiveStyle(nodes, id) {
  let response = []
  function findNode(nodes, id) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        response[0] = nodes[i]?.class
        for (let i = nodes[i].class.length; i > 0; i--) {
          response[1] = nodes[i]?.class[i - 1]?.name
          response[2] = nodes[i]?.class[i - 1]?.id
        }

        break
      }

      if (nodes[i].children) {
        findNode(nodes[i].children, id)
      }
    }
  }
  findNode(nodes, id)

  return response
}

export function findActiveNode(nodes, id) {
  let response
  function findNode(_nodes) {
    for (let i = 0; i < _nodes?.length; i++) {
      if (_nodes[i].id === id) {
        response = _nodes[i]
      }
      if (_nodes[i].children?.length > 0) {
        findNode(_nodes[i].children)
      }
    }
  }
  findNode(nodes)
  return response
}

export function firebaseSaveProject(state, app, db) {
  try {
    updateDoc(doc(db, 'projects', state.projectFirebaseId), {
      pages: state.projectPages,
      projectPageFolders: state.projectPageFolders,
      projectPageFolderStructure: state.projectPageFolderStructure,
      collections: state.collections,
      preRenderedStyles: state.preRenderedStyles,
      symbols: state.projectSymbols,
      swatches: state.projectSwatches,
      sections: state.projectLayouts,
      blocks: state.blocks,
      styleGuide: state.styleGuide,
    })
  } catch (error) {
    console.log(error)
  }
}
