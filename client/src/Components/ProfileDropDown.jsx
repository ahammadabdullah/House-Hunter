import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileDropDown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await logout(user?.email);
    if (res.success === true) {
      toast.success("Logout Successful");
      navigate("/");
    } else {
      toast.error(res?.response?.data?.message);
    }
  };
  return (
    <div className="text-right w-56 ">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-primary  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Profile
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-primary hover:text-primary"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <EditActiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    {user?.name}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <DuplicateActiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    {user.role}
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <DeleteActiveIcon
                      className="mr-2 h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileDropDown;

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#fb923c"
        stroke="#ffedd5"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#fb923c"
        stroke="#ffedd5"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#fb923c"
        stroke="#ffedd5"
        strokeWidth="2"
      />
    </svg>
  );
}

function DeleteActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#fb923c"
        stroke="#ffedd5"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#ffedd5" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#ffedd5" strokeWidth="2" />
    </svg>
  );
}
