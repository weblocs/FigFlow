import { createSelector } from 'reselect';
import { findActiveNode } from '../utils/nodes-editing';

const preRenderedHTMLNodes = state => state.project.preRenderedHTMLNodes;
const activeNodeId = state => state.project.activeNodeId;

export const activeHTMLNode = createSelector(
    [preRenderedHTMLNodes, activeNodeId],
    (preRenderedHTMLNodes, activeNodeId) => { 
       return findActiveNode(preRenderedHTMLNodes, activeNodeId)
    }
);