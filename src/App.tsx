import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import AppLayout from './layout/AppLayout';
import TicTok from './projects/TicToc'
import InfinityScroll from './projects/InfinityScroll';
import ChessBoard from './projects/ChessBoard';
import Modal from './projects/Modal';
import StopWatch from './projects/StopWatch';
import Toaster from './projects/Toast';
import TraficLight from './projects/TraficLight';
import PasswordStrenth from './projects/PasswordStrenth';
import GridLights from './projects/GridLights';
import ColumnTable from './projects/ColumnTable';
import QuizApp from './projects/QuizApp';
import TransferList from './projects/TransferList';
import Otp from './projects/Otp';
import NestedCheckBoxList from './projects/NestedCheckBoxList';
import NestedComentsApp from './projects/NestedComents';
import AdvanceCounter from './projects/AdvanceCounter';
import ChipsInput from './projects/ChipsInput';
import TodoList from './projects/TodoList';
import MatchPair from './projects/MatchPair';
import Calculator from './projects/Calculator';

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
          <Route path='stopwatch' element={<StopWatch />} />
          <Route path='toaster' element={<Toaster />} />
          <Route path='traficlight' element={<TraficLight />} />
          <Route path='passwordstrenth' element={<PasswordStrenth />} />
          <Route path='gridlights' element={<GridLights />} />
          <Route path='columntable' element={<ColumnTable />} />
          <Route path='quizapp' element={<QuizApp />} />
          <Route path='transferlist' element={<TransferList />} />
          <Route path='otp' element={<Otp />} />
          <Route path='nestedcheckboxlist' element={<NestedCheckBoxList />} />
          <Route path='nestedcoments' element={<NestedComentsApp />} />
          <Route path='advancecounter' element={<AdvanceCounter />} />
          <Route path='chipsinput' element={<ChipsInput />} />
          <Route path='todolist' element={<TodoList />} />
          <Route path='matchpair' element={<MatchPair />} />
          <Route path='calculator' element={<Calculator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}