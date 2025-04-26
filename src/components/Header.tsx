import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="text-center p-4 capitalize bg-gray-900">
            <Link to='/'>
                <h1 className="text-4xl">various small projects</h1> {/* margin, not padding */}
            </Link>
        </header>
    );
}
