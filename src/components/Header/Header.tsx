import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HeaderProps {
  userName?: string;
  userImage?: string;
}

const Header = ({ userName = "User Name", userImage }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-bBlue-600 hover:text-bBlue-700 transition-colors">
            ThaiVan Blog
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            href="/blogs/create"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Create Blog
          </Link>
        </nav>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium">{userName}</span>
          <Avatar className="h-8 w-8 transition-transform hover:scale-110">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback className="bg-bBlue-100 text-bBlue-700">
              {userName
                .split(" ")
                .map(n => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
