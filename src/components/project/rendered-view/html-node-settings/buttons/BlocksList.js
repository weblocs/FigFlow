import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useKeyboardShortcut from 'use-keyboard-shortcut'
import {
  copyLayoutHtmlNodes,
  pasteLayoutHtmlNodes,
} from '../../../../../features/project'
import Input from '../../../../ui/Input'
import BlockItem from './BlockItem'

export default function BlocksList({ listIsOpened, setListIsOpened }) {
  const blocks = useSelector((state) => state.project.blocks)

  const dispatch = useDispatch()
  const inputRef = useRef(null)

  const [inputText, setInputText] = useState('')
  const [blocksList, setBlocksList] = useState(blocks)
  const [activeIndex, setActiveIndex] = useState(0)

  function handleInput() {
    setInputText(inputRef.current.value)
    let tempBlocks = []
    if (inputRef.current.value !== '') {
      setActiveIndex(0)
      blocks.filter((folder) => {
        folder.blocks.filter((item) => {
          if (
            item.name
              .toLowerCase()
              .includes(inputRef.current.value.toLowerCase())
          ) {
            tempBlocks.push({
              item,
              folder: { id: folder.id, name: folder.name },
            })
          }
        })
      })
      setBlocksList(tempBlocks)
    } else {
      setBlocksList([])
    }
  }

  useEffect(() => {
    handleInput()
  }, [blocks])

  useEffect(() => {
    if (listIsOpened) {
      inputRef.current.focus()
      inputRef.current.value = ''
      setBlocksList([])
    }
  }, [listIsOpened])

  const { enterShortcut } = useKeyboardShortcut(
    ['Enter'],
    (shortcutKeys) => {
      if (!listIsOpened || blocksList.length === 0) {
      } else {
        dispatch(
          copyLayoutHtmlNodes(blocksList[activeIndex].item.preRenderedHTMLNodes)
        )
        setTimeout(() => {
          dispatch(pasteLayoutHtmlNodes())
        }, 1)
        setListIsOpened(false)
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  )

  const { upShortcut } = useKeyboardShortcut(
    ['ArrowUp'],
    (shortcutKeys) => {
      if (!listIsOpened || blocksList.length === 0) {
      } else {
        setActiveIndex((prev) => {
          if (prev === 0) {
            return 0
          } else {
            return prev - 1
          }
        })
        console.log(activeIndex)
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  )

  const { downShortcut } = useKeyboardShortcut(
    ['ArrowDown'],
    (shortcutKeys) => {
      if (!listIsOpened || blocksList.length === 0) {
      } else {
        setActiveIndex((prev) => {
          if (prev === blocksList.length - 1) {
            return blocksList.length - 1
          } else {
            return prev + 1
          }
        })
        console.log(activeIndex)
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  )

  return (
    <div
      className={
        'heading-element-settings_list block-list ' +
        (listIsOpened ? 'active' : '')
      }
    >
      <div className="px-10 py-10">
        <Input useRef={inputRef} onInput={handleInput} />

        {listIsOpened &&
          blocksList.length !== 0 &&
          blocksList.map((item, index) => (
            <BlockItem
              index={index}
              activeIndex={activeIndex}
              item={item.item}
              key={item.item.id}
              closeTab={() => setListIsOpened(false)}
            />
          ))}
      </div>

      {listIsOpened &&
        blocksList.length === 0 &&
        blocks?.map((folder) => (
          <div className="block-list_folder" key={folder.id}>
            <div className="blocks-list_name">{folder.name}</div>
            <div className="block-list_grid">
              {folder.blocks.map((item) => (
                <BlockItem
                  item={item}
                  key={item.id}
                  closeTab={() => setListIsOpened(false)}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}
