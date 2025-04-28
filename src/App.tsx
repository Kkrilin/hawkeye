import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import AppLayout from './layout/AppLayout';
import TicTok from './projects/TicToc'
import InfinityScroll from './projects/InfinityScroll';
import ChessBoard from './projects/ChessBoard';
import Modal from './projects/Modal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<TicTok />} />
          <Route path='tictoc' element={<TicTok />} />
          <Route path='infinityscroll' element={<InfinityScroll />} />
          <Route path='chessboard' element={<ChessBoard />} />
          <Route path='modal' element={<Modal>open model</Modal>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}