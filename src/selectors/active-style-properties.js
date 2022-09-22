import { createSelector } from 'reselect';

const activeStyleId = state => state.project.activeStyleId;
const stylesInActiveNode = state => state.project.stylesInActiveNode;
const preRenderedStyles = state => state.project.preRenderedStyles;
const activeStyleIndex = state => state.project.activeStyleIndex;
const activeStyleOptionIndex = state => state.project.activeStyleOptionIndex;
const activeProjectResolutionStylesListName = state => state.project.activeProjectResolutionStylesListName;

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