import { NavLink } from "react-router-dom"

export default function NavBar() {
    return (
        <nav >
            <ul>
                <NavLink
                    to="/tictoc"
                    style={({ isActive }) => ({
                        color: isActive ? "white" : "rgb(135, 135, 136)"
                    })}
                >
                    <li>
                        tictoc
                    </li>
                </NavLink>
                <NavLink
                    to="/infinityscroll"
                    style={({ isActive }) => ({
                        color: isActive ? "white" : "rgb(135, 135, 136)"
                    })}
                >
                    <li>
                        infinityscroll
                    </li>
                </NavLink>
                <NavLink
                    to="/chessboard"
                    style={({ isActive }) => ({
                        color: isActive ? "white" : "rgb(135, 135, 136)"
                    })}
                >
                    <li>
                        chessboard
                    </li>
                </NavLink>
                <NavLink
                    to="/modal"
                    style={({ isActive }) => ({
                        color: isActive ? "white" : "rgb(135, 135, 136)"
                    })}
                >
                    <li>
                        modal
                    </li>
                </NavLink>
            </ul>
        </nav>
    )
}