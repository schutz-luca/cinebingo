import { useEffect, useState } from 'react'
import './App.css'
import { ContentService } from './api'
import { Content } from './@types/content.type'
import { getRandomItems } from './utils/getRandomItens'
import { categoryLabels } from './utils/translate'

export type ContentView = Omit<Content, 'name'>;

interface BoardItem {
  category: keyof ContentView;
  value: string;
}

function App() {
  // Skipable options
  const [skipableContent, setSkipableContent] = useState<any[]>([]);
  const [board, setBoard] = useState<BoardItem[]>();
  const [overReport, setOverReport] = useState<{ optionsUsed: number, win: boolean, points: number }>();
  const [points, setPoints] = useState(0);

  // Skipable option position
  const [currentIndex, setCurrentIndex] = useState(0);

  // Already clicked board options
  const [clickedContent, setClickedContent] = useState<{ index: number, correct: boolean }[]>([]);

  const currentContent = skipableContent[currentIndex];

  const next = () => {
    setCurrentIndex(currentIndex + 1);
  }

  const generateBoard = (content: ContentView[]) => {
    const selectedContent = getRandomItems<ContentView>(content, 9);

    return selectedContent.map(item => {
      // Check if open has empty awards
      let deleteAwards = false;
      if (!item.awards?.length) deleteAwards = true;

      // Remove name from board view categories
      let keys = Object.keys(item).filter(key => key !== 'name');

      // If it's empty remove it
      if (deleteAwards) keys = keys.filter(key => key !== 'awards');

      // Select a random category
      const selectedCategory = getRandomItems(keys, 1)[0] as unknown as keyof ContentView;

      // Find the corresponding category value
      const value = item[selectedCategory];

      // If the option is an array, select a random value
      const selectedValue = Array.isArray(value) ? getRandomItems(value, 1)[0] : value;

      return {
        category: selectedCategory,
        value: selectedValue
      }
    })
  }

  const clickContent = (boardItem: BoardItem, index: number) => {
    // Check if the answear was correct
    const correct = currentContent[boardItem.category] == boardItem.value || currentContent[boardItem.category].includes(boardItem.value);

    // Add item to clicked content list
    setClickedContent([
      ...clickedContent,
      {
        index,
        correct
      }
    ]);

    // Pass the current content
    next();
  }

  const addClickedStyle = (index: number) => {
    const clickedItem = clickedContent.filter(({ index: currentIndex }) => currentIndex === index)[0];

    if (clickedItem) return `${clickedItem.correct ? ' correct' : ' wrong'}`;
    else return ''
  }

  useEffect(() => {
    // Fetch content
    const allContent = ContentService.getContent();

    // Generate board
    const board = generateBoard(allContent);

    // Select skipable options
    const selectedContent = getRandomItems<Content>(allContent, allContent.length);

    setSkipableContent(selectedContent);
    setBoard(board);
  }, []);

  useEffect(() => {
    if (!board) return;

    const points = clickedContent.filter(item => item.correct).length * 200 - currentIndex * 5;
    setPoints(points);

    // Check if all board options was clicked
    if (clickedContent.length === board.length) {
      // Set win only if every clicked option was correct
      const win = clickedContent.every(item => item.correct);
      setOverReport({
        win,
        points,
        optionsUsed: currentIndex,
      })
      return;
    }

    // Set lose if the current position equals skipable content count
    if (currentIndex === skipableContent.length) {
      setOverReport({
        win: false,
        points,
        optionsUsed: currentIndex,
      })
    }
  }, [currentIndex]);

  console.log(overReport)

  return (
    <div className='container'>
      <h1>CINEBINGO 🎬</h1>
      {!overReport ?
        < div className='current-content'>
          <b>{currentContent?.name}</b>
          <button onClick={next}>skip</button>
        </div>
        :
        <div className='over-report'>
          <h2>{overReport.win ? 'You Won! 🎉' : 'Game Over... 👾'}</h2>
          <h3>{overReport.points} points</h3>
          <p>Options Used: {overReport.optionsUsed}</p>
        </div>
      }

      {
        !board ?
          <div>'Board loading...' </div>
          :
          <>
            {!overReport &&
              <>
                <h3>
                  {points} points
                </h3>
                <div className='board'>
                  {board.map((item, index) => (
                    <button
                      className={`board-item${addClickedStyle(index)}`}
                      onClick={() => clickContent(item, index)}
                      disabled={!!addClickedStyle(index)}
                    >
                      <h4>{categoryLabels.pt[item.category]}</h4>
                      <p>{item.value}</p>
                    </button>
                  ))}
                </div>
              </>
            }

          </>
      }
    </div >
  )
}

export default App
