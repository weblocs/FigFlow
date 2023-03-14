import React, { useState, useEffect, useMemo } from 'react'
import ContentEditable from 'react-contenteditable'

import { useSelector, useDispatch } from 'react-redux'
import project, {
  setHoveredHtmlNode,
  setKeyboardNavigationOn,
  makeSymbolEditable,
  setIsNodeSelectedFromNavigator,
  setActiveClickedCmsItemIndex,
  setActiveHoveredCmsItemIndex,
} from '../../../features/project'
import useKeyboardShortcut from 'use-keyboard-shortcut'
import AddSectionButton from './_atoms/AddSectionButton'
import Placeholder from '../../../img/placeholder.svg'
import sanitizeHtml from 'sanitize-html'
import { camelCase } from 'lodash'
import {
  getResolutionPathName,
  isStyleContained,
} from '../../../utils/nodes-editing'

function RenderedNode(props) {
  const [editable, setEditable] = useState(false)

  const [hovered, setHovered] = useState(false)

  // const activeNodeId = useSelector((state) => state.project.activeNodeId);
  // const hoveredNodeId = useSelector((state) => state.project.hoveredNodeId);
  const activeProjectResolution = useSelector(
    (state) => state.project.activeProjectResolution
  )
  const collections = useSelector((state) => state.project.collections)
  const nodesEditMode = useSelector((state) => state.project.nodesEditMode)
  const editedSymbolId = useSelector((state) => state.project.editedSymbolId)
  const projectSwatches = useSelector((state) => state.project.projectSwatches)
  const projectMode = useSelector((state) => state.project.projectMode)
  const activeCollectionTemplateId = useSelector(
    (state) => state.project.activeCollectionTemplateId
  )
  const activeCollectionItemTemplateId = useSelector(
    (state) => state.project.activeCollectionItemTemplateId
  )
  const styleState = useSelector((state) => state.project.styleState)

  const listOfSubStyles = useSelector((state) =>
    state.project.preRenderedStyles.find(
      ({ id }) => id === props?.class?.[0]?.id
    )
  )?.childrens
  const listOfNodeStyles = useSelector(
    (state) =>
      props.class
        .map((cl, index) => {
          if (index !== 0 && cl.id !== '') {
            const styleDefaultName = listOfSubStyles?.[index - 1]?.defaultName
            if (styleDefaultName !== undefined) {
              return (
                styleDefaultName.replaceAll(' ', '-').toLowerCase() +
                '-' +
                cl.name
              )
            }
          }
          return cl.name
        })
        .toString()
        .replaceAll(',', ' ') + ' renderedNode '
    // + ((state.project.activeNodeId === elementId) ? "active " : " ")
    // + ((state.project.hoveredNodeId === elementId) ? "hovered" : " ")
  )

  // console.log("rend node");

  const dispatch = useDispatch()

  const { escapeEditableMode } = useKeyboardShortcut(
    ['Escape'],
    (shortcutKeys) => {
      if (editable) {
        setEditable(false)
        dispatch(setKeyboardNavigationOn(true))
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  )

  function handleDoubleClick(e) {
    e.stopPropagation()
    setEditable(true)
    dispatch(setKeyboardNavigationOn(false))
  }

  function handleOnClick(e) {
    const isNodeBody = props?.class[0]?.name === 'body'
    if (!isNodeBody) {
      e.stopPropagation()
      // if (projectMode === 'creator') {
      //   setEditable(true)
      //   dispatch(setKeyboardNavigationOn(false))
      // }
      dispatch(setIsNodeSelectedFromNavigator(false))
      dispatch(setActiveClickedCmsItemIndex(props.itemIndex))
      props.onClick([elementId, props?.class[0]?.name])
      if (!editable) {
        dispatch(setKeyboardNavigationOn(true))
      }
    }
  }

  function handleMouseOver(e) {
    e.stopPropagation()
    setHovered(true)
    dispatch(setHoveredHtmlNode(elementId))
    dispatch(setActiveHoveredCmsItemIndex(props.itemIndex))
  }

  function handleMouseOut(e) {
    e.stopPropagation()
    setHovered(false)
    dispatch(setHoveredHtmlNode(''))
  }

  function handleSectionMouseOver() {}

  let customStyle = {}

  function addResponsiveInlineStyle(resolution) {
    let addStyles = {
      ...props.styles?.[getResolutionPathName(resolution, 'default')],
    }
    function replacePropertySwatch(property) {
      if (
        addStyles?.[property]?.charAt(0) === '{' &&
        addStyles?.[property]?.charAt(1) === '{'
      ) {
        addStyles[property] = projectSwatches?.find(
          (swatch) =>
            swatch.id ===
            addStyles[property]?.replace('{{', '').replace('}}', '')
        )?.color
      }
    }
    replacePropertySwatch('background-color')
    replacePropertySwatch('color')
    replacePropertySwatch('border-color')
    if (isStyleContained(activeProjectResolution, resolution)) {
      customStyle = {
        ...customStyle,
        ...addStyles,
      }
    }
  }

  for (let j = 1; j <= 7; j++) {
    addResponsiveInlineStyle(j.toString())
  }

  customStyle = Object.fromEntries(
    Object.entries(customStyle).map(([key, value]) => [_.camelCase(key), value])
  )

  let customStyleHover = {}

  function addResponsiveInlineStyleHover(resolution) {
    if (isStyleContained(activeProjectResolution, resolution)) {
      customStyleHover = {
        ...customStyleHover,
        ...props.styles?.[getResolutionPathName(resolution, 'hover')],
      }
    }
  }

  for (let j = 1; j <= 7; j++) {
    addResponsiveInlineStyleHover(j.toString())
  }

  customStyleHover = Object.fromEntries(
    Object.entries(customStyleHover).map(([key, value]) => [
      _.camelCase(key),
      value,
    ])
  )

  if (hovered === true) {
    customStyle = { ...customStyle, ...customStyleHover }
  }
  if (
    document
      .querySelector(`[el_id='${props.id}']`)
      ?.classList.contains('active') &&
    styleState === 'hover'
  ) {
    customStyle = { ...customStyle, ...customStyleHover }
  }

  // "div"

  let elementId = props.id

  let elementHTML = (
    <div
      style={customStyle}
      el_id={elementId}
      cms_item_index={props.itemIndex}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={listOfNodeStyles}
      isnavlist={props.type === 'nav_l' ? 'true' : ''}
      isnavtrigger={props.type === 'nav_tr' ? 'true' : ''}
    >
      {props.children.map((el) => (
        <RenderedNode
          id={el.id}
          inputPlaceholder={el.inputPlaceholder}
          embed={el.embed}
          title={el.title}
          subtype={el.subtype}
          src={el.src}
          cmsCollectionId={el.cmsCollectionId}
          filterCurrent={el.filterCurrent}
          cmsFieldId={el.cmsFieldId}
          symbolId={el.symbolId}
          type={el.type}
          styles={el.styles}
          key={el.id}
          itemIndex={props.itemIndex}
          renderedCollectionIndex={props.renderedCollectionIndex}
          collectionItems={props.collectionItems}
          collectionItemName={props.collectionItemName}
          fieldId={props.fieldId}
          children={el.children}
          onChange={(text, id) => props.onChange(text, id)}
          class={el.class}
          onClick={([nodeId, className]) => props.onClick([nodeId, className])}
        />
      ))}
    </div>
  )

  if (
    props.children.length === 0 &&
    props.class.length === 0 &&
    Object.keys(customStyle).length === 0
  ) {
    elementHTML = (
      <div
        el_id={elementId}
        className="renderedNode"
        onClick={handleOnClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ width: '75px', height: '75px', outline: '1px solid #8d8de5' }}
      ></div>
    )
  }

  if (props.type === 'body') {
    elementHTML = (
      <div
        style={customStyle}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        onClick={handleOnClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles}
      >
        {props.children.map((el) => (
          <RenderedNode
            id={el.id}
            inputPlaceholder={el.inputPlaceholder}
            embed={el.embed}
            title={el.title}
            subtype={el.subtype}
            src={el.src}
            cmsCollectionId={el.cmsCollectionId}
            cmsFieldId={el.cmsFieldId}
            symbolId={el.symbolId}
            type={el.type}
            styles={el.styles}
            key={el.id}
            itemIndex={props.itemIndex}
            renderedCollectionIndex={props.renderedCollectionIndex}
            collectionItems={props.collectionItems}
            fieldId={props.fieldId}
            children={el.children}
            onChange={(text, id) => props.onChange(text, id)}
            class={el.class}
            onClick={([nodeId, className]) =>
              props.onClick([nodeId, className])
            }
          />
        ))}
      </div>
    )
  }

  if (props.type === 'embed') {
    if (props.embed === '' || props.embed === undefined) {
      elementHTML = (
        <div
          style={customStyle}
          el_id={elementId}
          cms_item_index={props.itemIndex}
          onClick={handleOnClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="empty-collection-wrapper renderedNode"
        >
          Set embed code clicking in icon above
        </div>
      )
    } else {
      elementHTML = (
        <div
          style={customStyle}
          el_id={elementId}
          cms_item_index={props.itemIndex}
          onClick={handleOnClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className={listOfNodeStyles}
          dangerouslySetInnerHTML={{
            __html: props.embed,
          }}
        ></div>
      )
    }
  }

  if (props.type === 'sec') {
    elementHTML = (
      <div onMouseEnter={handleSectionMouseOver}>
        <div
          style={customStyle}
          el_id={elementId}
          cms_item_index={props.itemIndex}
          onClick={handleOnClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className={listOfNodeStyles}
        >
          {props.children.map((el) => (
            <RenderedNode
              id={el.id}
              inputPlaceholder={el.inputPlaceholder}
              embed={el.embed}
              title={el.title}
              subtype={el.subtype}
              src={el.src}
              cmsCollectionId={el.cmsCollectionId}
              cmsFieldId={el.cmsFieldId}
              symbolId={el.symbolId}
              type={el.type}
              styles={el.styles}
              key={el.id}
              itemIndex={props.itemIndex}
              renderedCollectionIndex={props.renderedCollectionIndex}
              // children={useMemo(()=> el.children)}
              children={el.children}
              onChange={(text, id) => props.onChange(text, id)}
              class={el.class}
              onClick={([nodeId, className]) =>
                props.onClick([nodeId, className])
              }
            />
          ))}
        </div>

        <AddSectionButton sectionId={elementId} />
      </div>
    )
  }

  if (props.type === 'rich') {
    elementHTML = (
      <div
        style={customStyle}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        onClick={handleOnClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles}
      >
        {props.children.map((el) => (
          <div key={el.id}>
            <RenderedNode
              id={el.id}
              inputPlaceholder={el.inputPlaceholder}
              embed={el.embed}
              title={el.title}
              subtype={el.subtype}
              src={el.src}
              cmsCollectionId={el.cmsCollectionId}
              cmsFieldId={el.cmsFieldId}
              symbolId={el.symbolId}
              type={el.type}
              styles={el.styles}
              key={el.id}
              itemIndex={props.itemIndex}
              renderedCollectionIndex={props.renderedCollectionIndex}
              children={el.children}
              onChange={(text, id) => props.onChange(text, id)}
              class={el.class}
              onClick={([nodeId, className]) =>
                props.onClick([nodeId, className])
              }
            />
          </div>
        ))}
      </div>
    )
  }

  if (props.type === 'sym') {
    elementHTML = (
      <div
        style={customStyle}
        id={elementId}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        onClick={handleOnClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles}
      >
        <div
          onDoubleClick={() =>
            editedSymbolId.symbolId === '' &&
            dispatch(
              makeSymbolEditable({
                symbolId: props.symbolId,
                elementId: elementId,
              })
            )
          }
          className={
            'symbol-box-wrapper' +
            (editedSymbolId.symbolId === props.symbolId &&
            editedSymbolId.elementId === elementId
              ? ' active'
              : '')
          }
          style={{ position: 'relative', height: '0' }}
        >
          <div
            symbol_id={elementId}
            className="symbol-wrapper"
            style={{ width: '100%', height: '40px' }}
          ></div>
        </div>

        {props.children.map((el) => (
          <RenderedNode
            id={el.id}
            inputPlaceholder={el.inputPlaceholder}
            embed={el.embed}
            title={el.title}
            subtype={el.subtype}
            src={el.src}
            cmsCollectionId={el.cmsCollectionId}
            cmsFieldId={el.cmsFieldId}
            symbolId={el.symbolId}
            type={el.type}
            styles={el.styles}
            key={el.id}
            children={el.children}
            class={el.class}
            itemIndex={props.itemIndex}
            renderedCollectionIndex={props.renderedCollectionIndex}
            onChange={(text, id) => props.onChange(text, id)}
            onClick={([nodeId, className]) =>
              props.onClick([nodeId, className])
            }
          />
        ))}
      </div>
    )
  }

  // Collection List
  if (props.type === 'col') {
    let renderedCollectionIndex = collections
      .map((x) => {
        return x.id
      })
      .indexOf(props.cmsCollectionId)

    elementHTML = (
      <div
        style={customStyle}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        onClick={handleOnClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles}
      >
        {collections[renderedCollectionIndex]?.items
          .filter((item) => item?.archived !== true)
          .filter(
            (item) =>
              !(
                item?.id === activeCollectionItemTemplateId &&
                props?.filterCurrent !== true &&
                nodesEditMode === 'cmsTemplate'
              )
          )
          ?.map(
            (item, itemIndex) =>
              // <div key={item.id + itemIndex}>
              // {
              props.children.map((el) => (
                <RenderedNode
                  id={el.id}
                  inputPlaceholder={el.inputPlaceholder}
                  embed={el.embed}
                  title={el.title}
                  subtype={el.subtype}
                  src={el.src}
                  cmsCollectionId={el.cmsCollectionId}
                  cmsFieldId={el.cmsFieldId}
                  symbolId={el.symbolId}
                  type={el.type}
                  styles={el.styles}
                  key={el.id}
                  itemIndex={itemIndex}
                  renderedCollectionIndex={renderedCollectionIndex}
                  collectionItems={item.data}
                  collectionItemName={item?.name}
                  children={el.children}
                  onChange={(text, id) => props.onChange(text, id)}
                  class={el.class}
                  onClick={([nodeId, className]) =>
                    props.onClick([nodeId, className])
                  }
                />
              ))
            // }
            // </div>
          )}
      </div>
    )

    if (props?.cmsCollectionId === undefined) {
      elementHTML = (
        <div
          el_id={elementId}
          className="empty-collection-wrapper renderedNode"
          onClick={handleOnClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Open element settings to connect to a colleciton
        </div>
      )
    } else if (collections[renderedCollectionIndex]?.items.length === 0) {
      elementHTML = (
        <div
          el_id={elementId}
          className="empty-collection-wrapper renderedNode"
          onClick={handleOnClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          This collection does not contain any elements
        </div>
      )
    } else {
      if (props.children.length === 0) {
        elementHTML = (
          <div
            el_id={elementId}
            className="renderedNode"
            onClick={handleOnClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            {collections[renderedCollectionIndex]?.items.map((item, index) => (
              <div key={item.id} className="empty-collection-wrapper ">
                Item {index}
              </div>
            ))}
          </div>
        )
      }
    }
  }

  if (props.type === 'img') {
    let imageSrc = props?.src

    if (props.cmsFieldId) {
      imageSrc = collections[props.renderedCollectionIndex]?.items[
        props.itemIndex
      ].data.find(({ fieldId }) => fieldId === props.cmsFieldId)?.fieldValue

      if (nodesEditMode === 'cmsTemplate') {
        const activeCollectionItem = collections
          .find(({ id }) => id === activeCollectionTemplateId)
          ?.items?.find(({ id }) => id === activeCollectionItemTemplateId)

        imageSrc = activeCollectionItem.data.find(
          ({ fieldId }) => fieldId === props.cmsFieldId
        )?.fieldValue
      }
    }
    elementHTML = (
      <img
        style={customStyle}
        src={
          imageSrc !== undefined
            ? 'https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/' +
              imageSrc +
              '?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a'
            : Placeholder
        }
        onClick={handleOnClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        className={listOfNodeStyles}
      />
    )
  }

  // function isNodeTextType(type) {
  //   return type === 'h' || type === 'p'
  // }

  // function isNodeConnectedWithCMSNameField(node) {
  //   return node.cmsFieldId === '0'
  // }

  // function isNodeConnectedWithAnyCMSField(node) {
  //   return node.cmsFieldId !== ''
  // }

  // function generateNodeText(node) {
  //   if (!isNodeTextType(node.type)) {
  //     return null
  //   }

  //   if (isNodeConnectedWithCMSNameField(node)) {
  //     return node.collectionItemName
  //   }
  //   if (isNodeConnectedWithAnyCMSField(node)) {
  //     return node.collectionItems.find(
  //       ({ fieldId }) => fieldId === node.cmsFieldId
  //     )?.fieldValue
  //   }
  // }

  let nodeText = props.title
  if (props.type === 'h' || props.type === 'p') {
    if (nodesEditMode === 'cmsTemplate') {
      const activeCollectionItem = collections
        .find(({ id }) => id === activeCollectionTemplateId)
        ?.items?.find(({ id }) => id === activeCollectionItemTemplateId)

      if (props.cmsFieldId !== '' && props.cmsFieldId !== undefined) {
        nodeText = activeCollectionItem?.data?.find(
          ({ fieldId }) => fieldId === props.cmsFieldId
        )?.fieldValue
      }
      if (props.cmsFieldId === '0') {
        nodeText = activeCollectionItem.name
      }
    }

    if (props.collectionItems) {
      if (props.cmsFieldId === '') {
        nodeText = props.title
      }
      if (props.cmsFieldId === '0') {
        nodeText = props.collectionItemName
      } else {
        nodeText = props.collectionItems.find(
          ({ fieldId }) => fieldId === props.cmsFieldId
        )?.fieldValue
      }
    }

    if (nodeText === undefined) {
      nodeText = 'empty'
    }
  }

  if (props.type === 'i') {
    elementHTML = (
      <input
        style={customStyle}
        onClick={handleOnClick}
        onBlur={() => setEditable(false)}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles + ' f-input'}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        readOnly
        placeholder={props?.inputPlaceholder || ''}
      />
    )
    if (props.children.length > 0) {
    }
  }

  if (props.type === 'area') {
    elementHTML = (
      <textarea
        style={customStyle}
        onClick={handleOnClick}
        onBlur={() => setEditable(false)}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles + ' f-input'}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        readOnly
        placeholder={props?.inputPlaceholder || ''}
      />
    )
    if (props.children.length > 0) {
    }
  }

  if (props.type === 'c') {
    elementHTML = (
      <input
        type={'checkbox'}
        checked={false}
        onChange={() => {}}
        style={customStyle}
        onClick={handleOnClick}
        onBlur={() => setEditable(false)}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles + ' f-input'}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        placeholder={props?.inputPlaceholder || ''}
      />
    )
    if (props.children.length > 0) {
    }
  }

  if (props.type === 'r') {
    elementHTML = (
      <input
        type={'radio'}
        checked={false}
        onChange={() => {}}
        style={customStyle}
        onClick={handleOnClick}
        onBlur={() => setEditable(false)}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles + ' f-input'}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        placeholder={props?.inputPlaceholder || ''}
      />
    )
    if (props.children.length > 0) {
    }
  }

  if (props.type === 'rich_text') {
    let richText = collections[props.renderedCollectionIndex]?.items[
      props.itemIndex
    ].data.find(({ fieldId }) => fieldId === props.cmsFieldId)?.fieldValue

    if (nodesEditMode === 'cmsTemplate') {
      const activeCollectionItem = collections
        .find(({ id }) => id === activeCollectionTemplateId)
        ?.items?.find(({ id }) => id === activeCollectionItemTemplateId)

      richText = activeCollectionItem.data.find(
        ({ fieldId }) => fieldId === props.cmsFieldId
      )?.fieldValue
    }

    elementHTML = (
      <div
        el_id={elementId}
        cms_item_index={props.itemIndex}
        onClick={handleOnClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles}
        dangerouslySetInnerHTML={{
          __html: richText,
        }}
      ></div>
    )
  }

  if (props.type === 'h') {
    elementHTML = (
      <ContentEditable
        style={customStyle}
        onClick={handleOnClick}
        onBlur={() => setEditable(false)}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        tagName={props?.subtype !== undefined ? props.subtype : 'h1'}
        html={nodeText}
        disabled={!editable}
      />
    )
    if (props.children.length > 0) {
      // console.log(props.children)
    }
  }

  if (props.type === 'sub') {
    elementHTML = (
      <ContentEditable
        style={customStyle}
        className={listOfNodeStyles}
        onBlur={() => setEditable(false)}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        tagName="div"
        onClick={handleOnClick}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        html={nodeText}
        disabled={!editable}
      />
    )
  }

  if (props.type === 'p') {
    elementHTML = (
      <ContentEditable
        style={customStyle}
        className={listOfNodeStyles}
        onBlur={() => setEditable(false)}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        tagName="p"
        onClick={handleOnClick}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        html={nodeText}
        disabled={!editable}
      />
    )
  }

  if (props.type === 'a') {
    elementHTML = (
      <ContentEditable
        style={customStyle}
        className={listOfNodeStyles}
        onBlur={() => setEditable(false)}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        tagName="div"
        onClick={handleOnClick}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        html={nodeText}
        disabled={!editable}
      />
    )
  }

  if (props.type === 'l') {
    elementHTML = (
      <div
        style={customStyle}
        el_id={elementId}
        cms_item_index={props.itemIndex}
        onClick={handleOnClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={listOfNodeStyles}
      >
        {props.children.map((el) => (
          <RenderedNode
            id={el.id}
            inputPlaceholder={el.inputPlaceholder}
            embed={el.embed}
            title={el.title}
            subtype={el.subtype}
            src={el.src}
            cmsCollectionId={el.cmsCollectionId}
            filterCurrent={el.filterCurrent}
            cmsFieldId={el.cmsFieldId}
            symbolId={el.symbolId}
            type={el.type}
            styles={el.styles}
            key={el.id}
            itemIndex={props.itemIndex}
            renderedCollectionIndex={props.renderedCollectionIndex}
            collectionItems={props.collectionItems}
            collectionItemName={props.collectionItemName}
            fieldId={props.fieldId}
            children={el.children}
            onChange={(text, id) => props.onChange(text, id)}
            class={el.class}
            onClick={([nodeId, className]) =>
              props.onClick([nodeId, className])
            }
          />
        ))}
      </div>
    )
  }

  if (props.styles) {
  }

  return elementHTML
}

export default RenderedNode
// export default React.memo(RenderedNode);
