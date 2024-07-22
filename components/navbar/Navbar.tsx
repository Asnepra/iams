// Import necessary modules and components
import { useState } from "react";
import Image from "next/image";
import Logo from "@/components/navbar/Logo";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { adminRoutes, normalRoutes, UserData } from "@/schemas";
import { useRouter } from "next/navigation";


// Define the interface for NavbarProps
interface NavbarProps {
    className?: string;
    userData: UserData | null; // Include userData prop of type UserData
}

// Navbar component
const Navbar = ({ className, userData }: NavbarProps) => {
  const router = useRouter();
  // Check if userData is null
  if (!userData) {
    // Handle case where userData is null (e.g., user not logged in)
    return (
        <header className={`fixed top-0 z-30 flex gap-4 border-b bg-background px-4 py-2 w-full h-auto ${className}`}>
            <Logo />
            {/* Other components or placeholders for non-logged in state */}
        </header>
    );
}
    // Example of state usage if needed
    const [searchQuery, setSearchQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    

    // Determine which routes to use based on user role
    const routes = userData.isAdmin ?   normalRoutes: adminRoutes;

    // Toggle menu open/close
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Handle logout action
    const handleLogout = () => {
        // Implement logout logic here
        //get the token
        //set invalidate token and redirect to "/"
        localStorage.removeItem("token");
        //console.log("Logging out...");
        router.push("/");
    };

    return (
        <header className={`fixed top-0 z-30 flex gap-4 border-b bg-background px-4 py-2 w-full h-auto ${className}`}>
            {/* Logo component */}
            <Logo />

            {/* Search input */}
            <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>

            {/* User profile button */}
            <Button variant="outline" size="icon" onClick={toggleMenu} className="overflow-hidden rounded-full relative">
                <Image
                    src={userData.userProfilePic} // Use userProfilePic from props
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                />
                {/* Indicator for notification or online status */}
                {/* Example: <span className="absolute top-0 right-0 bg-green-500 rounded-full h-2 w-2"></span> */}
            </Button>

            {/* Conditional rendering of menu */}
            {menuOpen && (
                <div className="absolute right-0 mt-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-700">{userData.userName}</div>
                        <hr />
                        {routes.map((route, index) => (
                            <a
                                key={index}
                                href={route.href}
                                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                            >
                                <route.icon className="w-5 h-5" />
                                <span>{route.label}</span>
                            </a>
                        ))}
                        <hr />
                        <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
