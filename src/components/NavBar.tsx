import { NavLink } from "react-router-dom"

export default function NavBar() {
    return (
        <nav>
            <ul>
                <NavBarLink to="/tictoc" text="tictoc" />
                <NavBarLink to="/infinityscroll" text="infinityscroll" />
                <NavBarLink to="/chessboard" text="chessboard" />
                <NavBarLink to="/modal" text="modal" />
                <NavBarLink to="/stopwatch" text="stopwatch" />
                <NavBarLink to="/toaster" text="toaster" />
                <NavBarLink to="/traficlight" text="traficLight" />
                <NavBarLink to="/passwordstrenth" text="passwordStrenth" />
                <NavBarLink to="/gridlights" text="gridLights" />
                <NavBarLink to="/columntable" text="columnTable" />
                <NavBarLink to="/quizapp" text="quizApp" />
                <NavBarLink to="/transferlist" text="transferList" />
                <NavBarLink to="/otp" text="otp" />
                <NavBarLink to="/nestedcheckboxlist" text="nestedCheckboxList" />
                <NavBarLink to="/nestedcoments" text="nestedComents" />
                <NavBarLink to="/advancecounter" text="advanceCounter" />
                <NavBarLink to="/chipsinput" text="chipsInput" />
                <NavBarLink to="/todolist" text="todoList" />
                <NavBarLink to="/matchpair" text="matchPair" />
                <NavBarLink to="/calculator" text="calculator" />
            </ul>
        </nav>
    )
}

interface NavBarLinkProps {
    to: string,
    text: string
}

function NavBarLink({ to, text }: NavBarLinkProps) {
    return (
        <NavLink
            to={`${to}`}
            style={({ isActive }) => ({
                color: isActive ? "white" : "rgb(135, 135, 136)"
            })}
        >
            <li>
                {text}
            </li>
        </NavLink>
    )
}