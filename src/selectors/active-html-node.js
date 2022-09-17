import { createSelector } from 'reselect';
import { findActiveNode } from '../utils/nodes-editing';

const preRenderedHTMLNodes = state => state.designerProjectState.preRenderedHTMLNodes;
const activeNodeId = state => state.designerProjectState.activeNodeId;

export const activeHTMLNode = createSelector(
    [preRenderedHTMLNodes, activeNodeId],
    (preRenderedHTMLNodes, activeNodeId) => { 
       return findActiveNode(preRenderedHTMLNodes, activeNodeId)
    }
);

findNode(state.preRenderedHTMLNodes, state.activeNodeId);