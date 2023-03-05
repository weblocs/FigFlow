import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../../../ui/Input'
import BlockItem from './BlockItem'

export default function BlocksList({ listIsOpened, setListIsOpened }) {
  const blocks = useSelector((state) => state.project.blocks)

  const dispatch = useDispatch()
  const inputRef = useRef(null)

  const [inputText, setInputText] = useState('')
  const [blocksList, setBlocksList] = useState(blocks)

  function handleInput() {
    setInputText(inputRef.current.value)
    let tempBlocks = []
    blocks.filter((folder) => {
      folder.blocks.filter((item) => {
        if (item.name.includes(inputRef.current.value)) {
          tempBlocks.push({
            item,
            folder: { id: folder.id, name: folder.name },
          })
        }
      })
    })
    setBlocksList(tempBlocks)
    console.log(tempBlocks)
  }

  useEffect(() => {
    handleInput()
  }, [blocks])

  useEffect(() => {
    if (listIsOpened) {
      inputRef.current.focus()
      inputRef.current.value = ''
    }
  }, [listIsOpened])

  return (
    <div
      className={
        'heading-element-settings_list block-list ' +
        (listIsOpened ? 'active' : '')
      }
    >
      <div className="px-10 py-10">
        <Input useRef={inputRef} onInput={handleInput} />

        {/* {blocks.map((item) => (
          <BlockItem
            item={item}
            key={item.id}
            inputText={inputText}
            closeTab={() => setListIsOpened(false)}
          />
        ))} */}
      </div>

      {blocks?.map((folder) => (
        <div className="block-list_folder" key={folder.id}>
          <div className="blocks-list_name">{folder.name}</div>
          <div className="block-list_grid">
            {folder.blocks.map((item) => (
              <BlockItem
                item={item}
                key={item.id}
                inputText={inputText}
                closeTab={() => setListIsOpened(false)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
