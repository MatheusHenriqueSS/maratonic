import { ChangeEvent } from 'react'
import {useEditor} from '../useEditor'
import styles from './InputArea.module.css'

export function InputArea() {
    const {handleChangeRawInputedText} = useEditor()

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        handleChangeRawInputedText(e.target.value)
    }

    return (
        <div className={styles.container}>
        <h1 className="title">Enter Markdown</h1>
        <textarea 
            onChange={handleTextAreaChange} 
            className={styles['text-input']}
            name="raw-area" 
            placeholder='Enter your markdown here...'
            autoFocus
        >
        </textarea>
        </div>
    )
}