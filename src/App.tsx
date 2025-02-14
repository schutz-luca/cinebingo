import { isEqual } from 'lodash'
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
  checked: 'correct' | ''
}

function App() {
  // Skipable options
  const [skipableContent, setSkipableContent] = useState<any[]>([]);
  const [board, setBoard] = useState<BoardItem[]>();
  const [overReport, setOverReport] = useState<{ optionsUsed: number, win: boolean, points: number }>();
  const [points, setPoints] = useState(0);

  // Skipable option position
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentContent = skipableContent[currentIndex];

  const next = () => {
    setCurrentIndex(currentIndex + 1);
  }

  const skip = () => {
    next();
  }

  const selectCategoryFromContent = (item: ContentView, selectedCategories: BoardItem[]) => {
    // Remove name from board view categories
    let keys = Object.keys(item).filter(key => key !== 'name');

    // Check and remove if there's empty awards
    if (!item.awards?.length) keys = keys.filter(key => key !== 'awards');

    // Select a random category
    const selectedKey = getRandomItems(keys, 1)[0] as unknown as keyof ContentView;

    // Find the corresponding category value
    const value = item[selectedKey];

    // If the option is an array, select a random value
    const selectedValue = Array.isArray(value) ? getRandomItems(value, 1)[0] : value;

    let selectedCategory = {
      category: selectedKey,
      value: selectedValue,
      checked: ''
    } as BoardItem

    // Prevent board from having equals options
    if (!selectedCategories.some(item => isEqual(item, selectedCategory)))
      selectedCategories.push(selectedCategory);
    else
      selectCategoryFromContent(item, selectedCategories);
  }

  const generateBoard = (content: ContentView[]) => {
    const selectedContent = getRandomItems<ContentView>(content, 9);

    const selectedCategories: BoardItem[] = [];

    selectedContent.map(item => selectCategoryFromContent(item, selectedCategories));

    return selectedCategories;
  }

  const clickContent = (boardItem: BoardItem, index: number) => {
    if (!board) return;

    // Check if the answear was correct
    const correct = currentContent[boardItem.category] == boardItem.value || currentContent[boardItem.category].includes(boardItem.value);

    if (correct) setBoard(board.map((item, currentIndex) => {
      if (currentIndex === index) return { ...item, checked: 'correct' }
      else return item
    }))
    else skipableContent.pop();

    // Pass the current content
    next();
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

  // Rounds control
  useEffect(() => {
    if (!board) return;

    // Update points
    const points = board.filter(item => item.checked === 'correct').length * 200;
    setPoints(points);

    // Set lose if the current position equals skipable content count
    if (currentIndex >= skipableContent.length) {
      // Set win only if every clicked option was correct
      const win = board.every(item => item.checked === 'correct');
      setOverReport({
        win,
        points,
        optionsUsed: currentIndex,
      })
    }
  }, [currentIndex]);

  return (
    <div className='container'>
      <h1>CINEBINGO 🎬</h1>
      {!overReport ?
        <div className='current-content'>
          <small>Faltam {skipableContent.length - currentIndex}</small>
          <h2>{currentContent?.name}</h2>
          <div>
            <button onClick={skip}>skip</button>
          </div>
        </div>
        :
        <div className='over-report'>
          <h2>{overReport.win ? 'You Won! 🎉' : 'Game Over... 👾'}</h2>
          <br />
          <small>{overReport.optionsUsed} opções gastas</small>
        </div>
      }

      {
        !board ?
          <div>'Board loading...' </div>
          :
          <>
            <h3>
              {points} points
            </h3>
            <div className='board'>
              {board.map((item, index) => (
                <button
                  className={`board-item${item.checked === 'correct' ? ' correct' : ''}`}
                  onClick={() => clickContent(item, index)}
                  disabled={item.checked === 'correct' || !!overReport}
                  key={`${item.value}/${index}`}
                >
                  <h4>{categoryLabels.pt[item.category]}</h4>
                  <p>{item.value}</p>
                </button>
              ))}
            </div>

          </>
      }
    </div >
  )
}

export default App
