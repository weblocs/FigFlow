import { createSlice, current } from '@reduxjs/toolkit'
import {
  JSONtoCSS,
  getIndexOfElementInArrayById,
  getResolutionPathName,
  isStyleContained,
} from '../utils/nodes-editing'
import { v4 as uuidv4 } from 'uuid'
import sanitizeHtml from 'sanitize-html'

import { initializeApp } from 'firebase/app'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'
import { firebaseConfig } from '../utils/firebase-config.js'
import { node } from 'prop-types'

const initialState = {
  offlineMode: true,
  offlineProjectName: 'projekt1',

  projectMode: 'developer', // developer or creator
  nodesEditMode: 'page', // page, layout, cmsTemplate, block
  scrollCount: 0,
  projectLayouts: [],
  activeLayoutFolder: '',
  activeLayoutAddFolder: '',
  activeLayoutId: '',

  undoStates: [],
  activeUndoIndex: 1,
  undoActionActive: false,
  activeTab: '',
  activeRightSidebarTab: 'Style',

  projectPages: [],
  projectPageFolders: [],
  projectPageFolderStructure: [],
  activePageId: '',
  activePageIndex: 0,
  openedSettingsPage: {},
  draggedPage: {},
  dragOverPage: {},

  collections: [],
  activeCollectionId: '',
  activeSettingsCollectionId: '',
  activeSettingsCollectionFieldId: '',
  activeCollectionIndex: 0,
  activeCollectionItemId: '',
  activeCollectionItemIndex: 0,
  activeCollectionTemplateId: '',
  activeCollectionItemTemplateId: '',
  collectionPanelState: 'collections',

  activeClickedCmsItemIndex: undefined,
  activeHoveredCmsItemIndex: undefined,

  projectSymbols: [],
  editedSymbolId: { symbolId: '', elementId: '' },
  activeSymbolConnections: [],

  preRenderedHTMLNodes: [],
  preRenderedHTMLNodesWithoutExpandedStates: [],
  preRenderedStyles: [],
  postRenderedStyles: '',
  objectHierarchyStyles: [],
  styleState: 'default', // default, hover, focus

  activeNodeId: '',
  activeNodeObject: {},
  hoveredNodeId: '',
  keyboardNavigationOn: true,
  activeStyleObject: {}, // activeStyleProperties
  activeStyleId: '',
  activeStyleIndex: 0,
  stylesInActiveNode: [],
  projectFirebaseId: '',
  saveButtonStateText: 'Publish',
  copiedNodes: {},
  draggedNavigatorNodes: {},
  draggedOverNodeId: '',
  navigatorItemDragBehindState: false,
  copiedSectionNodes: {},
  isActiveNodeParentDisplayStyleFlex: false,
  activeProjectResolution: '1',
  activeProjectResolutionStylesListName: 'styles',
  activeNodeParentsPath: [],
  projectUploadedFonts: [
    { name: 'Plus Jakarta Display', weights: ['300', '500', '700'] },
    { name: 'Inter', weights: ['300', '500', '700'] },
    { name: 'system-ui', weights: ['300', '400', '500', '600', '700'] },
    { name: 'General Sans' },
    { name: 'Hauora' },
    { name: 'Clash Display' },
    { name: 'Roboto' },
  ],
  projectSwatches: [],
  projectPopUp: '',

  blocks: [],
  activeBlockFolderId: '',
  activeBlockAddFolderId: '',

  activeStyleOptionIndex: 0,
  activeNodeComputedStyles: {},

  isNodeSelectedFromNavigator: false,
  projectVersions: [{ id: '1' }],
  activeProjectVersionId: '1',

  isSettingsModalOpen: false,
  projectSettingsData: {},
  faviconImage: '',

  styleGuide: [],

  isAltPressed: false,
  isShiftPressed: false,
  isKeyAPressed: false,

  store: [
    {
      id: '1',
      name: 'Is Navigation Open',
      type: 'boolean',
      value: false,
    },
  ],

  dataFlows: [
    {
      id: '1',
      name: 'Dropdown',
      state: [
        {
          id: '1',
          name: 'open',
          type: 'boolean',
          initValue: false,
        },
        {
          id: '2',
          name: 'question',
          type: 'string',
          initValue: 'Question 1',
        },
      ],
      actions: [
        {
          id: '1',
          name: 'toggle',
          parameters: [],
          code: 'this.open = !this.open',
        },
      ],
    },
  ],

  functions: [
    {
      name: 'Toggle Hamburger Menu',
      id: '1',
      actions: [
        {
          id: '1',
          target: 'node', // node, style, attribute
          targetId: 'df9d065f-43cb-4729-8ee8-72fa9e20782a',
          action: 'toggle', // toggle, add, remove
          classId: '',
          optionId: '',
          optionVersionId: '',
        },
      ],
    },
    {
      name: 'Toggle FAQ Item',
      id: '2',
      actions: [
        {
          id: '1',
          target: 'attribute', // node, style, attribute
          targetId: 'df9d065f-43cb-4729-8ee8-72fa9e20782a',
          action: 'toggle', // toggle, add, remove
          classId: '',
          optionId: '',
          optionVersionId: '',
        },
      ],
    },
  ],

  activeStyleProperties: {
    font_family: '',
    font_weight: '',
    font_size: '',
    line_height: '',
    letter_spacing: '',
    color: '',
    text_align: '',
    display: '',
    margin_top: '',
    margin_bottom: '',
    margin_left: '',
    margin_right: '',
    padding_top: '',
    padding_bottom: '',
    padding_left: '',
    padding_right: '',
    width: '',
    min_width: '',
    max_width: '',
    height: '',
    min_height: '',
    max_height: '',
    object_fit: '',
    position: '',
    top: '',
    bottom: '',
    left: '',
    right: '',
    background_color: '',
    border_color: '',
    border_radius: '',
    border_width: '',
    opacity: '',
  },
}

function findActiveNode(nodes, id) {
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

function updateGlobalCSS(state) {
  state.postRenderedStyles = JSONtoCSS(
    [...state.preRenderedStyles],
    state.activeProjectResolution,
    state.styleState,
    state.projectSwatches
  )
}

function findActiveNodeSiblingArrayAndIndex(nodes, id) {
  let response
  function findNode(_nodes) {
    for (let i = 0; i < _nodes?.length; i++) {
      if (_nodes[i].id === id) {
        response = [_nodes[i], _nodes, i]
      }
      if (_nodes[i]?.children?.length > 0) {
        findNode(_nodes[i].children)
      }
    }
  }
  findNode(nodes)
  return response
}

function regenerateIdsInNodes(nodes) {
  nodes.id = uuidv4()
  if (nodes?.children?.length !== undefined) {
    for (let i = 0; i < nodes.children.length; i++) {
      nodes.children[i].id = uuidv4()
      if (nodes.children[i].children.length > 0) {
        regenerateIdsInNodes(nodes.children[i])
      }
    }
  }
}

function regenerateIdsInNodeList(nodes) {
  for (let i = 0; i < nodes?.length; i++) {
    nodes[i].id = uuidv4()
    if (nodes[i]?.children?.length > 0) {
      regenerateIdsInNodeList(nodes[i].children)
    }
  }
}

function nodeIsFolder(node) {
  if (
    node.type === 'div' ||
    node.type === 'l' ||
    node.type === 'sym' ||
    node.type === 'sec' ||
    node.type === 'body'
  ) {
    return true
  } else if (node.type === 'col' && node.cmsCollectionId) {
    return true
  } else {
    return false
  }
}

function updateNodesLists(state) {
  if (state.nodesEditMode === 'page') {
    state.projectPages[state.activePageIndex].preRenderedHTMLNodes =
      state.preRenderedHTMLNodes
  } else if (state.nodesEditMode === 'layout') {
    if (
      state.projectLayouts
        .find(({ id }) => id === state.activeLayoutFolder)
        ?.items?.find(({ id }) => id === state.activeLayoutId) !== undefined
    ) {
      state.projectLayouts
        .find(({ id }) => id === state.activeLayoutFolder)
        .items.find(
          ({ id }) => id === state.activeLayoutId
        ).preRenderedHTMLNodes = state.preRenderedHTMLNodes[0]
    }
  } else if (state.nodesEditMode === 'cmsTemplate') {
    state.collections.find(
      ({ id }) => id === state.activeCollectionTemplateId
    ).preRenderedHTMLNodes = state.preRenderedHTMLNodes
  } else if (state.nodesEditMode === 'block') {
    if (
      state.blocks?.find(({ id }) => id === state.activeBlockFolderId)
        ?.blocks !== undefined
    ) {
      if (
        state.blocks
          ?.find(({ id }) => id === state.activeBlockFolderId)
          ?.blocks?.find(({ id }) => id === state.activeBlockId) !== undefined
      ) {
        if (
          state.blocks
            ?.find(({ id }) => id === state.activeBlockFolderId)
            ?.blocks?.find(({ id }) => id === state.activeBlockId)
            ?.preRenderedHTMLNodes !== undefined
        ) {
          state.blocks
            .find(({ id }) => id === state.activeBlockFolderId)
            .blocks.find(
              ({ id }) => id === state.activeBlockId
            ).preRenderedHTMLNodes = state.preRenderedHTMLNodes[0]
        }
      }
    }
  }
}

function updateNodesBasedOnList(state) {
  if (state.nodesEditMode === 'page') {
    state.preRenderedHTMLNodes = state.projectPages.find(
      ({ id }) => id === state.activePageId
    ).preRenderedHTMLNodes
  } else if (state.nodesEditMode === 'layout') {
    state.preRenderedHTMLNodes = [
      state.projectLayouts
        .find(({ id }) => id === state.activeLayoutFolder)
        .items.find(({ id }) => id === state.activeLayoutId)
        .preRenderedHTMLNodes,
    ]
  } else if (state.nodesEditMode === 'cmsTemplate') {
    state.preRenderedHTMLNodes = state.collections.find(
      ({ id }) => id === state.activeCollectionTemplateId
    ).preRenderedHTMLNodes
  } else if (state.nodesEditMode === 'block') {
    state.preRenderedHTMLNodes = [
      state.blocks
        .find(({ id }) => id === state.activeBlockFolderId)
        .blocks.find(({ id }) => id === state.activeBlockId)
        .preRenderedHTMLNodes,
    ]
  }
}

function updateNodesGlobally(state, fx) {
  updateNodesLists(state)

  state.projectPages.forEach((page) => {
    fx(page.preRenderedHTMLNodes)
  })

  state.collections.forEach((collection) => {
    fx(collection.preRenderedHTMLNodes)
  })

  state.projectSymbols.forEach((symbol) => {
    fx(symbol.preRenderedHTMLNodes)
  })

  state.projectLayouts.forEach((folder) => {
    folder.items.forEach((layout) => {
      fx([layout.preRenderedHTMLNodes])
    })
  })

  state.blocks.forEach((blockFolder) => {
    blockFolder.blocks.forEach((block) => {
      fx([block.preRenderedHTMLNodes])
    })
  })

  updateNodesBasedOnList(state)
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    /* Collections  */

    setCollections: (state, action) => {
      state.collections = action.payload
      state.activeCollectionId = state.collections?.[0]?.id || ''
      state.activeCollectionItemId =
        state.collections?.[0]?.items?.[0]?.id || ''
    },

    addCollection: (state, action) => {
      const collectionName = action.payload
      state.collections.push({
        id: uuidv4(),
        name: collectionName,
        slug: collectionName.toLowerCase().replaceAll(' ', '-'),
        fields: [],
        items: [],
        preRenderedHTMLNodes: [],
      })
    },

    editCollection: (state, action) => {
      const property = action.payload.property
      const value = action.payload.value

      state.collections.find(({ id }) => id === action.payload.id)[property] =
        value
    },

    deleteCollection: (state, action) => {
      const collectionId = action.payload.id

      const collectionIndex = state.collections
        .map((x) => {
          return x.id
        })
        .indexOf(collectionId)

      state.collections.splice(collectionIndex, 1)
    },

    setActiveCollection: (state, action) => {
      state.activeCollectionId = action.payload
      state.activeCollectionIndex = state.collections
        .map((x) => {
          return x.id
        })
        .indexOf(state.activeCollectionId)

      state.activeCollectionItemIndex = -1
      state.activeCollectionItemId = ''

      // state.activeCollectionItemIndex = 0;
      // state.activeCollectionItemId = state.collections[state.activeCollectionIndex]?.items[0]?.id;
    },

    addCollectionItem: (state, action) => {
      const collectionItemName = action.payload
      let activeCollectionItems =
        state.collections[state.activeCollectionIndex].items
      const collectionItemId = uuidv4()

      activeCollectionItems.push({
        id: collectionItemId,
        name: collectionItemName,
        slug: collectionItemName.toLowerCase().replaceAll(' ', '-'),
        data: [],
      })

      state.activeCollectionItemId = collectionItemId

      state.activeCollectionItemIndex = activeCollectionItems
        .map((x) => {
          return x.id
        })
        .indexOf(state.activeCollectionItemId)
    },

    setActiveCollectionItem: (state, action) => {
      state.activeCollectionItemId = action.payload

      let activeCollectionsItems =
        state.collections[state.activeCollectionIndex].items
      state.activeCollectionItemIndex = activeCollectionsItems
        .map((x) => {
          return x.id
        })
        .indexOf(state.activeCollectionItemId)
    },

    editCollectionItem: (state, action) => {
      const editedItemFieldsData = action.payload
      editedItemFieldsData.map((item) => {
        let fieldIsEmpty = true
        let colletionItemFields =
          state.collections[state.activeCollectionIndex].items[
            state.activeCollectionItemIndex
          ].data

        colletionItemFields.map((field, index) => {
          if (field.fieldId === item.fieldId) {
            fieldIsEmpty = false
            colletionItemFields[index].fieldValue = item.fieldValue
          }
        })

        if (fieldIsEmpty) {
          colletionItemFields.push({
            fieldId: item.fieldId,
            fieldValue: item.fieldValue,
          })
        }
      })
    },

    deleteCollectionItem: (state, action) => {
      const collectionItemId = action.payload
      let activeCollectionItems =
        state.collections[state.activeCollectionIndex].items

      activeCollectionItems.splice(
        activeCollectionItems
          .map((x) => {
            return x.id
          })
          .indexOf(collectionItemId),
        1
      )

      state.activeCollectionItemIndex = -1
      state.activeCollectionItemId = ''
    },

    archiveCollectionItem: (state, action) => {
      const collectionItemId = action.payload
      let activeCollectionItems =
        state.collections[state.activeCollectionIndex].items

      activeCollectionItems.map((item) => {
        console.log(item.id)
        if (item.id === collectionItemId) {
          item.archived = true
        }
      })

      state.activeCollectionItemIndex = -1
      state.activeCollectionItemId = ''
    },

    unArchiveCollectionItem: (state, action) => {
      const collectionItemId = action.payload
      let activeCollectionItems =
        state.collections[state.activeCollectionIndex].items

      activeCollectionItems.map((item, index) => {
        if (item.id === collectionItemId) {
          activeCollectionItems[index].archived = false
        }
      })

      state.activeCollectionItemIndex = -1
      state.activeCollectionItemId = ''
    },

    duplicateCollectionItem: (state, action) => {
      const collectionItemId = action.payload
      let activeCollectionItems =
        state.collections[state.activeCollectionIndex].items

      let collectionItemToDuplicate = activeCollectionItems.find(
        ({ id }) => id === collectionItemId
      )

      let collectionItemToDuplicateId = uuidv4()

      activeCollectionItems.push({
        id: collectionItemToDuplicateId,
        name: collectionItemToDuplicate.name + ' Copy',
        slug: collectionItemToDuplicate.slug,
        data: collectionItemToDuplicate.data,
      })

      state.activeCollectionItemIndex = -1
      state.activeCollectionItemId = ''
    },

    editCollectionItemName: (state, action) => {
      const collectionItemName = action.payload
      state.collections[state.activeCollectionIndex].items[
        state.activeCollectionItemIndex
      ].name = collectionItemName
    },

    addCollectionField: (state, action) => {
      state.collections
        .find(({ id }) => id === state.activeSettingsCollectionId)
        .fields.push({
          id: uuidv4(),
          name: action.payload.name,
          helpText: action.payload.helpText,
          type: action.payload.type,
        })
    },

    editCollectionField: (state, action) => {
      const name = action.payload.name
      const helpText = action.payload.helpText
      let collection = state.collections.find(
        ({ id }) => id === state.activeSettingsCollectionId
      )
      let field = collection.fields.find(
        ({ id }) => id === state.activeSettingsCollectionFieldId
      )
      field.name = name
      field.helpText = helpText
    },

    deleteCollectionField: (state, action) => {
      let collection = state.collections.find(
        ({ id }) => id === state.activeSettingsCollectionId
      )
      collection.fields.splice(
        collection.fields
          .map((x) => {
            return x.id
          })
          .indexOf(state.activeSettingsCollectionFieldId),
        1
      )
    },

    setActiveCollectionTemplate: (state, action) => {
      updateNodesLists(state)
      state.nodesEditMode = 'cmsTemplate'
      state.activeLayoutId = ''
      state.activePageId = ''

      state.activeCollectionTemplateId = action.payload
      state.activeCollectionItemTemplateId = state.collections?.find(
        ({ id }) => id === state.activeCollectionTemplateId
      )?.items?.[0]?.id

      updateNodesBasedOnList(state)
      state.activeNodeId = ''
    },

    setActiveCollectionItemTemplate: (state, action) => {
      state.activeCollectionItemTemplateId = action.payload
    },

    setCollectionPanelState: (state, action) => {
      state.collectionPanelState = action.payload
    },

    setActiveClickedCmsItemIndex: (state, action) => {
      state.activeClickedCmsItemIndex = action.payload
    },

    setActiveHoveredCmsItemIndex: (state, action) => {
      state.activeHoveredCmsItemIndex = action.payload
    },

    setActiveSettingsCollectionId: (state, action) => {
      state.activeSettingsCollectionId = action.payload
      if (state.activeSettingsCollectionId !== '') {
        state.collectionPanelState = 'settings'
      }
    },

    setActiveSettingsCollectionFieldId: (state, action) => {
      state.activeSettingsCollectionFieldId = action.payload
    },

    /* Symbols */

    setSymbols: (state, action) => {
      state.projectSymbols = action.payload
    },

    addSymbol: (state, action) => {
      let symbolId = uuidv4()
      let newNode = {
        id: uuidv4(),
        symbolId: symbolId,
        title: '',
        type: 'sym',
        class: [],
        children: [{ ...state.activeNodeObject }],
      }
      state.projectSymbols = [
        ...state.projectSymbols,
        {
          id: symbolId,
          name: action.payload,
          preRenderedHTMLNodes: newNode,
        },
      ]
      let activeNode = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )

      activeNode.type = 'sym'
      activeNode.title = ''
      activeNode.symbolId = symbolId
      activeNode.id = uuidv4()
      activeNode.class = []
      activeNode.children = [{ ...state.activeNodeObject }]
    },

    editSymbolName: (state, action) => {
      const elementIndex = state.projectSymbols.findIndex(
        ({ id }) => id === action.payload.id
      )
      state.projectSymbols[elementIndex][action.payload.property] =
        action.payload.value
    },

    deleteSymbol: (state, action) => {
      const elementIndex = state.projectSymbols.findIndex(
        ({ id }) => id === action.payload.id
      )
      state.projectSymbols.splice(elementIndex, 1)
    },

    addSymbolToProject: (state, action) => {
      let response
      let tempHtmlNodes = JSON.stringify(state.preRenderedHTMLNodes)
      let activeNodeId = state.activeNodeId

      let newNode = state.projectSymbols.find(
        ({ id }) => id === action.payload.id
      ).preRenderedHTMLNodes
      regenerateIdsInNodes(newNode)

      function findNode(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) {
            tempHtmlNodes = tempHtmlNodes.replace(
              JSON.stringify(nodes[i]),
              JSON.stringify(nodes[i]) + ',' + JSON.stringify(newNode)
            )
            response = JSON.parse(tempHtmlNodes)
            break
          }
          if (nodes[i].children) {
            findNode(nodes[i].children, id)
          }
        }
      }

      findNode(state.preRenderedHTMLNodes, activeNodeId)

      if (state.activeNodeId !== '') {
        state.preRenderedHTMLNodes = response
      } else {
        // add newNode as last element if activeNode is not selected
        state.preRenderedHTMLNodes = [...state.preRenderedHTMLNodes, newNode]
      }

      state.activeNodeId = newNode.id
      state.stylesInActiveNode = []
      state.activeStyleIndex = undefined
    },

    makeSymbolEditable: (state, action) => {
      state.editedSymbolId.symbolId = action.payload.symbolId
      state.editedSymbolId.elementId = action.payload.elementId

      let tempNode = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )
      tempNode.expanded = true
    },

    editSymbolNodes: (state, action) => {
      const symbolId = state.editedSymbolId.symbolId
      const elementId = state.editedSymbolId.elementId
      state.activeNodeId = elementId
      state.editedSymbolId = { symbolId: '', elementId: '' }

      let updatedSymbolId = symbolId
      let updatedSymbolNodes = findActiveNode(
        state.preRenderedHTMLNodes,
        elementId
      )
      updatedSymbolNodes.expanded = false

      state.projectSymbols.find(
        ({ id }) => id === updatedSymbolId
      ).preRenderedHTMLNodes = updatedSymbolNodes

      function updateNodes(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].symbolId === updatedSymbolId) {
            let editedNodesArray = JSON.parse(
              JSON.stringify(updatedSymbolNodes)
            )
            regenerateIdsInNodes(editedNodesArray)
            nodes[i] = editedNodesArray
          }
          if (nodes[i].children) {
            updateNodes(nodes[i].children)
          }
        }
      }
      state.activeNodeId = ''
      updateNodesGlobally(state, updateNodes)
    },

    editSymbolsClickableArea: (state) => {
      function findNode(_nodes) {
        for (let i = 0; i < _nodes?.length; i++) {
          if (_nodes[i].type === 'sym') {
            let nodeHeight = getComputedStyle(
              document.getElementById(_nodes[i].id)
            )?.height
            document.querySelector(
              `[symbol_id="${_nodes[i].id}"]`
            ).style.height = nodeHeight
          }
          if (_nodes[i].children?.length > 0) {
            findNode(_nodes[i].children)
          }
        }
      }
      findNode(state.preRenderedHTMLNodes)
    },

    setActiveSymbolConnections: (state, action) => {
      state.activeSymbolConnections = []
      const symbolId = action.payload.id

      state.projectPages.forEach((page) => {
        checkNodes(page.preRenderedHTMLNodes, page.id, page.name, 'page')
      })

      state.projectLayouts.forEach((folder) => {
        folder.items.forEach((layout) => {
          checkNodes(
            [layout.preRenderedHTMLNodes],
            layout.id,
            layout.name,
            'layout'
          )
        })
      })

      state.blocks.forEach((blockFolder) => {
        blockFolder.blocks.forEach((block) => {
          checkNodes(
            [block.preRenderedHTMLNodes],
            block.id,
            block.name,
            'block'
          )
        })
      })

      function checkNodes(nodes, id, name, type) {
        for (let i = 0; i < nodes.length; i++) {
          if (symbolId === nodes[i].symbolId) {
            if (
              state.activeSymbolConnections.filter((item) => item.pageId === id)
                .length === 0
            ) {
              state.activeSymbolConnections.push({
                pageId: id,
                pageName: name,
                type: type,
                nodeId: nodes[i].id,
                amount: 1,
              })
            } else {
              state.activeSymbolConnections.find(
                (item) => item.pageId === id
              ).amount += 1
            }
          }
          if (nodes[i].children) {
            checkNodes(nodes[i].children, id, name, type)
          }
        }
      }
    },

    /* Pages */

    setPages: (state, action) => {
      state.projectPages = action.payload
      state.preRenderedHTMLNodes =
        state.projectPages[state.activePageIndex].preRenderedHTMLNodes
      // add setActivePageIndex here
      state.activePageId = state.projectPages[state.activePageIndex].id
    },

    setPageFolders: (state, action) => {
      state.projectPageFolders = action.payload
    },

    setPagesNestedStructure: (state, action) => {
      state.projectPageFolderStructure = action.payload
    },

    addPage: (state, action) => {
      //update previos page before creating a new one
      // const bodyStyleId = '2f3672cb-1cda-4a65-8fd3-ad00cc47051c'
      const bodyStyleId = state.preRenderedStyles.find(
        ({ name }) => name === 'body'
      ).id
      const bodyStyleName = 'body'
      updateNodesLists(state)
      state.nodesEditMode = 'page'
      // create new page
      let newPageName = action.payload
      let newPageSlug = newPageName.toLowerCase().replaceAll(' ', '-')
      let newPageId = uuidv4()
      state.projectPages.push({
        name: newPageName,
        slug: newPageSlug,
        id: newPageId,
        preRenderedHTMLNodes: [
          {
            id: uuidv4(),
            type: 'body',
            children: [],
            class: [{ id: bodyStyleId, name: bodyStyleName }],
          },
        ],
      })
      state.projectPageFolderStructure.push({
        name: newPageName,
        slug: newPageSlug,
        id: newPageId,
      })
      //navigate to the new page
      state.activePageId = newPageId
      state.activePageIndex = state.projectPages
        .map((x) => {
          return x.id
        })
        .indexOf(state.activePageId)

      updateNodesBasedOnList(state)
      state.activeNodeId = ''
    },

    editPage: (state, action) => {
      state.projectPages.find(({ id }) => id === state.openedSettingsPage.id)[
        action.payload.property
      ] = action.payload.value
      let settingsOpenedPage = findActiveNode(
        state.projectPageFolderStructure,
        state.openedSettingsPage.id
      )
      settingsOpenedPage[action.payload.property] = action.payload.value
    },

    // TO DO deletePageFolder
    deletePage: (state) => {
      const indexProjectPages = state.projectPages.findIndex(
        ({ id }) => id === state.openedSettingsPage.id
      )
      state.projectPages.splice(indexProjectPages, 1)

      let [
        settingsOpenedPage,
        settingsOpenedPageSiblingArray,
        settingsOpenedPageIndex,
      ] = findActiveNodeSiblingArrayAndIndex(
        state.projectPageFolderStructure,
        state.openedSettingsPage.id
      )
      settingsOpenedPageSiblingArray.splice(settingsOpenedPageIndex, 1)

      if (state.openedSettingsPage.id === state.activePageId) {
        state.activeNodeId = ''
        state.activePageIndex = 0
        state.activePageId = state.projectPages[state.activePageIndex].id
        state.preRenderedHTMLNodes =
          state.projectPages[state.activePageIndex].preRenderedHTMLNodes
      }
    },

    setActivePage: (state, action) => {
      //update previos page before creating a new one
      updateNodesLists(state)
      state.activeLayoutId = ''
      state.activeCollectionTemplateId = ''
      state.nodesEditMode = 'page'
      // change page
      state.activePageId = action.payload
      state.activePageIndex = state.projectPages
        .map((x) => {
          return x.id
        })
        .indexOf(state.activePageId)
      // render the new page
      updateNodesBasedOnList(state)
      state.activeNodeId = ''
    },

    addPageFolder: (state, action) => {
      const folderName = action.payload
      const folderSlug = folderName.toLowerCase().replaceAll(' ', '-')
      const folder = {
        name: folderName,
        slug: folderSlug,
        id: uuidv4(),
        children: [],
      }
      state.projectPageFolders.push(folder)
      state.projectPageFolderStructure.push(folder)
    },

    editPageFolder: (state, action) => {
      state.projectPageFolders.find(
        ({ id }) => id === state.openedSettingsPage.id
      )[action.payload.property] = action.payload.value
      let settingsOpenedPage = findActiveNode(
        state.projectPageFolderStructure,
        state.openedSettingsPage.id
      )
      settingsOpenedPage[action.payload.property] = action.payload.value
    },

    deletePageFolder: (state) => {
      const indexOpenedPageFolder = state.projectPageFolders.findIndex(
        ({ id }) => id === state.openedSettingsPage.id
      )
      state.projectPageFolders.splice(indexOpenedPageFolder, 1)

      let [
        settingsOpenedPage,
        settingsOpenedPageSiblingArray,
        settingsOpenedPageIndex,
      ] = findActiveNodeSiblingArrayAndIndex(
        state.projectPageFolderStructure,
        state.openedSettingsPage.id
      )
      settingsOpenedPageSiblingArray.splice(settingsOpenedPageIndex, 1)

      if (
        state.projectPages?.find(({ id }) => id === state.activePageId) ===
        undefined
      ) {
        state.activeNodeId = ''
        state.activePageIndex = 0
        state.activePageId = state.projectPages[state.activePageIndex].id
        state.preRenderedHTMLNodes =
          state.projectPages[state.activePageIndex].preRenderedHTMLNodes
      }
    },

    openPageSettings: (state, action) => {
      state.openedSettingsPage = action.payload
    },

    closePageSettings: (state) => {
      state.openedSettingsPage = {}
    },

    setDraggedPage: (state, action) => {
      state.draggedPage = action.payload
    },

    setDragOverPage: (state, action) => {
      state.dragOverPage = action.payload
    },

    moveDraggedPaged: (state) => {
      let [draggedFromPage, draggedFromPageSiblingArray, draggedFromPageIndex] =
        findActiveNodeSiblingArrayAndIndex(
          state.projectPageFolderStructure,
          state.draggedPage.id
        )
      let [draggedToPage, draggedToPageSiblingArray, draggedToPageIndex] =
        findActiveNodeSiblingArrayAndIndex(
          state.projectPageFolderStructure,
          state.dragOverPage.id
        )

      draggedFromPageSiblingArray.splice(draggedFromPageIndex, 1)
      if (draggedToPage?.children) {
        draggedToPage.children.push(draggedFromPage)
        draggedToPage.expanded = true
      } else {
        draggedToPageSiblingArray.splice(
          draggedToPageIndex + 1,
          0,
          draggedFromPage
        )
      }
      state.draggedPage = ''
      state.dragOverPage = ''
    },

    togglePageFolderExpandState: (state, action) => {
      const folderId = action.payload
      let activeFolder = findActiveNode(
        state.projectPageFolderStructure,
        folderId
      )
      let expandedState = activeFolder?.expanded ? true : false
      activeFolder.expanded = !expandedState
    },

    /* Styles */

    setStyles: (state, action) => {
      state.preRenderedStyles = [...action.payload]
      updateGlobalCSS(state)
    },

    addStyle: (state, action) => {
      let nodeId = state.activeNodeId
      let styleName = action.payload
      let newStyleId = uuidv4()

      let newStyleToConnectWithNodes = { name: styleName, id: newStyleId }
      let newStyleToConnectWithStyles = {
        name: styleName,
        id: newStyleId,
        childrens: [],
        styles: {},
      }

      let styleIndex = 0

      // add checking if it's a new class

      if (state.stylesInActiveNode?.length > 0) {
        state.preRenderedStyles.forEach((style, index) => {
          if (style.id === state.stylesInActiveNode[0].id) {
            state.preRenderedStyles
              .find(({ id }) => id === style.id)
              .childrens.push({
                id: uuidv4(),
                options: [newStyleToConnectWithStyles],
              })
            state.activeStyleOptionIndex =
              state.preRenderedStyles.find(
                ({ id }) => id === state.stylesInActiveNode[0].id
              ).childrens.length - 1

            styleIndex = state.activeStyleOptionIndex + 1
          }
        })
      } else {
        let isItNewStyle = true
        state.preRenderedStyles.map((style) => {
          if (style.name === styleName) {
            isItNewStyle = false
            newStyleToConnectWithNodes.id = style.id
          }
        })
        if (isItNewStyle) {
          state.preRenderedStyles.push(newStyleToConnectWithStyles)
        }
      }

      let activeNode = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )

      activeNode.class[styleIndex] = newStyleToConnectWithNodes

      for (let j = 0; j < styleIndex; j++) {
        if (activeNode.class[j]?.id === undefined) {
          activeNode.class[j] = { id: '', name: '' }
        }
      }
      state.stylesInActiveNode = [...activeNode.class]

      // state.activeStyleId = optionId
      // function findNode(nodes, id) {
      //   for (let i = 0; i < nodes.length; i++) {
      //     if (nodes[i].id === id) {
      //       nodes[i].class.push(newStyleToConnectWithNodes)
      //       state.stylesInActiveNode = [...nodes[i].class]
      //       break
      //     }
      //     if (nodes[i].children) {
      //       findNode(nodes[i].children, id)
      //     }
      //   }
      // }
      // findNode(state.preRenderedHTMLNodes, nodeId)

      state.activeStyleId = newStyleToConnectWithNodes.id
      state.activeStyleIndex = getIndexOfElementInArrayById(
        state.preRenderedStyles,
        state.activeStyleId
      )
    },

    renameStyle: (state, action) => {
      const nodeId = action.payload.id
      const newNodeName = action.payload.name
      for (let i = 0; i < state.preRenderedStyles.length; i++) {
        let node = state.preRenderedStyles[i]
        if (node.id === nodeId) {
          node.name = newNodeName
        }
      }

      function updateNodes(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = 0; j < nodes[i].class.length; j++) {
            if (nodes[i].class[j]?.id === nodeId) {
              nodes[i].class[j].name = newNodeName
            }
          }
          if (nodes[i].children) {
            updateNodes(nodes[i].children, id)
          }
        }
      }

      updateNodesGlobally(state, updateNodes)

      updateGlobalCSS(state)
      state.stylesInActiveNode[0].name = newNodeName
    },

    editStyleProperty: (state, action) => {
      let styleProperty = action.payload[0]
      let styleValue = action.payload[1]
      let styleResolution = state.activeProjectResolutionStylesListName

      const isPropertyInline = state.objectHierarchyStyles.findLast(
        ({ style }) => style === styleProperty
      )?.isInline

      const isActiveStyleMain =
        state.stylesInActiveNode?.[0]?.id === state.activeStyleId

      if (isActiveStyleMain && isPropertyInline !== true) {
        if (
          state.preRenderedStyles[state.activeStyleIndex][styleResolution] ===
          undefined
        ) {
          state.preRenderedStyles[state.activeStyleIndex][styleResolution] = {}
        }
        state.preRenderedStyles[state.activeStyleIndex][styleResolution][
          styleProperty
        ] = styleValue
      } else if (state.activeStyleId === '' || isPropertyInline) {
        const node = findActiveNode(
          state.preRenderedHTMLNodes,
          state.activeNodeId
        )
        if (node?.styles === undefined) {
          node.styles = {}
        }
        if (node?.styles?.[styleResolution] === undefined) {
          node.styles[styleResolution] = {}
        }
        node.styles[styleResolution][styleProperty] = styleValue
      } else {
        if (
          state.preRenderedStyles
            .find(({ id }) => id === state.stylesInActiveNode?.[0]?.id)
            .childrens[state.activeStyleOptionIndex].options.find(
              ({ id }) => id === state.activeStyleId
            )[styleResolution] === undefined
        ) {
          state.preRenderedStyles
            .find(({ id }) => id === state.stylesInActiveNode?.[0]?.id)
            .childrens[state.activeStyleOptionIndex].options.find(
              ({ id }) => id === state.activeStyleId
            )[styleResolution] = {}
        }
        state.preRenderedStyles
          .find(({ id }) => id === state.stylesInActiveNode?.[0]?.id)
          .childrens[state.activeStyleOptionIndex].options.find(
            ({ id }) => id === state.activeStyleId
          )[styleResolution][styleProperty] = styleValue
      }

      updateGlobalCSS(state)
    },

    editDefinedStyleProperty: (state, action) => {
      let styleProperty = action.payload.styleProperty
      let styleValue = action.payload.styleValue
      let styleId = action.payload.styleId
      let optionId = action.payload.optionId
      let optionVersionId = action.payload.optionVersionId
      let styleResolution = action.payload.styleResolution

      if (optionId === '' || optionId === undefined) {
        state.preRenderedStyles.find(({ id }) => id === styleId)[
          styleResolution
        ][styleProperty] = styleValue
      } else {
        state.preRenderedStyles
          .find(({ id }) => id === styleId)
          .childrens.find(({ id }) => id === optionId)
          .options.find(({ id }) => id === optionVersionId)[styleResolution][
          styleProperty
        ] = styleValue
      }
      updateGlobalCSS(state)
    },

    assignInlineStylePropertyToClass: (state, action) => {
      const { styleProperty, styleId, optionVersionId } = action.payload

      const activeNode = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )
      const styleResolution = state.activeProjectResolutionStylesListName

      const styleValue = activeNode.styles[styleResolution][styleProperty]

      console.log(styleValue)
      console.log(
        current(state.preRenderedStyles.find(({ id }) => id === styleId))
      )

      if (optionVersionId === '' || optionVersionId === undefined) {
        state.preRenderedStyles.find(({ id }) => id === styleId)[
          styleResolution
        ][styleProperty] = styleValue
      } else {
        state.preRenderedStyles
          .find(({ id }) => id === styleId)
          .childrens.forEach((children) => {
            children.options.forEach((option) => {
              if (option.id === optionVersionId) {
                option[styleResolution][styleProperty] = styleValue
              }
            })
          })
      }

      delete activeNode.styles[styleResolution][styleProperty]
      if (styleProperty === 'flex-grow') {
        delete activeNode.styles[styleResolution]['flex-shrink']
        delete activeNode.styles[styleResolution]['flex-basis']
      }
      updateGlobalCSS(state)
    },

    assignAllInlineStylesToClass: (state, action) => {
      const { styleId, optionId, optionVersionId } = action.payload

      const node = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )

      const resolutionName = state.activeProjectResolutionStylesListName

      function isOptionClass() {
        return optionId !== undefined
      }

      if (!isOptionClass()) {
        state.preRenderedStyles.find(({ id }) => id === styleId)[
          resolutionName
        ] = {
          ...state.preRenderedStyles.find(({ id }) => id === styleId)[
            resolutionName
          ],
          ...node.styles?.[resolutionName],
        }
      } else {
        state.preRenderedStyles
          .find(({ id }) => id === styleId)
          .childrens.find(({ id }) => id === optionId)
          .options.find(({ id }) => id === optionVersionId)[resolutionName] = {
          ...state.preRenderedStyles
            .find(({ id }) => id === styleId)
            .childrens.find(({ id }) => id === optionId)
            .options.find(({ id }) => id === optionVersionId)[resolutionName],
          ...node.styles?.[resolutionName],
        }
      }

      node.styles[resolutionName] = {}

      updateGlobalCSS(state)
    },

    deleteStyleProperty: (state, action) => {
      let styleProperty = action.payload
      let styleResolution = state.activeProjectResolutionStylesListName

      function deletePropertyFromStyle(property) {
        delete state.preRenderedStyles[state.activeStyleIndex][styleResolution][
          property
        ]
      }

      function deletePropertyFromOption(property) {
        delete state.preRenderedStyles
          .find(({ id }) => id === state.stylesInActiveNode[0].id)
          .childrens[state.activeStyleOptionIndex].options.find(
            ({ id }) => id === state.activeStyleId
          )[styleResolution][property]
      }

      if (state.activeStyleId === state.stylesInActiveNode[0].id) {
        deletePropertyFromStyle(styleProperty)
        if (styleProperty === 'flex-grid') {
          deletePropertyFromStyle('flex-direction')
          deletePropertyFromStyle('flex-wrap')
        }
      } else {
        deletePropertyFromOption(styleProperty)
        if (styleProperty === 'flex-grid') {
          deletePropertyFromOption('flex-direction')
          deletePropertyFromOption('flex-wrap')
        }
      }
      updateGlobalCSS(state)
    },

    deleteStylePropertyInDefinedStyle: (state, action) => {
      let { property, styleId, optionId, optionVersionId } = action.payload
      let styleResolution = 'styles'

      function deletePropertyFromStyle(property) {
        delete state.preRenderedStyles.find(({ id }) => id === styleId)[
          styleResolution
        ][property]
      }

      function deletePropertyFromOption(property) {
        delete state.preRenderedStyles
          .find(({ id }) => id === styleId)
          .childrens.find(({ id }) => id === optionId)
          .options.find(({ id }) => optionVersionId)[styleResolution][property]
      }

      if (optionId === '' || optionId === undefined) {
        deletePropertyFromStyle(property)
        if (property === 'flex-grid') {
          deletePropertyFromStyle('flex-direction')
          deletePropertyFromStyle('flex-wrap')
        }
      } else {
        deletePropertyFromOption(property)
        if (property === 'flex-grid') {
          deletePropertyFromOption('flex-direction')
          deletePropertyFromOption('flex-wrap')
        }
      }
      updateGlobalCSS(state)
    },

    addStyleOption: (state, action) => {
      let styleOptionName = action.payload.name
      let childrenIndex = action.payload.childrenIndex
      let mainStyleId = state.stylesInActiveNode[0].id
      let newStyleId = uuidv4()

      state.preRenderedStyles
        .find(({ id }) => id === mainStyleId)
        .childrens[childrenIndex].options.push({
          name: styleOptionName,
          id: newStyleId,
          styles: {},
        })
    },

    editStyleOption: (state, action) => {
      const property = action.payload.property
      const value = action.payload.value
      const index = action.payload.index
      state.preRenderedStyles.find(
        ({ id }) => id === state.stylesInActiveNode[0].id
      ).childrens[index][property] = value
      updateGlobalCSS(state)

      // console.log(current(state.preRenderedStyles.find(({id}) => id === state.stylesInActiveNode[0].id)
      // .childrens[index]));
    },

    removeStyleOption: (state, action) => {
      let optionIndex = action.payload.optionIndex
      let activeNode = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )
      activeNode.class[optionIndex + 1] = { id: '', name: '' }
      state.stylesInActiveNode[optionIndex + 1] = { id: '', name: '' }
      state.activeStyleId = ''
    },

    deleteStyleOption: (state, action) => {
      let childrenIndex = action.payload.index
      let mainStyleId = state.stylesInActiveNode[0].id
      state.preRenderedStyles
        .find(({ id }) => id === mainStyleId)
        .childrens.splice(childrenIndex, 1)

      function updateNodes(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          let node = nodes[i]
          if (node.class[0]?.id === mainStyleId) {
            node.class.splice(childrenIndex + 1, 1)
          }
          if (node.children) {
            updateNodes(node.children)
          }
        }
      }

      updateNodesGlobally(state, updateNodes)
    },

    deleteStyleSubOption: (state, action) => {
      let optionIndex = action.payload.optionIndex
      let subOptionId = action.payload.subOptionId

      let mainStyleId = state.stylesInActiveNode[0].id
      let options = state.preRenderedStyles.find(({ id }) => id === mainStyleId)
        .childrens[optionIndex].options

      if (options.length > 1) {
        for (let i = 0; i < options.length; i++) {
          if (options[i].id === subOptionId) {
            options.splice(i, 1)
          }
        }

        function updateNodes(nodes, id) {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].class[0]?.id === mainStyleId) {
              nodes[i]?.class.map((option) => {
                if (option.id === subOptionId) {
                  option.id = ''
                  option.name = ''
                }
              })
            }
            if (nodes[i].children) {
              updateNodes(nodes[i].children, id)
            }
          }
        }

        updateNodesGlobally(state, updateNodes)
        updateGlobalCSS(state)

        for (let i = 0; i < state.stylesInActiveNode.length; i++) {
          if (state.stylesInActiveNode[i].id === subOptionId) {
            state.stylesInActiveNode[i] = { id: '', name: '' }
          }
        }
      }
    },

    editStyleSubOption: (state, action) => {
      let optionIndex = action.payload.optionIndex
      let subOptionId = action.payload.subOptionId
      let subOptionName = action.payload.name

      let mainStyleId = state.stylesInActiveNode[0].id
      let options = state.preRenderedStyles.find(({ id }) => id === mainStyleId)
        .childrens[optionIndex].options

      if (options.length > 0) {
        for (let i = 0; i < options.length; i++) {
          if (options[i].id === subOptionId) {
            options[i].name = subOptionName
          }
        }

        function updateNodes(nodes, id) {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].class[0]?.id === mainStyleId) {
              nodes[i]?.class.map((option) => {
                if (option.id === subOptionId) {
                  option.name = subOptionName
                }
              })
            }
            if (nodes[i].children) {
              updateNodes(nodes[i].children, id)
            }
          }
        }

        updateNodesGlobally(state, updateNodes)
        updateGlobalCSS(state)

        for (let i = 0; i < state.stylesInActiveNode.length; i++) {
          if (state.stylesInActiveNode[i].id === subOptionId) {
            state.stylesInActiveNode[i].name = subOptionName
          }
        }
      }
    },

    setActiveNodeComputedStyles: (state) => {
      if (state.activeNodeId !== '') {
        try {
          let activeNode = document.querySelector(
            `[el_id="${state.activeNodeId}"]`
          )
          let computedStyle = getComputedStyle(activeNode)
          state.activeNodeComputedStyles = {
            display: computedStyle?.['display'],

            margin_top: computedStyle?.['margin-top'],
            margin_bottom: computedStyle?.['margin-bottom'],
            margin_left: computedStyle?.['margin-left'],
            margin_right: computedStyle?.['margin-right'],

            padding_top: computedStyle?.['padding-top'],
            padding_bottom: computedStyle?.['padding-bottom'],
            padding_left: computedStyle?.['padding-left'],
            padding_right: computedStyle?.['padding-right'],

            width: computedStyle?.['width'],
            min_width: computedStyle?.['min-width'],
            max_width: computedStyle?.['max-width'],

            height: computedStyle?.['height'],
            min_height: computedStyle?.['min-height'],
            max_height: computedStyle?.['max-height'],

            top: computedStyle?.['top'],
            bottom: computedStyle?.['bottom'],
            left: computedStyle?.['left'],
            right: computedStyle?.['right'],

            opacity: computedStyle?.['opacity'],
            position: computedStyle?.['position'],
            grid_template_columns: computedStyle?.['grid-template-columns'],

            grid_column_gap: computedStyle?.['grid-column-gap'],
            grid_row_gap: computedStyle?.['grid-row-gap'],

            flex_direction: computedStyle?.['flex-direction'],
            flex_wrap: computedStyle?.['flex-wrap'],

            flex_grow: computedStyle?.['flex-grow'],
            flex_basis: computedStyle?.['flex-basis'],
            flex_shrink: computedStyle?.['flex-shrink'],

            font_family: computedStyle?.['font-family'],
            font_weight: computedStyle?.['font-weight'],

            font_size: computedStyle?.['font-size'],
            line_height: computedStyle?.['line-height'],
            letter_spacing: computedStyle?.['letter-spacing'],

            color: computedStyle?.['color'],
            background_color: computedStyle?.['background-color'],
            border_color: computedStyle?.['border-color'],

            border_radius: computedStyle?.['border-radius'],
            border_width: computedStyle?.['border-width'],

            text_align: computedStyle?.['text-align'],

            overflow: computedStyle?.['overflow'],

            align_items: computedStyle?.['align-items'],
            justify_content: computedStyle?.['justify-content'],
          }
        } catch {}
      }
      // console.log(state.activeNodeComputedStyles);
    },

    editActiveStyleProperties: (state) => {
      if (state.activeStyleId === state.stylesInActiveNode?.[0]?.id) {
        state.activeStyleObject =
          state.preRenderedStyles[state.activeStyleIndex]?.[
            state.activeProjectResolutionStylesListName
          ]
      } else {
        state.activeStyleObject =
          state.preRenderedStyles
            ?.find(({ id }) => id === state.stylesInActiveNode?.[0]?.id)
            ?.childrens[state.activeStyleOptionIndex]?.options.find(
              ({ id }) => id === state.activeStyleId
            )?.[state.activeProjectResolutionStylesListName] || {}
      }
    },

    setActiveStyleOptionIndex: (state, action) => {
      state.activeStyleOptionIndex = action.payload
    },

    setActiveStyleId: (state, action) => {
      state.activeStyleId = action.payload
      state.activeStyleIndex = getIndexOfElementInArrayById(
        state.preRenderedStyles,
        state.activeStyleId
      )
    },

    updateActiveStyleListAndId: (state) => {
      state.stylesInActiveNode = state.activeNodeObject?.class

      if (state.projectMode === 'developer') {
        state.activeStyleIndex = getIndexOfElementInArrayById(
          state.preRenderedStyles,
          state.stylesInActiveNode?.[0]?.id
        )

        state.stylesInActiveNode?.forEach((item, i) => {
          if (item?.id !== undefined && item?.id !== '') {
            state.activeStyleId = item?.id
            state.activeStyleOptionIndex = i - 1
          }
        })
      } else {
        state.activeStyleId = ''
        state.activeStyleIndex = undefined
        state.activeStyleOptionIndex = undefined
      }
    },

    setStyleState: (state, action) => {
      state.styleState = action.payload
    },

    /* Html */

    setHtmlNodes: (state, action) => {
      state.preRenderedHTMLNodes = action.payload
    },

    addHtmlNode: (state, action) => {
      let newNodeId = uuidv4()

      let newNode = {
        id: newNodeId,
        title: 'Default text',
        type: action.payload,
        children: [],
        class: [],
        expanded: true,
      }

      if (newNode.type === 'h') {
        newNode.subtype = 'h1'
      }

      function findNode(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) {
            if (
              (nodeIsFolder(nodes[i]) && nodes[i].children.length == 0) ||
              nodes[i].type === 'body'
            ) {
              nodes[i].children.splice(i + 1, 0, newNode)
            } else {
              nodes.splice(i + 1, 0, newNode)
            }
            break
          }
          if (nodes[i].children) {
            findNode(nodes[i].children, id)
          }
        }
      }

      if (state.preRenderedHTMLNodes?.[0] !== undefined) {
        if (state.activeNodeId === '') {
          state.activeNodeId = state.preRenderedHTMLNodes?.[0].id
        }
        findNode(state.preRenderedHTMLNodes, state.activeNodeId)
      } else {
        state.preRenderedHTMLNodes.push(newNode)
      }

      state.activeNodeId = newNodeId
      state.stylesInActiveNode = []
      state.activeStyleIndex = undefined
    },

    editHtmlNode: (state, action) => {
      let response
      let tempHtmlNodes = JSON.stringify(state.preRenderedHTMLNodes)
      let editedNodeId = action.payload.id
      if (editedNodeId === undefined) {
        editedNodeId = state.activeNodeId
      }
      let editedNodeNewText = action.payload.value
      let editedField = action.payload.field

      function findNode(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) {
            if (nodes[i][editedField] === undefined) {
              tempHtmlNodes = tempHtmlNodes.replace(
                JSON.stringify(nodes[i]),
                JSON.stringify(nodes[i]).replace(
                  `"id":"${nodes[i].id}"`,
                  `"id":"${nodes[i].id}", "${editedField}":"${editedNodeNewText}" `
                )
              )
            } else {
              tempHtmlNodes = tempHtmlNodes.replace(
                JSON.stringify(nodes[i]),
                JSON.stringify(nodes[i]).replace(
                  `"${editedField}":"${nodes[i][editedField]}"`,
                  `"${editedField}":"${editedNodeNewText}"`
                )
              )
            }
            response = JSON.parse(tempHtmlNodes)
            break
          }
          if (nodes[i].children) {
            findNode(nodes[i].children, id)
          }
        }
      }

      findNode(state.preRenderedHTMLNodes, editedNodeId)
      state.preRenderedHTMLNodes = response
    },

    addFunctionToHtmlNode: (state, action) => {
      const { functionId } = action.payload
      let node = findActiveNode(state.preRenderedHTMLNodes, state.activeNodeId)
      const hasNodeAnyFunction = node?.functions !== undefined
      const hasNodeThisFunction =
        node?.functions?.find((item) => item?.id === functionId) !== undefined
      if (!hasNodeAnyFunction) {
        node.functions = []
      }
      if (!hasNodeThisFunction) {
        node.functions.push({
          id: functionId,
        })
      }
    },

    addDataToHtmlNode: (state, action) => {
      const { name, initValue, type } = action.payload
      let node = findActiveNode(state.preRenderedHTMLNodes, state.activeNodeId)
      const hasNodeAnyData = node?.data !== undefined
      if (!hasNodeAnyData) {
        node.data = []
      }
      node.data.push({
        id: uuidv4(),
        name: name,
        initValue: initValue,
        type: type,
      })
    },

    moveHtmlNode: (state, action) => {
      let moveReverse = action.payload.moveReverse
      function findNode(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {
          let new_index = i + 1
          if (moveReverse) {
            new_index = i - 1
          }
          if (nodes[i].id === id) {
            let indexCondition = new_index > nodes.length
            // if (moveReverse) { indexCondition = (new_index > 0) }
            if (indexCondition) {
              var k = new_index - nodes.length + 1
              while (k--) {
                nodes.push(undefined)
              }
            }
            nodes.splice(new_index, 0, nodes.splice(i, 1)[0])
            break
          }
          if (nodes[i].children) {
            findNode(nodes[i].children, id)
          }
        }
      }
      if (state.keyboardNavigationOn) {
        findNode(state.preRenderedHTMLNodes, state.activeNodeId)
      }
    },

    setHtmlNodesWithoutExpandedState: (state) => {
      state.preRenderedHTMLNodesWithoutExpandedStates = []
      function findNode(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          state.preRenderedHTMLNodesWithoutExpandedStates[i] = { ...nodes[i] }
          delete state.preRenderedHTMLNodesWithoutExpandedStates[i].expanded

          if (nodes[i].children) {
            findNode(nodes[i].children)
          }
        }
      }

      findNode(state.preRenderedHTMLNodes)

      // console.log(state.preRenderedHTMLNodesWithoutExpandedStates);
    },

    copyHtmlNodes: (state) => {
      const isNodeBody = state.activeNodeObject?.type === 'body'
      if (state.keyboardNavigationOn) {
        if (!isNodeBody) {
          state.copiedNodes = state.activeNodeObject
        } else {
          state.copiedNodes = {}
        }
      }
      // console.log(JSON.stringify(state.copiedNodes))
    },

    pasteHtmlNodes: (state) => {
      const isCopyMemoryEmpty = JSON.stringify(state.copiedNodes) === '{}'
      if (!isCopyMemoryEmpty) {
        regenerateIdsInNodes(state.copiedNodes)
        if (state.activeNodeId === '') {
          state.activeNodeId = state.preRenderedHTMLNodes?.[0].id
        }

        if (state.keyboardNavigationOn) {
          let [activeNode, activeNodeSiblingArray, activeNodeIndex] =
            findActiveNodeSiblingArrayAndIndex(
              state.preRenderedHTMLNodes,
              state.activeNodeId
            )
          if (
            (nodeIsFolder(activeNode) && activeNode.children.length == 0) ||
            activeNode.type === 'body'
          ) {
            activeNode.children.splice(
              activeNodeIndex + 1,
              0,
              state.copiedNodes
            )
          } else {
            activeNodeSiblingArray.splice(
              activeNodeIndex + 1,
              0,
              state.copiedNodes
            )
          }
          state.activeNodeId = state.copiedNodes.id
        }
      }
    },

    deleteHtmlNode: (state, action) => {
      let response
      let tempHtmlNodes = JSON.stringify(state.preRenderedHTMLNodes)
      let deletedNodeId = action.payload

      function findNode(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id && nodes[i].type !== 'body') {
            tempHtmlNodes = tempHtmlNodes.replace(
              ',' + JSON.stringify(nodes[i]),
              ''
            )
            tempHtmlNodes = tempHtmlNodes.replace(
              JSON.stringify(nodes[i]) + ',',
              ''
            )
            tempHtmlNodes = tempHtmlNodes.replace(JSON.stringify(nodes[i]), '')
            response = JSON.parse(tempHtmlNodes)
            break
          }
          if (nodes[i].children) {
            findNode(nodes[i].children, id)
          }
        }
      }

      findNode(state.preRenderedHTMLNodes, deletedNodeId)
      state.preRenderedHTMLNodes = response
    },

    addSpanToText: (state, action) => {
      let offset = 0
      let selection = window.getSelection()
      let range = selection.getRangeAt(0)
      let start = range.startOffset
      let end = range.endOffset

      if (selection.baseNode.parentNode.hasChildNodes()) {
        for (
          var i = 0;
          selection.baseNode.parentNode.childNodes.length > i;
          i++
        ) {
          var cnode = selection.baseNode.parentNode.childNodes[i]
          if (cnode.nodeType == document.TEXT_NODE) {
            if (offset + cnode.length > start) {
              break
            }
            offset = offset + cnode.length
          }
          if (cnode.nodeType == document.ELEMENT_NODE) {
            if (offset + cnode.textContent.length > start) {
              break
            }
            offset = offset + cnode.textContent.length
          }
        }
      }

      start = start + offset
      end = end + offset
      console.log(start, end)

      let node = findActiveNode(state.preRenderedHTMLNodes, state.activeNodeId)
      let text = node.title
      let textBeforeSelection = text.substring(0, start)
      let textAfterSelection = text.substring(end, text.length)
      let selectedTextString = text.substring(start, end)
      let newText = `${textBeforeSelection}<span>${selectedTextString}</span>${textAfterSelection}`
      node.title = newText
      node.children = [
        {
          id: uuidv4(),
          type: 'text',
          title: textBeforeSelection,
          classes: [],
        },
        {
          id: uuidv4(),
          type: 'span',
          title: selectedTextString,
          classes: [],
        },
        {
          id: uuidv4(),
          type: 'text',
          title: textAfterSelection,
          classes: [],
        },
      ]
    },

    deleteActiveHtmlNode: (state) => {
      let [activeNode, activeNodeSiblingArray, activeNodeIndex] =
        findActiveNodeSiblingArrayAndIndex(
          state.preRenderedHTMLNodes,
          state.activeNodeId
        )
      if (activeNode.type !== 'body') {
        if (activeNodeSiblingArray[activeNodeIndex + 1]) {
          state.activeNodeId = activeNodeSiblingArray[activeNodeIndex + 1].id
        } else if (activeNodeSiblingArray[activeNodeIndex - 1]) {
          state.activeNodeId = activeNodeSiblingArray[activeNodeIndex - 1].id
        } else {
          state.activeNodeId = ''
        }
        activeNodeSiblingArray = activeNodeSiblingArray.splice(
          activeNodeIndex,
          1
        )
      }
    },

    deleteActiveHtmlNodeShortcut: (state) => {
      if (
        state.keyboardNavigationOn
        // && state.projectMode === "developer"
      ) {
        let [activeNode, activeNodeSiblingArray, activeNodeIndex] =
          findActiveNodeSiblingArrayAndIndex(
            state.preRenderedHTMLNodes,
            state.activeNodeId
          )

        if (activeNode.type !== 'body') {
          if (activeNodeSiblingArray[activeNodeIndex + 1]) {
            state.activeNodeId = activeNodeSiblingArray[activeNodeIndex + 1].id
          } else if (activeNodeSiblingArray[activeNodeIndex - 1]) {
            state.activeNodeId = activeNodeSiblingArray[activeNodeIndex - 1].id
          } else {
            state.activeNodeId = ''
          }
          activeNodeSiblingArray = activeNodeSiblingArray.splice(
            activeNodeIndex,
            1
          )
        }
      }
    },

    setActiveHtmlNode: (state, action) => {
      state.activeNodeId = action.payload.id
    },

    setHoveredHtmlNode: (state, action) => {
      if (
        !state.keyboardNavigationOn &&
        document.querySelector(`[el_id="${state.activeNodeId}"]`)?.innerHTML !==
          undefined
      ) {
        let activeNode = findActiveNode(
          state.preRenderedHTMLNodes,
          state.activeNodeId
        )
        activeNode.title = sanitizeHtml(
          document.querySelector(`[el_id="${state.activeNodeId}"]`)?.innerHTML,
          {
            allowedTags: ['b', 'i', 'em', 'strong'],
            allowedAttributes: {
              a: ['href'],
            },
          }
        )
      }
      state.hoveredNodeId = action.payload
    },

    setGlobalActiveHtmlNode: (state) => {
      state.activeNodeObject = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )
    },

    toggleHtmlNodeExpandedState: (state, action) => {
      const nodeId = action.payload
      let tempNode = findActiveNode(state.preRenderedHTMLNodes, nodeId)
      if (tempNode.type !== 'sym') {
        let expandedState = tempNode?.expanded ? true : false
        tempNode.expanded = !expandedState
        state.isNodeSelectedFromNavigator = true
      }
    },

    setNodesEditMode: (state, action) => {
      state.nodesEditMode = action.payload
    },

    setDraggedNavigatorNodes: (state, action) => {
      state.draggedNavigatorNodes = findActiveNode(
        state.preRenderedHTMLNodes,
        action.payload
      )
    },

    setDraggedOverNavigatorItemId: (state, action) => {
      state.draggedOverNodeId = action.payload
    },

    dropDraggedNavigatorNodes: (state) => {
      let stopAction = false
      function deleteOldNode(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          if (state.draggedNavigatorNodes.id === state.draggedOverNodeId) {
            stopAction = true
            break
          }

          if (
            nodes[i].id === state.draggedNavigatorNodes.id &&
            state.draggedOverNodeId !== ''
          ) {
            nodes.splice(i, 1)
            break
          }

          if (nodes[i]?.children?.length > 0) {
            deleteOldNode(nodes[i].children)
          }
        }
      }

      function findNode(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) {
            if (nodeIsFolder(nodes[i])) {
              if (state.navigatorItemDragBehindState) {
                nodes.splice(i, 0, state.draggedNavigatorNodes)
                break
              } else {
                nodes[i].children.splice(0, 0, state.draggedNavigatorNodes)
                break
              }
            } else {
              if (state.navigatorItemDragBehindState) {
                nodes.splice(i, 0, state.draggedNavigatorNodes)
                break
              } else {
                nodes.splice(i + 1, 0, state.draggedNavigatorNodes)
                break
              }
            }
          }
          if (nodes[i].children) {
            findNode(nodes[i].children, id)
          }
        }
      }

      deleteOldNode(state.preRenderedHTMLNodes)
      if (!stopAction) {
        findNode(state.preRenderedHTMLNodes, state.draggedOverNodeId)
      }
      state.draggedNavigatorNodes = {}
      state.draggedOverNodeId = ''
    },

    // [TODO] add posibilty to check for sub classes and rensposiveness
    setIsActiveHtmlNodeParentDisplayFlex: (state) => {
      function findNode(nodes, parent, id) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) {
            if (parent?.class?.length) {
              parent.class.forEach((cl) => {
                let parentClassStyle = JSON.stringify(
                  state.preRenderedStyles.find(({ id }) => id === cl.id)?.styles
                )
                state.isActiveNodeParentDisplayStyleFlex =
                  parentClassStyle?.includes('"display":"flex"')
              })
            } else {
              state.isActiveNodeParentDisplayStyleFlex = false
            }
            break
          }
          if (nodes[i].children) {
            findNode(nodes[i].children, nodes[i], id)
          }
        }
      }
      findNode(state.preRenderedHTMLNodes, [], state.activeNodeId)
    },

    removeActiveHtmlNodeStyle: (state, action) => {
      let activeNode = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )
      activeNode.class = []
    },

    deleteActiveHtmlNodeInlineStyleProperty: (state, action) => {
      let styleProperty = action.payload
      let styleResolution = state.activeProjectResolutionStylesListName
      const node = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )
      delete node.styles[styleResolution][styleProperty]
      if (styleProperty === 'flex-grow') {
        delete node.styles[styleResolution]['flex-shrink']
        delete node.styles[styleResolution]['flex-basis']
      }
    },

    setActiveHtmlNodeStyleOption: (state, action) => {
      let index = action.payload.index + 1
      let optionId = action.payload.id
      let optionName = action.payload.name

      let activeNode = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )

      activeNode.class[index] = { id: optionId, name: optionName }

      for (let j = 0; j < index; j++) {
        if (activeNode.class[j]?.id === undefined) {
          activeNode.class[j] = { id: '', name: '' }
        }
      }
      state.stylesInActiveNode = [...activeNode.class]
      state.activeStyleId = optionId

      // function findNode(nodes, id) {
      //   for (let i = 0; i < nodes.length; i++) {
      //     if (nodes[i].id === id) {
      //       nodes[i].class[index] = { id: optionId, name: optionName }

      //       for (let j = 0; j < index; j++) {
      //         if (nodes[i].class[j]?.id === undefined) {
      //           nodes[i].class[j] = { id: '', name: '' }
      //         }
      //       }
      //       state.stylesInActiveNode = [...nodes[i].class]
      //       state.activeStyleId = optionId
      //       break
      //     }
      //     if (nodes[i].children) {
      //       findNode(nodes[i].children, id)
      //     }
      //   }
      // }
      // findNode(state.preRenderedHTMLNodes, state.activeNodeId)
    },

    handleArrowNodesNavigation: (state, action) => {
      let response = state.activeNodeId
      let pressedKey = action.payload.key
      let parentNodes = []
      let initailNodes = state.preRenderedHTMLNodes

      function findNode(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) {
            if (pressedKey == 'left') {
              if (i != 0) {
                response = nodes[i - 1].id
              }
            }
            if (pressedKey == 'right') {
              if (i != nodes.length - 1) {
                response = nodes[i + 1].id
              }
            }

            if (pressedKey == 'up') {
              if (initailNodes !== nodes) {
                response = parentNodes.id
              }
            }

            if (pressedKey == 'down') {
              if (nodes[i].children.length > 0) {
                response = nodes[i].children[0].id
              }
            }
            break
          }
          if (nodes[i].children) {
            if (nodes[i].children.length > 0) {
              parentNodes = nodes[i]
            }
            findNode(nodes[i].children, id)
          }
        }
      }

      if (state.keyboardNavigationOn) {
        findNode(state.preRenderedHTMLNodes, state.activeNodeId)
        state.activeNodeId = response
      }
    },

    updateStateOnScroll: (state) => {
      state.scrollCount = state.scrollCount + 1
    },

    setNavigatorItemDragBehindState: (state, action) => {
      state.navigatorItemDragBehindState = action.payload
    },

    setNodeProperty: (state, action) => {
      const id = action.payload.id || state.activeNodeId
      const { property, value } = action.payload
      let node = findActiveNode(state.preRenderedHTMLNodes, id)
      node[property] = value
    },

    setActiveHtmlNodeRepeatableState: (state, action) => {
      let activeNode = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )
      activeNode.repeatable = action.payload
    },

    setActiveHtmlFilterCurrentState: (state, action) => {
      let activeNode = findActiveNode(
        state.preRenderedHTMLNodes,
        action.payload.id
      )
      activeNode.filterCurrent = action.payload.value
    },

    setActiveHtmlNodeParentClassJoinState: (state, action) => {
      let activeNode = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )
      activeNode.joinParentClasses = action.payload
    },

    addActiveHtmlNodeBlockFolders: (state, action) => {
      let activeNode = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )
      if (activeNode?.blockFolders === undefined) {
        activeNode.blockFolders = []
      }
      let activeFolder = activeNode?.blockFolders?.find(
        ({ id }) => id === action.payload.id
      )
      if (activeFolder === undefined) {
        activeNode.blockFolders.push({
          id: action.payload.id,
          state: action.payload.state,
        })
      } else {
        activeFolder.state = action.payload.state
      }
    },

    asignBlockFolderToNodes: (state) => {
      function updateNodes(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].class[0]?.id === state.stylesInActiveNode[0].id) {
            nodes[i].blockFolders = state.activeNodeObject.blockFolders
          }
          if (nodes[i].children) {
            updateNodes(nodes[i].children, id)
          }
        }
      }

      updateNodesGlobally(state, updateNodes)
    },

    asignBlockFolderToNodesWithOptions: (state) => {
      const activeIndex = state.stylesInActiveNode?.findIndex(
        ({ id }) => id === state.activeStyleId
      )
      function updateNodes(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].class[0]?.id === state.stylesInActiveNode[0].id) {
            if (
              nodes[i].class[activeIndex]?.id ===
              state.stylesInActiveNode[activeIndex].id
            ) {
              nodes[i].blockFolders = state.activeNodeObject.blockFolders
            }
          }
          if (nodes[i].children) {
            updateNodes(nodes[i].children, id)
          }
        }
      }

      updateNodesGlobally(state, updateNodes)
    },

    setActiveHtmlNodeLink: (state, action) => {
      let activeNode = findActiveNode(
        state.preRenderedHTMLNodes,
        state.activeNodeId
      )
      activeNode.linkType = action.payload.linkType
      activeNode.link = action.payload.link
    },

    setProjectPopUp: (state, action) => {
      state.projectPopUp = action.payload
    },

    setProjectMode: (state, action) => {
      state.projectMode = action.payload
      if (state.projectMode === 'creator') {
        if (state.nodesEditMode === 'layout') {
          state.nodesEditMode = 'page'
          state.activePageId = state.projectPages[0].id
          state.activePageIndex = 0
          state.preRenderedHTMLNodes =
            state.projectPages[0].preRenderedHTMLNodes
        }
        state.activeTab = ''
      }
    },

    setBlocks: (state, action) => {
      state.blocks = action.payload
    },

    setActiveBlockFolderId: (state, action) => {
      state.activeBlockFolderId = action.payload
    },

    setActiveBlockAddFolderId: (state, action) => {
      state.activeBlockAddFolderId = action.payload
    },

    addBlockFolder: (state, action) => {
      state.blocks.push({
        id: uuidv4(),
        name: action.payload,
        blocks: [],
      })
    },

    editBlockFolder: (state, action) => {
      let blockFolderId = action.payload.id
      let property = action.payload.property
      let value = action.payload.value

      for (let i = 0; i < state.blocks.length; i++) {
        if (state.blocks[i].id === blockFolderId) {
          state.blocks[i][property] = value
        }
      }
    },

    deleteBlockFolder: (state, action) => {
      const elementIndex = state.blocks.findIndex(
        ({ id }) => id === action.payload.id
      )
      state.blocks.splice(elementIndex, 1)

      if (state.activeBlockAddFolderId === action.payload.id) {
        state.activeBlockId = state.blocks[0].blocks[0].id
        state.activeBlockFolderId = state.blocks[0].id
        state.preRenderedHTMLNodes = [
          state.blocks[0].blocks[0].preRenderedHTMLNodes,
        ]
        state.activeNodeId = state.preRenderedHTMLNodes?.[0]?.id
      }
    },

    addBlock: (state, action) => {
      for (let i = 0; i < state.blocks.length; i++) {
        if (
          state.blocks[i].id === state.activeBlockAddFolderId &&
          state.activeNodeId !== ''
        ) {
          state.blocks[i].blocks.push({
            id: uuidv4(),
            name: action.payload,
            preRenderedHTMLNodes: state.activeNodeObject,
            blocks: [],
          })
        } else {
          if (state.activeNodeId === '') {
            console.log("You didn't select any node to create a Block")
          }
        }
      }
    },

    editBlock: (state, action) => {
      let id = action.payload.id
      let property = action.payload.property
      let value = action.payload.value
      for (let i = 0; i < state?.blocks.length; i++) {
        for (let j = 0; j < state?.blocks[i]?.blocks?.length; j++) {
          if (state.blocks[i].blocks[j].id === id) {
            state.blocks[i].blocks[j][property] = value
          }
        }
      }
    },

    deleteBlock: (state, action) => {
      let id = action.payload.id
      for (let i = 0; i < state?.blocks.length; i++) {
        for (let j = 0; j < state?.blocks[i]?.blocks?.length; j++) {
          if (state?.blocks[i]?.blocks[j].id === id) {
            state.blocks[i].blocks.splice(j, 1)
          }
        }
      }
      state.activeBlockId = state.blocks[0].blocks[0].id
      state.activeBlockFolderId = state.blocks[0].id
      state.preRenderedHTMLNodes = [
        state.blocks[0].blocks[0].preRenderedHTMLNodes,
      ]
      state.activeNodeId = state.preRenderedHTMLNodes?.[0]?.id
    },

    setLayouts: (state, action) => {
      state.projectLayouts = action.payload
    },

    setActiveLayoutFolder: (state, action) => {
      state.activeLayoutFolder = action.payload
    },

    setActiveLayoutAddFolder: (state, action) => {
      state.activeLayoutAddFolder = action.payload
    },

    addLayout: (state, action) => {
      for (let i = 0; i < state.projectLayouts.length; i++) {
        if (
          state.projectLayouts[i].id === state.activeLayoutAddFolder &&
          state.activeNodeId !== ''
        ) {
          state.projectLayouts[i].items = [
            ...state.projectLayouts[i].items,
            {
              id: uuidv4(),
              name: action.payload,
              preRenderedHTMLNodes: state.activeNodeObject,
            },
          ]
        } else {
          if (state.activeNodeId === '') {
            console.log("You didn't select any node to create a Layout")
          }
        }
      }
    },

    editLayout: (state, action) => {
      let sectionId = action.payload.id
      let property = action.payload.property
      let value = action.payload.value
      for (let i = 0; i < state.projectLayouts.length; i++) {
        for (let j = 0; j < state.projectLayouts[i].items.length; j++) {
          if (state.projectLayouts[i].items[j].id === sectionId) {
            state.projectLayouts[i].items[j][property] = value
          }
        }
      }
    },

    duplicateLayout: (state, action) => {
      let sectionId = action.payload.id
      for (let i = 0; i < state.projectLayouts.length; i++) {
        for (let j = 0; j < state.projectLayouts[i].items.length; j++) {
          if (state.projectLayouts[i].items[j].id === sectionId) {
            let name = state.projectLayouts[i].items[j].name
            if (name.slice(-1).match('^[0-9]+$')) {
              const lastDigit = parseInt(name.slice(-1)) + 1
              name = name.slice(0, -1) + lastDigit
            } else {
              console.log(name)
              name = name.toString() + ' Copy'
              console.log(name)
            }
            state.projectLayouts[i].items.push({
              id: uuidv4(),
              name: name,
              preRenderedHTMLNodes:
                state.projectLayouts[i].items[j].preRenderedHTMLNodes,
            })
          }
        }
      }
    },

    deleteLayout: (state, action) => {
      let sectionId = action.payload.id
      for (let i = 0; i < state.projectLayouts.length; i++) {
        for (let j = 0; j < state.projectLayouts[i].items.length; j++) {
          if (state.projectLayouts[i].items[j].id === sectionId) {
            if (state.activeLayoutId === state.projectLayouts[i].items[j].id) {
              //[TODO] ADD WHAT HAPPEN IF THERE IS ONLY ONE LAYOUT
              state.activeLayoutFolder = state.projectLayouts[0].id
              state.activeLayoutId = state.projectLayouts[0].items[0].id
              state.preRenderedHTMLNodes = [
                state.projectLayouts[0].items[0].preRenderedHTMLNodes,
              ]
            }
            state.projectLayouts[i].items.splice(j, 1)
          }
        }
      }
    },

    editLayoutFolder: (state, action) => {
      let layoutFolderId = action.payload.id
      let property = action.payload.property
      let value = action.payload.value
      for (let i = 0; i < state.projectLayouts.length; i++) {
        if (state.projectLayouts[i].id === layoutFolderId) {
          state.projectLayouts[i][property] = value
        }
      }
    },

    deleteLayoutFolder: (state, action) => {
      let layoutFolderId = action.payload.id
      for (let i = 0; i < state.projectLayouts.length; i++) {
        if (state.projectLayouts[i].id === layoutFolderId) {
          if (state.activeLayoutFolder === state.projectLayouts[i].id) {
            //[TODO] ADD WHAT HAPPEN IF THERE IS ONLY ONE LAYOUT
            state.activeLayoutFolder = state.projectLayouts[0].id
          }

          state.projectLayouts.splice(i, 1)
        }
      }
    },

    addLayoutFolder: (state, action) => {
      state.projectLayouts = [
        ...state.projectLayouts,
        {
          id: uuidv4(),
          name: action.payload,
          items: [],
        },
      ]
    },

    setSwatches: (state, action) => {
      state.projectSwatches = action.payload
    },

    editSwatch: (state, action) => {
      const swatchId = action.payload.id
      const swatchName = action.payload.name
      const swatchColor = action.payload.color

      const swatchIndex = state.projectSwatches
        .map((x) => {
          return x.id
        })
        .indexOf(swatchId)

      if (swatchId !== undefined) {
        state.projectSwatches[swatchIndex].id = swatchId
      }

      if (swatchName !== undefined) {
        state.projectSwatches[swatchIndex].name = swatchName
      }

      if (swatchColor !== undefined) {
        state.projectSwatches[swatchIndex].color = swatchColor
      }

      updateGlobalCSS(state)
    },

    unlinkSwatch: (state, action) => {},

    addSwatch: (state, action) => {
      let id = uuidv4()
      if (action.payload.id !== undefined) {
        id = action.payload.id
      }
      state.projectSwatches.push({
        id: id,
        name: action.payload.name,
        color: action.payload.color,
      })
    },

    deleteSwatch: (state, action) => {
      const swatchId = action.payload.id
      let swatchValue = action.payload.value

      let swatchIndex = state.projectSwatches
        .map((x) => {
          return x.id
        })
        .indexOf(swatchId)
      state.projectSwatches.splice(swatchIndex, 1)

      function checkStyle(node, resolution, state, property) {
        if (
          node[getResolutionPathName(resolution.toString(), state)]?.[
            property
          ] ===
          '{{' + swatchId + '}}'
        ) {
          node[getResolutionPathName(resolution.toString(), state)][property] =
            swatchValue
        }
      }

      function checkStyleForAllStates(node, resolution, property) {
        checkStyle(node, resolution, 'default', property)
        checkStyle(node, resolution, 'hover', property)
      }

      function checkStyleForAllProperty(node, resolution) {
        checkStyleForAllStates(node, resolution, 'background-color')
        checkStyleForAllStates(node, resolution, 'color')
        checkStyleForAllStates(node, resolution, 'border-color')
      }

      function checkStyleForAllResolution(node) {
        for (let i = 0; i < 7; i++) {
          checkStyleForAllProperty(node, i.toString())
        }
      }

      function checkAllStyles() {
        state.preRenderedStyles.forEach((style) => {
          checkStyleForAllResolution(style)
          style.childrens.forEach((child) => {
            child.options.forEach((option) => {
              checkStyleForAllResolution(option)
            })
          })
        })
      }

      checkAllStyles()

      function updateNodes(nodes, resolution, state, property) {
        nodes.map((node) => {
          if (
            node?.styles?.[getResolutionPathName(resolution, state)]?.[
              property
            ] === `{{${swatchId}}}`
          ) {
            node.styles[getResolutionPathName(resolution, state)][property] =
              swatchValue
          }
          if (node.children) {
            updateNodes(node.children, resolution, state, property)
          }
        })
      }

      function checkInlineStyleForAllStates(nodes, resolution, property) {
        updateNodes(nodes, resolution, 'default', property)
        updateNodes(nodes, resolution, 'hover', property)
      }

      function checkInlineStyleForAllResolutions(nodes, property) {
        for (let i = 0; i < 7; i++) {
          checkInlineStyleForAllStates(nodes, i.toString(), property)
        }
      }

      function checkInlineStyleForAllProperties(nodes) {
        checkInlineStyleForAllResolutions(nodes, 'background-color')
        checkInlineStyleForAllResolutions(nodes, 'color')
        checkInlineStyleForAllResolutions(nodes, 'border-color')
      }

      updateNodesGlobally(state, checkInlineStyleForAllProperties)

      updateGlobalCSS(state)
    },

    setIsNodeSelectedFromNavigator: (state, action) => {
      state.isNodeSelectedFromNavigator = action.payload
    },

    setActiveHtmlNodeParentsPath: (state) => {
      state.activeNodeParentsPath = []
      let testPreRenderedHTMLNodes = _.cloneDeep(state.preRenderedHTMLNodes)

      let isParent = 1

      function findNode(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === state.activeNodeId) {
            nodes[i].isParent = 1
            isParent = 0
          } else {
            nodes[i].isParent = isParent
          }
          if (nodes[i].isParent === 1 && i > 0) {
            let j = i - 1
            nodes[j].isParent = 0
          }
          if (nodes[i].children) {
            findNode(nodes[i].children)
          }
        }
      }
      findNode(testPreRenderedHTMLNodes)

      function findNode2(nodes) {
        for (let i = 0; i < nodes?.length; i++) {
          const node = nodes[i]
          if (nodes[i].isParent === 1) {
            const nodeName =
              node?.symbolId === undefined
                ? node?.class[0]?.name !== undefined
                  ? node?.class[0]?.name
                  : node?.type
                : state.projectSymbols.find(({ id }) => id === node.symbolId)
                    ?.name
            state.activeNodeParentsPath.push({
              name: nodeName,
              id: nodes[i]?.id,
              type: nodes[i]?.type,
              class: nodes[i]?.class,
              cmscollectionid: nodes[i]?.cmsCollectionId,
              filterCurrent: nodes[i]?.filterCurrent,
            })
            if (nodes[i].children) {
              findNode2(nodes[i]?.children)
            }
          }
        }
      }
      findNode2(testPreRenderedHTMLNodes)

      let index = 0
      function findNode3(nodes) {
        for (let i = 0; i < nodes?.length; i++) {
          const node = nodes[i]
          if (node?.id === state.activeNodeParentsPath[index]?.id) {
            index++
            if (!state.isNodeSelectedFromNavigator && nodes[i].type !== 'sym') {
              console.log()
              nodes[i].expanded = true
            }
            if (nodes[i].children) {
              findNode3(nodes[i]?.children)
            }
          }
        }
      }
      if (state.activeTab === 'Navigator') {
        findNode3(state.preRenderedHTMLNodes)
      }

      function isPropertyHierarchical(property) {
        const hierarchicalProperties = [
          'font-family',
          'font-weight',
          'font-size',
          'line-height',
          'letter-spacing',
          'color',
          'text-align',
        ]
        let response = false
        hierarchicalProperties.forEach((item) => {
          if (item === property) {
            response = true
          }
        })
        return response
      }

      state.objectHierarchyStyles = []
      // console.log('start');

      state.activeNodeParentsPath.forEach((node, i) => {
        let mainStyleId = node?.class?.[0]?.id
        let activeStyles = state.preRenderedStyles?.find(
          ({ id }) => id === mainStyleId
        )

        const activeResolution = state.activeProjectResolution

        const listOfSubStyles = state.preRenderedStyles.find(
          ({ id }) => id === node?.class?.[0]?.id
        )?.childrens

        node?.class?.forEach((item, index) => {
          doForEachClass(item, index, 'default')
        })

        if (state.styleState === 'hover') {
          node?.class?.forEach((item, index) => {
            doForEachClass(item, index, 'hover')
          })
        }

        function doForEachClass(item, index, tempState) {
          let styleDefaultName = item.name
          if (index !== 0 && item.id !== '') {
            styleDefaultName = listOfSubStyles?.[index - 1]?.defaultName
            if (styleDefaultName !== undefined) {
              styleDefaultName =
                styleDefaultName.replaceAll(' ', '-').toLowerCase() +
                '-' +
                item.name
            }
          }

          function getStylesOf(resolution) {
            if (index === 0) {
              return activeStyles?.[resolution]
            } else if (item.id !== '') {
              return activeStyles?.childrens[index - 1]?.options.find(
                ({ id }) => id === item.id
              )?.[resolution]
            }
          }

          // console.log(state.activeProjectResolutionStylesListName);

          function isNodeLastInParentPath(i) {
            return i + 1 === state.activeNodeParentsPath.length
          }

          function pushStyles(resolution, styleState) {
            for (const [key, value] of Object.entries(
              getStylesOf(getResolutionPathName(resolution, styleState)) || {}
            )) {
              const styleNode = {
                style: key,
                value: value,
                isInline: false,
                isActive: false,
                origin: node.name,
                option: node.name !== item.name ? styleDefaultName : '',
                resolution: resolution,
                state: styleState,
              }

              if (
                state.objectHierarchyStyles.find((style) => style.style === key)
              ) {
                const sameObjectIndex = state.objectHierarchyStyles.findIndex(
                  (style) => style.style === key
                )
                state.objectHierarchyStyles.splice(sameObjectIndex, 1)
              }

              if (!isNodeLastInParentPath(i)) {
                if (isPropertyHierarchical(key)) {
                  state.objectHierarchyStyles.push(styleNode)
                }
              } else {
                if (item.id !== state.activeStyleId) {
                  state.objectHierarchyStyles.push(styleNode)
                } else {
                  if (
                    resolution === state.activeProjectResolution &&
                    styleState === state.styleState
                  ) {
                    styleNode.isActive = true
                  }
                  state.objectHierarchyStyles.push(styleNode)
                }
              }
            }
          }

          function pushInlineStyles(resolution, styleState) {
            if (
              state.activeNodeObject?.styles?.[
                getResolutionPathName(resolution, styleState)
              ] !== undefined
            ) {
              for (const [key, value] of Object.entries(
                state.activeNodeObject.styles[
                  getResolutionPathName(resolution, styleState)
                ]
              )) {
                if (
                  state.objectHierarchyStyles.find(
                    (style) => style.style === key
                  )
                ) {
                  const sameObjectIndex = state.objectHierarchyStyles.findIndex(
                    (style) => style.style === key
                  )
                  state.objectHierarchyStyles.splice(sameObjectIndex, 1)
                }

                state.objectHierarchyStyles.push({
                  style: key,
                  value: value,
                  isInline: true,
                  isActive: false,
                  origin: '',
                  option: '',
                  resolution: resolution,
                  state: 'default',
                })
              }
            }
          }

          let tempResolution = ''

          for (let j = 1; j <= 7; j++) {
            tempResolution = j.toString()
            isStyleContained(state.activeProjectResolution, tempResolution) &&
              pushStyles(tempResolution, tempState)
          }

          for (let j = 1; j <= 7; j++) {
            tempResolution = j.toString()
            isStyleContained(state.activeProjectResolution, tempResolution) &&
              pushInlineStyles(tempResolution, tempState)
          }
        }
      })
    },

    addUndoState: (state) => {
      if (state.preRenderedHTMLNodes.length > 0 && !state.undoActionActive) {
        if (state.activeUndoIndex > 1) {
          state.activeUndoIndex = 1
        }

        state.undoStates = [
          ...state.undoStates,
          {
            preRenderedHTMLNodes: state.preRenderedHTMLNodes,
            preRenderedStyles: state.preRenderedStyles,
          },
        ]

        if (state.undoStates.length > 10) {
          state.undoStates.splice(0, 1)
        }
      }
    },

    reUndoProject: (state) => {
      if (state.activeUndoIndex > 1) {
        state.activeUndoIndex--
        state.undoActionActive = true
        const activeUndoNode =
          state.undoStates[state.undoStates.length - state.activeUndoIndex]
        state.preRenderedHTMLNodes = activeUndoNode.preRenderedHTMLNodes
        state.preRenderedStyles = activeUndoNode.preRenderedStyles

        updateGlobalCSS(state)
      }
    },

    undoProject: (state) => {
      if (state.undoStates.length > state.activeUndoIndex + 1) {
        state.activeUndoIndex++
        state.undoActionActive = true
        const activeUndoNode =
          state.undoStates[state.undoStates.length - state.activeUndoIndex]
        state.preRenderedHTMLNodes = activeUndoNode.preRenderedHTMLNodes
        state.preRenderedStyles = activeUndoNode.preRenderedStyles

        updateGlobalCSS(state)
      }
    },

    setActionActiveFalse: (state) => {
      state.undoActionActive = false
    },

    setActiveProjectResolution: (state, action) => {
      state.activeProjectResolution = action.payload
    },

    updateResolutionPathName: (state) => {
      state.activeProjectResolutionStylesListName = getResolutionPathName(
        state.activeProjectResolution,
        state.styleState
      )
      updateGlobalCSS(state)
    },

    copyLayoutHtmlNodes: (state, action) => {
      state.copiedSectionNodes = action.payload
    },

    pasteLayoutHtmlNodes: (state) => {
      function editSectionNodesIds(nodes) {
        nodes.id = uuidv4()
        for (let i = 0; i < nodes.children.length; i++) {
          nodes.children[i].id = uuidv4()

          if (nodes.children[i].children.length > 0) {
            editSectionNodesIds(nodes.children[i])
          }
        }
      }
      editSectionNodesIds(state.copiedSectionNodes)

      function notContainsChildrens(node) {
        if (node.type === 'div' && node.children.length === 0) {
          return true
        } else {
          return false
        }
      }

      function findNode(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) {
            // console.log(id)
            // console.log(state.activeNodeId)
            if (notContainsChildrens(nodes[i])) {
              nodes[i].children.push(state.copiedSectionNodes)
            } else {
              nodes.splice(i + 1, 0, state.copiedSectionNodes)
            }
            break
          }
          if (nodes[i].children) {
            findNode(nodes[i].children, id)
          }
        }
      }

      if (state.keyboardNavigationOn) {
        findNode(state.preRenderedHTMLNodes, state.activeNodeId)
      }
    },

    setKeyboardNavigationOn: (state, action) => {
      state.keyboardNavigationOn = action.payload
    },

    setProjectFirebaseId: (state, action) => {
      state.projectFirebaseId = action.payload
    },

    setFavicon: (state, action) => {
      state.faviconImage = action.payload
    },

    saveProjectToFirebaseOffline: (state) => {
      async function saveProjectToFirebasePreRenderedNodesAndStyles() {
        const app = initializeApp(firebaseConfig)
        const db = getFirestore(app)
        await updateDoc(
          doc(db, 'projects', '75629c26-4f1b-4852-ae41-91ef3f7e905d'),
          {
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
          }
        )
      }
      updateNodesLists(state)
      console.log('Saved')
      saveProjectToFirebasePreRenderedNodesAndStyles()
    },

    saveProjectToFirebase: (state) => {
      if (!state.offlineMode) {
        async function saveProjectToFirebasePreRenderedNodesAndStyles() {
          const app = initializeApp(firebaseConfig)
          const db = getFirestore(app)
          await updateDoc(doc(db, 'projects', state.projectFirebaseId), {
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
        }
        updateNodesLists(state)
        saveProjectToFirebasePreRenderedNodesAndStyles()
      } else {
        let slug = state.offlineProjectName
        updateNodesLists(state)
        localStorage.setItem(slug + 'pages', JSON.stringify(state.projectPages))
        localStorage.setItem(
          slug + 'projectPageFolders',
          JSON.stringify(state.projectPageFolders)
        )
        localStorage.setItem(
          slug + 'projectPageFolderStructure',
          JSON.stringify(state.projectPageFolderStructure)
        )
        localStorage.setItem(
          slug + 'collections',
          JSON.stringify(state.collections)
        )
        localStorage.setItem(
          slug + 'preRenderedStyles',
          JSON.stringify(state.preRenderedStyles)
        )
        localStorage.setItem(
          slug + 'symbols',
          JSON.stringify(state.projectSymbols)
        )
        localStorage.setItem(
          slug + 'swatches',
          JSON.stringify(state.projectSwatches)
        )
        localStorage.setItem(
          slug + 'sections',
          JSON.stringify(state.projectLayouts)
        )
        localStorage.setItem(slug + 'blocks', JSON.stringify(state.blocks))
        localStorage.setItem(
          slug + 'styleGuide',
          JSON.stringify(state.styleGuide)
        )
      }
    },

    setSaveButtonStateText: (state, action) => {
      state.saveButtonStateText = action.payload
    },

    setActiveLayout: (state, action) => {
      updateNodesLists(state)
      state.nodesEditMode = 'layout'
      state.activeCollectionTemplateId = ''
      state.activePageId = ''

      state.activeLayoutId = action.payload.id
      state.activeLayoutFolder = action.payload.folderId

      updateNodesBasedOnList(state)
      state.activeNodeId = ''
    },

    setActiveBlock: (state, action) => {
      updateNodesLists(state)
      state.nodesEditMode = 'block'
      state.activeCollectionTemplateId = ''
      state.activePageId = ''

      state.activeBlockId = action.payload.id
      state.activeBlockFolderId = action.payload.folderId

      updateNodesBasedOnList(state)
      state.activeNodeId = state.preRenderedHTMLNodes[0].id
    },

    setActiveProjectTab: (state, action) => {
      if (state.activeTab === action.payload) {
        state.activeTab = ''
      } else {
        state.activeTab = action.payload
      }
    },

    setActiveProjectTabOn: (state, action) => {
      state.activeTab = action.payload
    },

    setActiveRightSidebarTab: (state, action) => {
      if (state.activeRightSidebarTab === action.payload) {
        state.activeRightSidebarTab = ''
      } else {
        state.activeRightSidebarTab = action.payload
      }
    },

    setActiveVersion: (state, action) => {
      let activeProjectVersion = state.projectVersions.find(
        ({ id }) => id === state.activeProjectVersionId
      )
      console.log(current(activeProjectVersion))
      activeProjectVersion.preRenderedHTMLNodes = state.preRenderedHTMLNodes
      activeProjectVersion.preRenderedStyles = state.preRenderedStyles

      state.activeProjectVersionId = action.payload
      activeProjectVersion = state.projectVersions.find(
        ({ id }) => id === state.activeProjectVersionId
      )
      state.preRenderedHTMLNodes = activeProjectVersion.preRenderedHTMLNodes
      state.preRenderedStyles = activeProjectVersion.preRenderedStyles

      updateGlobalCSS(state)
    },

    addVersion: (state) => {
      const versionId = uuidv4()
      if (state.projectVersions.length === 1) {
        state.projectVersions[0].preRenderedHTMLNodes =
          state.preRenderedHTMLNodes
        state.projectVersions[0].preRenderedStyles = state.preRenderedStyles
      }
      state.projectVersions.push({
        id: versionId,
        preRenderedHTMLNodes: state.preRenderedHTMLNodes,
        preRenderedStyles: state.preRenderedStyles,
      })
      state.activeProjectVersionId = versionId
    },

    clearVersions: (state) => {
      state.projectVersions = [{ id: '1' }]
      state.activeProjectVersionId = '1'
    },
    // Add next reducers here

    setIsSettingsModalOpen: (state, action) => {
      state.isSettingsModalOpen = action.payload
    },

    setProjectSettingsData: (state, action) => {
      state.projectSettingsData = action.payload
    },

    /* Style Guide */

    setStyleGuide: (state, action) => {
      state.styleGuide = action.payload || []
    },

    addStyleGuideFolder: (state, action) => {
      state.styleGuide.push({
        id: uuidv4(),
        name: action.payload.name,
        items: [],
      })
    },

    editStyleGuideFolder: (state, action) => {
      const folder = state.styleGuide.find(
        (folder) => folder.id === action.payload.id
      )
      folder.name = action.payload.name
    },

    deleteStyleGuideFolder: (state, action) => {
      state.styleGuide = state.styleGuide.filter(
        (folder) => folder.id !== action.payload.id
      )
    },

    moveStyleGuideFolder: (state, action) => {
      const { id, direction } = action.payload
      const oldIndex = state.styleGuide.findIndex((folder) => folder.id === id)

      console.log(oldIndex)
      console.log(direction)
      let newIndex = oldIndex + 1
      if (direction === 'up') {
        newIndex = oldIndex - 1
      }
      console.log(newIndex)
      const folder = state.styleGuide[oldIndex]
      state.styleGuide.splice(oldIndex, 1)
      state.styleGuide.splice(newIndex, 0, folder)
    },

    addStyleGuideItem: (state, action) => {
      state.styleGuide
        .find(({ id }) => id === action.payload.folderId)
        .items.push({
          id: uuidv4(),
          name: action.payload.name,
          classId: action.payload.styleId,
          optionId: action.payload.optionId,
          optionVersionId: action.payload.optionVersionId,
          styles: [],
        })
    },

    editStyleGuideItem: (state, action) => {
      const item = state.styleGuide
        .find(({ id }) => id === action.payload.folderId)
        .items.find(({ id }) => id === action.payload.id)
      item.name = action.payload.name
    },

    deleteStyleGuideItem: (state, action) => {
      state.styleGuide.find(({ id }) => id === action.payload.folderId).items =
        state.styleGuide
          .find(({ id }) => id === action.payload.folderId)
          .items.filter(({ id }) => id !== action.payload.id)
    },

    moveStyleGuideItem: (state, action) => {
      const { id, folderId, direction } = action.payload
      const oldIndex = state.styleGuide
        .find(({ id }) => id === folderId)
        .items.findIndex((item) => item.id === id)

      console.log(oldIndex)
      console.log(direction)
      let newIndex = oldIndex + 1
      if (direction === 'up') {
        newIndex = oldIndex - 1
      }
      console.log(newIndex)
      const item = state.styleGuide.find(({ id }) => id === folderId).items[
        oldIndex
      ]
      state.styleGuide
        .find(({ id }) => id === folderId)
        .items.splice(oldIndex, 1)
      state.styleGuide
        .find(({ id }) => id === folderId)
        .items.splice(newIndex, 0, item)
    },

    addStyleGuideItemStyle: (state, action) => {
      state.styleGuide
        .find(({ id }) => id === action.payload.folderId)
        .items.find(({ id }) => id === action.payload.itemId)
        .styles.push({
          id: uuidv4(),
          name: action.payload.name,
        })
    },

    deleteStyleGuideItemStyle: (state, action) => {
      const { folderId, itemId, propertyId } = action.payload
      let propertyStyles = state.styleGuide
        .find(({ id }) => id === folderId)
        .items.find(({ id }) => id === itemId).styles
      const index = propertyStyles.findIndex(({ id }) => id === propertyId)
      propertyStyles.splice(index, 1)
    },

    setIsAltPressed: (state, action) => {
      state.isAltPressed = action.payload
    },

    setIsShiftPressed: (state, action) => {
      state.isShiftPressed = action.payload
    },

    setIsKeyAPressed: (state, action) => {
      state.isKeyAPressed = action.payload
    },
  },
})

export const {
  /* Collections */
  setCollections,
  addCollection,
  editCollection,
  deleteCollection,
  setActiveCollection,
  addCollectionItem,
  setActiveCollectionItem,
  editCollectionItem,
  deleteCollectionItem,
  archiveCollectionItem,
  unArchiveCollectionItem,
  duplicateCollectionItem,
  editCollectionItemName,
  addCollectionField,
  editCollectionField,
  deleteCollectionField,
  setActiveCollectionTemplate,
  setActiveCollectionItemTemplate,
  setCollectionPanelState,
  setActiveClickedCmsItemIndex,
  setActiveHoveredCmsItemIndex,
  setActiveSettingsCollectionId,
  setActiveSettingsCollectionFieldId,

  // [add] deleteCollection

  /* Symbols */
  setSymbols,
  addSymbol,
  editSymbolName,
  deleteSymbol,
  addSymbolToProject,
  makeSymbolEditable,
  editSymbolNodes,
  editSymbolsClickableArea,
  setActiveSymbolConnections,

  /* Pages */
  setPages,
  setPageFolders,
  setPagesNestedStructure,
  addPage,
  editPage,
  deletePage,
  setActivePage,
  addPageFolder,
  deletePageFolder,
  editPageFolder,
  openPageSettings,
  closePageSettings,
  setDraggedPage,
  setDragOverPage,
  moveDraggedPaged,
  togglePageFolderExpandState,

  /* Styles */
  setStyles,
  addStyle,
  renameStyle,
  editStyleProperty,
  editDefinedStyleProperty,
  assignInlineStylePropertyToClass,
  assignAllInlineStylesToClass,
  deleteStyleProperty,
  deleteStylePropertyInDefinedStyle,
  addStyleOption,
  editStyleOption,
  removeStyleOption,
  deleteStyleOption,

  editStyleSubOption,
  deleteStyleSubOption,

  setActiveNodeComputedStyles,
  editActiveStyleProperties,
  setActiveStyleOptionIndex,
  setActiveStyleId,
  updateActiveStyleListAndId,
  setStyleState,

  /* Html */
  setHtmlNodes,
  addHtmlNode,
  editHtmlNode,
  addFunctionToHtmlNode,
  addDataToHtmlNode,
  moveHtmlNode,
  setHtmlNodesWithoutExpandedState,
  copyHtmlNodes,
  pasteHtmlNodes,
  deleteHtmlNode,
  deleteActiveHtmlNode,
  deleteActiveHtmlNodeShortcut,
  setActiveHtmlNode,
  setHoveredHtmlNode,
  setGlobalActiveHtmlNode,
  toggleHtmlNodeExpandedState,
  setNodesEditMode,
  setDraggedNavigatorNodes,
  setDraggedOverNavigatorItemId,
  dropDraggedNavigatorNodes,
  setNavigatorItemDragBehindState,
  setIsActiveHtmlNodeParentDisplayFlex,
  setNodeProperty,
  setActiveHtmlNodeRepeatableState,
  setActiveHtmlFilterCurrentState,
  setActiveHtmlNodeParentClassJoinState,
  addActiveHtmlNodeBlockFolders,
  setActiveHtmlNodeLink,
  setActiveHtmlNodeParentsPath,
  handleArrowNodesNavigation,
  setActiveHtmlNodeStyleOption,
  removeActiveHtmlNodeStyle,
  deleteActiveHtmlNodeInlineStyleProperty,
  addSpanToText,

  /* Layouts */
  setLayouts,
  addLayout,
  deleteLayout,
  editLayout,
  duplicateLayout,
  addLayoutFolder,
  editLayoutFolder,
  deleteLayoutFolder,
  setActiveLayout,
  setActiveLayoutFolder,
  setActiveLayoutAddFolder,
  copyLayoutHtmlNodes,
  pasteLayoutHtmlNodes,

  /* Blocks */
  setBlocks,
  addBlock,
  editBlock,
  setActiveBlock,
  deleteBlock,
  addBlockFolder,
  editBlockFolder,
  deleteBlockFolder,
  setActiveBlockAddFolderId,
  setActiveBlockFolderId,
  asignBlockFolderToNodes,
  asignBlockFolderToNodesWithOptions,

  /* Undo */
  undoProject,
  reUndoProject,
  setActionActiveFalse, // [to-do] avoid hacks
  addUndoState,

  /* Swatches */
  setSwatches,
  addSwatch,
  editSwatch,
  deleteSwatch,

  /* Versions */
  addVersion,
  clearVersions,
  setActiveVersion,

  /* Firebase */
  saveProjectToFirebase,
  saveProjectToFirebaseOffline,
  setProjectFirebaseId,

  /* Others */
  setIsNodeSelectedFromNavigator, // [to-do] propably no longer needed
  updateStateOnScroll,
  setActiveProjectTab,
  setActiveProjectTabOn,
  setKeyboardNavigationOn,
  setProjectPopUp,
  setProjectMode,
  setSaveButtonStateText,
  setActiveRightSidebarTab,
  setActiveProjectResolution,
  updateResolutionPathName,
  setIsSettingsModalOpen,
  setProjectSettingsData,
  setFavicon,
  setIsAltPressed,
  setIsKeyAPressed,
  setIsShiftPressed,

  /* Style Guide */
  setStyleGuide,
  addStyleGuideFolder,
  editStyleGuideFolder,
  deleteStyleGuideFolder,
  moveStyleGuideFolder,
  addStyleGuideItem,
  editStyleGuideItem,
  deleteStyleGuideItem,
  moveStyleGuideItem,
  addStyleGuideItemStyle,
  deleteStyleGuideItemStyle,
} = projectSlice.actions

export default projectSlice.reducer
