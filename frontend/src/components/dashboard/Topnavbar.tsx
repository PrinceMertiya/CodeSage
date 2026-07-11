import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import UserDropdown from "./UserDropdown";

export default function TopNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-8">
        <SearchBar />

        <div className="flex items-center gap-4">
          <NotificationButton />

          <UserDropdown />
        </div>
      </div>
    </header>
  );
}