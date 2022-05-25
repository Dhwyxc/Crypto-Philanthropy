import React from "react";
import { BellIcon, HomeIcon, MusicNoteIcon } from "@heroicons/react/outline";
import useGetProfile from "@modules/auth/hooks/useGetProfile";
import useAccount from "@modules/voting/hooks/useAccount";
import { useAppSelector } from "@hooks/reduxHook";
import IconButton from "@components/IconButton";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
const Header = () => {
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const account = useAppSelector((state) => state.auth?.account);
  const { connectWallet } = useAccount();
  return (
    <div className="flex items-center justify-between w-full px-2 py-1 mx-auto shadow max-w-7xl">
      <div className="flex items-center space-x-6">
        <div className="text-2xl font-bold">VottingBuzz</div>
        <div className="flex">
          <NavLink
            className={({ isActive }) =>
              classNames(isActive && "border-b-2 border-indigo-500")
            }
            to={`/`}
          >
            <IconButton>Create poll</IconButton>
          </NavLink>
          {isAuth && (
            <>
              <NavLink
                className={({ isActive }) =>
                  classNames(isActive && "border-b-2 border-indigo-500")
                }
                to={`/user/poll`}
              >
                <IconButton>Your polls</IconButton>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  classNames(isActive && "border-b-2 border-indigo-500")
                }
                to={`/user/answers`}
              >
                <IconButton>Your answers</IconButton>
              </NavLink>
            </>
          )}
        </div>
      </div>

      <div>
        {isAuth && (
          <div className="flex items-center space-x-4">
            <div className="w-[200px] line-clamp-1 break-all overflow-hidden">
              {account}
            </div>

            <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
          </div>
        )}
        {!isAuth && (
          <IconButton
            className="bg-blue-500 text-gray-50"
            onClick={connectWallet}
          >
            Connect wallet
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Header;
