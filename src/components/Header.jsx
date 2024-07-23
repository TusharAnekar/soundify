import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Header = () => {
  return (
    <header className="flex max-h-dvh justify-between sm:flex-col">
      <h1 className="text-xl font-bold">Spotify</h1>
      <AccountCircleIcon />
    </header>
  );
};
