import { useRef, useState } from "react"
import "./index.css"

interface WordData {
  word: string
  meaning: string
}

const App = () => {
  // example array
  const exampleArray = [
    { word: "hello", meaning: "Привіт" },
    { word: "hello", meaning: "Привіт" }
  ]
  // states
  const [showModal, setShowModal] = useState<boolean>(false)
  const [data, setData] = useState<WordData[]>(exampleArray)

  // refs
  const inputWord = useRef<HTMLInputElement | null>(null)
  const inputMeaning = useRef<HTMLInputElement | null>(null)

  // functions
  function refreshWords() {
    setShowModal(false)
    setData((prevData) => [
      ...prevData,
      { word: inputWord.current!.value, meaning: inputMeaning.current!.value }
    ])
  }

  return (
    <>
      <h1>Your best vocabulary</h1>
      <button
        className="border-1 border-vio-dark border-r-5p pad-1r bg-vio-dark"
        onClick={() => setShowModal(true)}
      >
        Add word
      </button>

      {showModal && (
        <div className="flex-center bg-black-75 pos-fix left-0 top-0 w-maxprc h-maxprc z-10">
          <dialog open className="bg-vio-mid border-0 border-r-5p pad-2r class">
            <p className="fsize-20p">Now let's add your first word!</p>
            <div className="flex j-center a-center gap-20p">
              <input
                type="text"
                ref={inputWord}
                className="border-1 border-r-5p pad-1r outline-n fsize-1r bg-vio-light"
                placeholder="New epic word"
              />
              <input
                type="text"
                ref={inputMeaning}
                className="border-1 border-r-5p pad-1r outline-n fsize-1r bg-vio-light"
                placeholder="What does it means?"
              />
              <button className="border-r-5p pad-1r bg-vio-dark" onClick={() => refreshWords()}>
                Add
              </button>
            </div>
          </dialog>
        </div>
      )}
      <div className="flex-center flex-w-wrap gap-20p mar-t-2r">
        {data.map((item, index) => (
          <div key={index} className="flex-center flex-d-col bg-vio-light h-5r pad-2r">
            <p className="mar-0 fsize-20p"> {item.word} </p>
            <p className="mar-0 fsize-08r"> {item.meaning} </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
