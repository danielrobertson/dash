import {
  BrowserIcon,
  CaretUpDownIcon,
  ClockCounterClockwiseIcon,
  CommandIcon,
  GlobeIcon,
  MagnifyingGlassIcon,
  QuestionIcon,
  UserIcon,
  XIcon,
} from "@phosphor-icons/react";
import cloudflareLogo from "./assets/Cloudflare_Logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { accounts, domains } from "./data";
import { Dialog } from "radix-ui";

function App() {
  return (
    <>
      <Header />
      <main className=""></main>
    </>
  );
}

const Header = () => {
  return (
    <header className="@container border-b border-zinc-800 px-4 py-3 relative z-10">
      {/* Top row - Logo, ResourceSwitchers, and Right side */}
      <div className="flex justify-between items-center gap-4 min-w-0">
        <div className="flex items-center gap-1 flex-shrink-0">
          <img
            className="h-8 -mt-1 flex-shrink-0"
            src={cloudflareLogo}
            alt="cloudflare logo"
            width={32}
            height={32}
          />
        </div>

        {/* ResourceSwitchers - inline when space allows */}
        <div className="min-w-0 flex-1 justify-start @[640px]:flex hidden">
          <div className="min-w-0 max-w-full flex items-center gap-1">
            <ForwardSlashIcon />
            <ResourceSwitchers />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <SearchDialog />
          <button className="cursor-pointer hover:bg-zinc-800/50 rounded p-2 transition-colors">
            <QuestionIcon />
          </button>
          <button className="cursor-pointer hover:bg-zinc-800/50 rounded p-2 transition-colors">
            <UserIcon />
          </button>
        </div>
      </div>

      {/* Bottom row - ResourceSwitchers (when container is narrow) */}
      <div className="mt-2 pt-2 border-t border-zinc-800 @[640px]:hidden block">
        <div className="flex justify-start overflow-x-auto scrollbar-hide">
          <ResourceSwitchers />
        </div>
      </div>
    </header>
  );
};

const Switcher = ({ icon, name }: { icon: React.ReactNode; name: string }) => {
  return (
    <div className="text-sm font-medium inline-flex items-center gap-1 min-w-0">
      {icon}
      <div className="flex items-center min-w-0">
        <span className="truncate max-w-[200px]">{name}</span>
        <button className="ml-1 cursor-pointer hover:bg-zinc-800/50 rounded p-1 transition-colors flex-shrink-0">
          <CaretUpDownIcon className="h-4 w-4 fill-zinc-500" />
        </button>
      </div>
    </div>
  );
};

const ResourceSwitchers = () => {
  const [account, setAccount] = useState(accounts[0]);
  const [domain, setDomain] = useState(domains[0]);

  return (
    <div className="text-sm font-medium inline-flex items-center gap-1 min-w-0">
      <Switcher
        icon={<GlobeIcon className="h-4 w-4 fill-blue-400 flex-shrink-0" />}
        name={account.email}
      />
      <ForwardSlashIcon />
      <Switcher
        icon={<BrowserIcon className="h-4 w-4 fill-blue-400 flex-shrink-0" />}
        name={domain.name}
      />
    </div>
  );
};

const ForwardSlashIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="text-zinc-500 shrink-0 -ml-1"
      shape-rendering="geometricPrecision"
    >
      <path d="M16 3.549L7.12 20.600"></path>
    </svg>
  );
};

const SearchDialog = () => {
  const placeholders = [
    "Go to...",
    "Workers",
    "/worker my-worker",
    "Web Application Firewall",
    "/r2 profile-images",
    "/d1 analytics-db",
  ];

  const recentlyVisitedItems = [
    "Workers",
    "danielrobertson.dev",
    "Billing",
    "Log Push",
    "SSL/TLS | danielrobertson.dev",
    "Web Application Firewall",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  console.log("🎨 SearchDialog render:", { currentIndex, isAnimating, isOpen });

  useEffect(() => {
    if (!isOpen || inputValue.trim().length > 0) {
      return;
    }

    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % placeholders.length;
          console.log("🔄 Updating index from", prevIndex, "to", newIndex);
          return newIndex;
        });
        console.log("✅ Animation completed, setting isAnimating to false");
        setIsAnimating(false);
      }, 1000); // Match the animation duration
    }, 3000); // Change every 3 seconds

    return () => {
      console.log("🧹 Clearing interval");
      clearInterval(interval);
    };
  }, [placeholders.length, isOpen, inputValue]);

  // Reset to index 0 when dialog opens
  useEffect(() => {
    if (isOpen) {
      console.log("🔄 Dialog opened, resetting to index 0 and clearing input");
      setCurrentIndex(0);
      setIsAnimating(false);
      setInputValue("");
    }
  }, [isOpen]);

  return (
    <Dialog.Root onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        {/* Inspired by TailwindCSS's header search button */}
        <button className="inline-flex items-center gap-1 rounded-full bg-gray-50/2 px-2 py-1 inset-ring inset-ring-gray-950/8 dark:bg-white/5 dark:inset-ring-white/2 cursor-pointer">
          <MagnifyingGlassIcon className="-ml-0.5 size-4 fill-gray-600 dark:fill-gray-500" />
          <div className="inline-flex items-center text-xs/4 text-gray-500 dark:text-gray-400 [.os-macos_&]:block">
            <CommandIcon className="h-3 w-3 text-gray-400 -mr-0.25" />K
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-xs z-50 data-[state=open]:dialog-overlay-show data-[state=closed]:dialog-overlay-hide" />
        <Dialog.Content className="fixed left-1/2 top-1/3 max-h-[85vh] w-[90vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-zinc-800 p-3 shadow-xl focus:outline-none data-[state=open]:dialog-content-show data-[state=closed]:dialog-content-hide z-50">
          <div className="flex items-center gap-1">
            <MagnifyingGlassIcon className="h-4 w-4 fill-zinc-400" />
            <div className="relative w-full">
              <input
                className="w-full rounded-lg px-2 py-1.5 text-base border focus:outline-none focus:border-transparent transition-all duration-200"
                placeholder=""
                aria-label="Search"
                autoFocus
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                onFocus={() => {
                  setIsFocused(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
                }}
              />

              {/* Custom animated placeholder - only show when input is empty */}
              {inputValue.trim().length === 0 && (
                <div className="absolute left-2.5 top-2 pointer-events-none overflow-hidden w-full h-6">
                  <div className="relative h-full">
                    {/* Current placeholder - slides out to top */}
                    <div
                      className={`absolute top-0 left-0 w-full ${
                        isAnimating
                          ? "transition-transform duration-1000 ease-out -translate-y-full"
                          : "translate-y-0"
                      }`}
                      onTransitionStart={() =>
                        console.log("🎬 Current placeholder transition started")
                      }
                      onTransitionEnd={() =>
                        console.log("🏁 Current placeholder transition ended")
                      }
                    >
                      <span className="text-slate-400 leading-6 block">
                        {placeholders[currentIndex]}
                      </span>
                    </div>

                    {/* Next placeholder - slides up from bottom */}
                    <div
                      key={`next-${currentIndex}`}
                      className={`absolute top-0 left-0 w-full ${
                        isAnimating
                          ? "transition-transform duration-1000 ease-out translate-y-0"
                          : "translate-y-full"
                      }`}
                      onTransitionStart={() =>
                        console.log("🎬 Next placeholder transition started")
                      }
                      onTransitionEnd={() =>
                        console.log("🏁 Next placeholder transition ended")
                      }
                    >
                      <span className="text-slate-400 leading-6 block">
                        {placeholders[(currentIndex + 1) % placeholders.length]}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="">
            <div className="mt-4 text-sm font-medium leading-5 mb-2 px-2">
              Recently viewed
            </div>
            {recentlyVisitedItems.map((item) => (
              <a
                key={item}
                className="text-sm  hover:bg-zinc-600/50 rounded p-1 transition-colors cursor-pointer px-2 flex items-center gap-1"
                href={`#${item}`}
              >
                <ClockCounterClockwiseIcon className="h-4 w-4 fill-zinc-400" />
                {item}
              </a>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default App;
