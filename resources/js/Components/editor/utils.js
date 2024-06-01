import { EditorState, RichUtils } from "draft-js";

export const forceSelection = (editorState) => {
    if (!editorState) {
        console.error("editorState is undefined in forceSelection");
        return editorState;
    }
    return EditorState.forceSelection(editorState, editorState?.getSelection());
};

// focus block key
export const getFocusedBlockKey = (editorState) => {
    if (!editorState) {
        console.error("editorState is undefined in getFocusedBlockKey");
        return null;
    }
    const selection = editorState?.getSelection();
    const focusKey = selection.getFocusKey();
    return focusKey;
};

// focused block
export const getFocusedBlock = (editorState) => {
    if (!editorState) {
        console.error("editorState is undefined in getFocusedBlock");
        return null;
    }
    const contentState = editorState?.getCurrentContent();
    const focusKey = getFocusedBlockKey(editorState);
    if (!focusKey) {
        console.error("focusKey is undefined in getFocusedBlock");
        return null;
    }
    const focusedBlock = contentState?.getBlockForKey(focusKey);
    return focusedBlock;
};

// check style is active
export const isStyleActive = (editorState, style) => {
    if (!editorState) {
        console.error("editorState is undefined in isStyleActive");
        return false;
    }
    const currentStyle = editorState?.getCurrentInlineStyle();
    return currentStyle.has(style);
};

// active block
export const isActiveBlock = (editorState, block) => {
    if (!editorState) {
        console.error("editorState is undefined in isActiveBlock");
        return false;
    }
    const currentBlock = RichUtils.getCurrentBlockType(editorState);
    return currentBlock === block;
};

// toggle blocks
export const toggleBlock = (editorState, onChange, block) => {
    if (!editorState) {
        console.error("editorState is undefined in toggleBlock");
        return editorState;
    }
    const state = forceSelection(editorState);
    return onChange(RichUtils.toggleBlockType(state, block));
};

// apply style
export const toggleStyle = (editorState, onChange, style) => {
    if (!editorState) {
        console.error("editorState is undefined in toggleStyle");
        return editorState;
    }
    // force focus
    const state = forceSelection(editorState);

    // check user select any text if true toggle style or add style
    return onChange(RichUtils.toggleInlineStyle(state, style));
};
