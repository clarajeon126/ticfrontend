import { useEffect, useState } from "react";

const Board = ({prevBoard, boardNum, selectSquare, stringForBoard, myTurn}) => {
  // const [selectedSquare, setSelectedSquare] = useState(-1);
  const [boardAfk, setBoardAfk] = useState(false);

  useEffect(() => {
    if(prevBoard === boardNum){
      console.log("afk board")
      setBoardAfk(true);
    }
    else {
      setBoardAfk(false);
    }
  }, [prevBoard, boardNum]);
  
  
  return (
    <>{
      !boardAfk ?
      <div className='boardContainer'>
      <div className='boardRow'>
        {
          Array.prototype.map.call(stringForBoard.slice(0,3), (square, index) => {
            return (<>
              {myTurn ?
                <>
                  {(square === 'e') ?
                    <div onClick={() => {selectSquare(`${boardNum}1${index + 1}`)}} className={'boardSquare ' + square}></div> :
                    <div className={'boardSquare ' + square}></div>
                  }
                </> 

                :
                <>
                  <div className={'boardSquareNoHover ' + square}></div>
                </>
              }
            </>
          )
          })
        }

      </div>
      <div className='boardRow'>
        {
          Array.prototype.map.call(stringForBoard.slice(3,6), (square, index) => {            
            return (<>
                {myTurn ?
                  <>
                    {(square === 'e') ?
                      <div onClick={() => {selectSquare(`${boardNum}2${index + 1}`)}} className={'boardSquare ' + square}></div> :
                      <div className={'boardSquare ' + square}></div>
                    }
                  </> 

                  :
                  <>
                    <div className={'boardSquareNoHover ' + square}></div>
                  </>
                }
              </>
            )
          })
        }
      </div>
      <div className='boardRow'>
        {
          Array.prototype.map.call(stringForBoard.slice(6,9), (square, index) => {            
            return (<>
                {myTurn ?
                  <>
                    {(square === 'e') ?
                      <div onClick={() => {selectSquare(`${boardNum}3${index + 1}`)}} className={'boardSquare ' + square}></div> :
                      <div className={'boardSquare ' + square}></div>
                    }
                  </> 

                  :
                  <>
                    <div className={'boardSquareNoHover ' + square}></div>
                  </>
                }
              </>
            )
          })
        }
      </div>
    </div>
    :
    <div className='boardContainer'>
      <div className='boardRow'>
        {
          Array.prototype.map.call(stringForBoard.slice(0,3), (square, index) => {
            return (<>
              {myTurn ?
                <>
                  {(square === 'e') ?
                    <div  className={'boardSquareNoHover ' + square} id="nonclickable"></div> :
                    <div className={'boardSquareNoHover ' + square} id="nonclickable"></div>
                  }
                </> 

                :
                <>
                  <div className={'boardSquareNoHover ' + square} id="nonclickable"></div>
                </>
              }
            </>
          )
          })
        }

      </div>
      <div className='boardRow'>
        {
          Array.prototype.map.call(stringForBoard.slice(3,6), (square, index) => {            
            return (<>
                {myTurn ?
                  <>
                    {(square === 'e') ?
                      <div  className={'boardSquareNoHover ' + square} id="nonclickable"></div> :
                      <div className={'boardSquareNoHover ' + square} id="nonclickable"></div>
                    }
                  </> 

                  :
                  <>
                    <div className={'boardSquareNoHover ' + square} id="nonclickable"></div>
                  </>
                }
              </>
            )
          })
        }
      </div>
      <div className='boardRow'>
        {
          Array.prototype.map.call(stringForBoard.slice(6,9), (square, index) => {            
            return (<>
                {myTurn ?
                  <>
                    {(square === 'e') ?
                      <div className={'boardSquareNoHover ' + square} id="nonclickable"></div> :
                      <div className={'boardSquareNoHover ' + square} id="nonclickable"></div>
                    }
                  </> 

                  :
                  <>
                    <div className={'boardSquareNoHover ' + square} id="nonclickable"></div>
                  </>
                }
              </>
            )
          })
        }
      </div>
    </div>
    }
    </>

  )
}

export default Board