import DOMPurify from "dompurify"
import ReactHtmlParser from "react-html-parser"
import { useRef, useState } from "react"
import "./index.css"

const App = () => {
  const [addWord, setAddWord] = useState(false)
  const [data, setData] = useState<string[]>([])

  const input = useRef<HTMLInputElement>(null)

  function inputValidation() {
    if (input.current) {
      const newWord = `<div class="bg-vio-light h-5r pad-2r">${input.current.value}</div>`
      const sanitizedData = DOMPurify.sanitize(newWord)
      setData([...data, sanitizedData])
      setAddWord(false)
      return sanitizedData
    }
  }

  return (
    <>
      <h1>Your best vocabulary</h1>
      <button onClick={() => setAddWord(true)}>Add word</button>
      {addWord && (
        <div className="dialog-overlay">
          <dialog open className="bg-vio-mid border-0 border-r-10p pad-2r">
            <p className="fsize-20p">Now let's add your first word!</p>
            <div className="flex j-center a-center gap-20p">
              <input
                type="text"
                ref={input}
                className="border-3 border-vio-dark border-r-10p pad-1r outline-n fsize-1r bg-vio-light"
                placeholder="New epic word"
              />
              <input
                type="text"
                ref={input}
                className="border-3 border-vio-dark border-r-10p pad-1r outline-n fsize-1r bg-vio-light"
                placeholder="In your native language"
              />
              <button
                className="border-0 border-r-10p pad-1r bg-vio-dark"
                onClick={() => inputValidation()}
              >
                Add
              </button>
            </div>
          </dialog>
        </div>
      )}
      <div className="flex j-center a-center flex-w-wrap gap-20p">
        {ReactHtmlParser(data.join(""))}
      </div>
    </>
  )
}

export default App
