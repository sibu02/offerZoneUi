import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import AuthModal from '../../Auth/AuthModal'
import { Button, Avatar, Menu, MenuItem, Typography } from '@mui/material'
import { navigation } from './CategoryData'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../../../State/Auth/Action'
import { getCart } from '../../../State/Cart/Action'
import SearchPanel from './SearchPanel'
export default function Navigation() {
  const [isSearchOpen,setIsSearchOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const authState = useSelector((state) => state.auth)
  const cartState = useSelector((state)=>state.cart.cart)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt))
      dispatch(getCart())
    }
  }, [jwt, authState.jwt])

  useEffect(() => {
    if(authState.user){
      handleProfileClose();
      setOpen(false);
    }
    if (location.pathname === '/signin' || location.pathname === '/signup') {
      navigate(-1);
    }
  }, [authState.user])

  const handleSearchOpen = () =>{
     setIsSearchOpen(true);
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  }
  const handleOpen = () => {
    setOpenAuthModal(true);
  }

  const handleProfileClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    // Implement your logout logic here
    dispatch(logout())
    handleClose();
    setOpen(false);
    navigate('/');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  }

  const handleCategorySelect = (category, section, item, close) => {
    navigate(`/${category}/${section}/${item}`);
    close();
  }

  const handleMobileCategorySelect = (category, section, item) => {
    navigate(`/${category}/${section}/${item}`);
    setOpen(false);
  }
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img alt={item.imageAlt} src={item.imageSrc} className="object-cover object-center" />
                          </div>
                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a onClick={() => handleMobileCategorySelect(category.name, section.name, item.name)} className="-m-2 block cursor-pointer p-2 text-gray-500">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {!authState.user?(
                <div className="flow-root">
                <a onClick={handleOpen} className="-m-2 block p-2 font-medium text-gray-900">
                  Sign in
                </a>
              </div>
              ):(
                <>
                <div className="flow-root">
                <a href={"/account/profile"} className="-m-2 block p-2 font-medium text-gray-900">
                  Account
                </a>
              </div>
              <div className="flow-root">
                <a href='/account/order' className="-m-2 block p-2 font-medium text-gray-900">
                  Orders
                </a>
              </div>
              <div className="flow-root">
                <a onClick={handleLogout} className="-m-2 block p-2 font-medium text-gray-900">
                  Logout
                </a>
              </div>
              </>
              )}
              
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
                <span className="ml-3 block text-base font-medium text-gray-900">-----------Give Me Job-----------</span>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThBM3abb9iOqcGUbJFlzIK7H40Ayye12WIEg&s"
                    className="h-8 w-auto"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch z-30">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <PopoverButton
                              className={`relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 ${open ? 'border-indigo-600 text-indigo-600' : ''
                                }`}
                            // onClick={() => setOpenPopover(open ? null : category.name)}
                            >
                              {category.name}
                            </PopoverButton>
                          </div>
                          <PopoverPanel
                            transition
                            className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                          >
                            <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div key={item.name} className="group relative text-base sm:text-sm">
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                          <img
                                            alt={item.imageAlt}
                                            src={item.imageSrc}
                                            className="object-cover object-center h-[15rem] w-full"
                                          />
                                        </div>
                                        <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                          <span aria-hidden="true" className="absolute inset-0 z-10" />
                                          {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                          Shop now
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                          {section.name}
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {section.items.map((item) => (
                                            <li key={item.name} className="flex">
                                              <a
                                                key={item.name}
                                                onClick={() =>
                                                  handleCategorySelect(category.name, section.name, item.name, close)
                                                }
                                                className="hover:text-gray-800 cursor-pointer"
                                              >
                                                {item.name}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center ">
                {/* if not signed in */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!authState.user ? (
                    <div>
                      <a onClick={handleOpen} className=" cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800">
                        Login
                      </a>
                    </div>
                  ) : (
                    <div className="relative inline-block text-left">
                      {/* Profile Avatar */}
                      <Avatar
                        alt="User"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" // Replace with user's profile image URL
                        onClick={handleClick}
                        sx={{
                          cursor: 'pointer',
                          width: 25,
                          height: 25,
                          transition: 'transform 0.2s ease-in-out',
                          '&:hover': { transform: 'scale(1.1)' }, // Avatar hover effect
                        }}
                      />

                      {/* Dropdown Menu using MUI Menu */}
                      {anchorEl && (
                        <Menu
                          anchorEl={anchorEl}
                          open={openAnchor}
                          onClose={handleProfileClose}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                          PaperProps={{
                            sx: {
                              mt: 1,
                              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for dropdown
                              borderRadius: '10px', // Rounded corners for the menu
                              minWidth: 160, // Adjust width
                            },
                          }}
                        >
                          {/* Menu Item for Profile */}
                          <MenuItem onClick={handleProfileClose} sx={{ py: 1.5 }}>
                            <a href="account/profile" className="w-full">
                              <Typography variant="body1" className="text-gray-800 hover:text-indigo-600">
                                Profile
                              </Typography>
                            </a>
                          </MenuItem>

                          {/* Menu Item for Orders */}
                          <MenuItem onClick={handleProfileClose} sx={{ py: 1.5 }}>
                            <a href="/account/order" className="w-full">
                              <Typography variant="body1" className="text-gray-800 hover:text-indigo-600">
                                Orders
                              </Typography>
                            </a>
                          </MenuItem>

                          {/* Menu Item for Logout */}
                          <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                            <Typography variant="body1" className="text-gray-800 hover:text-red-600">
                              Logout
                            </Typography>
                          </MenuItem>
                        </Menu>
                      )}

                    </div>
                  )}

                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a onClick={handleSearchOpen} className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                  </a>
                  {isSearchOpen && <SearchPanel onClose={handleSearchClose}/>}
                </div>

                {/* Cart */}
                {jwt && (
                  <div className="ml-4 flow-root lg:ml-6">
                  <a href="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartState.totalItems}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
                )}
                
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleClose} open={openAuthModal}/>
    </div>
  )
}
