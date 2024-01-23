import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const FilterDropDown = ({ setFilter }) => {
  return (
    <div className="text-right w-[150px] ">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-primary  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Filter
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
          <Menu.Items className="absolute right-0 mt-2 w-[150px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <button
                  onClick={() => setFilter("city")}
                  className={
                    "text-gray-900  rounded-md px-2 py-2 text-sm hover:bg-fill w-full text-left hover:text-primary"
                  }
                >
                  By City
                </button>
              </Menu.Item>
              <br />
              <Menu.Item>
                <button
                  onClick={() => setFilter("bedrooms")}
                  className={
                    "text-gray-900  rounded-md px-2 py-2 text-sm hover:bg-fill w-full text-left hover:text-primary"
                  }
                >
                  By Bed Rooms
                </button>
              </Menu.Item>
              <br />
              <Menu.Item>
                <button
                  onClick={() => setFilter("bathrooms")}
                  className={
                    "text-gray-900  rounded-md px-2 py-2 text-sm hover:bg-fill w-full text-left hover:text-primary"
                  }
                >
                  By Bath Rooms
                </button>
              </Menu.Item>
              <br />
              <Menu.Item>
                <button
                  onClick={() => setFilter("roomSize")}
                  className={
                    "text-gray-900  rounded-md px-2 py-2 text-sm hover:bg-fill w-full text-left hover:text-primary"
                  }
                >
                  By Room Size
                </button>
              </Menu.Item>
              <br />
              <Menu.Item>
                <button
                  onClick={() => setFilter("availabilityDate")}
                  className={
                    "text-gray-900  rounded-md px-2 py-2 text-sm hover:bg-fill w-full text-left hover:text-primary"
                  }
                >
                  By Availability Date
                </button>
              </Menu.Item>
              <br />
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default FilterDropDown;
