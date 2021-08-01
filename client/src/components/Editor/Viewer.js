import React from 'react'
import { Editor, EditorState, convertFromRaw } from "draft-js";

function Viewer(props) {
    const {content}=props;
    const storedcontent=convertFromRaw(JSON.parse(content))
    const editorState = EditorState.createWithContent(storedcontent);
    return (
        <Editor editorState={editorState} readOnly={true} />

    )
}

export default Viewer
