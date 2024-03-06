import { ThemeToggler } from "./ThemeToggler";

export function Header() {
  return (
    <header className="w-full py-2 px-4 border-b-2 fixed bg-inherit z-50">
      <div className="w-full max-w-5xl mx-auto px-2 lg:px-0 flex flex-row justify-between items-center">
        <h1>FinTrack</h1>
        <ThemeToggler />
      </div>
    </header>
  );
}
