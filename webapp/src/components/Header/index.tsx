import NextLink from "next/link";

export const Header = () => {
  return (
    <div className="flex justify-between">
      <NextLink href="/">
        <h1 className="text-3xl font-bold">DAPP</h1>
      </NextLink>
    </div>
  );
};

export default Header;
