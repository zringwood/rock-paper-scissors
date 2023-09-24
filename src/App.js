import Victor from 'victor';
import './App.css';
import Display from './components/Display/Display';


const SIZE = 1000
function App() {
  const sprites = []
  for(let i = 0;i<10;i++){
    sprites.push({
      x:Math.random(),
      y:Math.random(),
      dir:new Victor(Math.random(), Math.random()),
      color:`rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`,
      type:Math.trunc(Math.random() * 3)
    })
  }

  return (
    <Display arr={sprites} width={SIZE} height={SIZE}/>
  );
}

export default App;
