import { createSelector } from 'reselect'

const collections = (state) => state.project.collections
const activeCollectionIndex = (state) => state.project.activeCollectionIndex
const activeCollectionItemIndex = (state) =>
  state.project.activeCollectionItemIndex

export const activeCollectionSelector = createSelector(
  [collections, activeCollectionIndex],
  (collections, activeCollectionIndex) => {
    return collections[activeCollectionIndex]
  }
)

export const activeCollectionItemSelector = createSelector(
  [collections, activeCollectionIndex, activeCollectionItemIndex],
  (collections, activeCollectionIndex, activeCollectionItemIndex) => {
    return collections[activeCollectionIndex]?.items[activeCollectionItemIndex]
  }
)
