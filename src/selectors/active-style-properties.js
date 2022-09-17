import { createSelector } from 'reselect';

const activeStyleId = state => state.designerProjectState.activeStyleId;
const stylesInActiveNode = state => state.designerProjectState.stylesInActiveNode;
const preRenderedStyles = state => state.designerProjectState.preRenderedStyles;
const activeStyleIndex = state => state.designerProjectState.activeStyleIndex;
const activeStyleOptionIndex = state => state.designerProjectState.activeStyleOptionIndex;
const activeProjectResolutionStylesListName = state => state.designerProjectState.activeProjectResolutionStylesListName;

export const activeStyleProperties = createSelector(
    [activeStyleId, stylesInActiveNode, preRenderedStyles, activeStyleIndex, activeStyleOptionIndex, activeProjectResolutionStylesListName],
    (activeStyleId, stylesInActiveNode, preRenderedStyles, activeStyleIndex, activeStyleOptionIndex, activeProjectResolutionStylesListName) => { 
        if(activeStyleId === stylesInActiveNode?.[0]?.id) {
            return preRenderedStyles[activeStyleIndex]?.styles;
        } else {
            return preRenderedStyles?.find(({id}) => id === stylesInActiveNode?.[0]?.id)?.childrens[activeStyleOptionIndex]?.options.find(({id}) => id === activeStyleId)?.[activeProjectResolutionStylesListName];
        }
    }
);