import React, { useState } from 'react';
import { Dialog, Slide } from '@mui/material';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const SearchPanel = ({ onClose }) => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const handleSearch = () => {
        navigate(`/products?query=${searchText}`);
        onClose();
      };
  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        TransitionComponent={Slide}
        PaperProps={{
          sx: {
            width : '100vw',
            position : 'absolute',
            top : 0,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
          },
        }}
      >
        <div className="w-full h-[30vh] p-2 relative text-white">
          <div className="absolute right-2 top-4">
            <IconButton onClick={onClose}>
              <CloseIcon className="text-white" />
            </IconButton>
          </div>

          <div className="w-full flex flex-col items-center justify-center space-y-4">
            <input
              type="text"
              className="p-4 text-xl rounded-md bg-transparent border rounded-lg border-white placeholder-white focus:outline-none text-white w-full"
              placeholder="Search for products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <button
              onClick={handleSearch}
              className="flex items-center justify-center bg-white text-black py-2 px-6 rounded-lg hover:bg-gray-200 transition duration-300"
            >
              <SearchIcon className="mr-2" />
              Search
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SearchPanel;
