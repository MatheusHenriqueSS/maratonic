import { MarkdownArea } from "../MarkdownArea/MarkdownArea";
import { InputArea } from "../InputArea/InputArea";
import styles from "./Template.module.css";

export function Template() {
    return (
        <main className={styles.container}>
            <InputArea />
            <MarkdownArea />
        </main>
    )
}