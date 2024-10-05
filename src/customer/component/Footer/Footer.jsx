import React from 'react'
import { Facebook, Instagram, Twitter, GitHub, YouTube, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-gray-200">
          <div className="container mx-auto py-8">
            <div className="flex flex-col items-center">
              <div className="flex space-x-6 mb-6">
                <a href="#about" className="text-gray-600 hover:text-white">About</a>
                <a href="#blog" className="text-gray-600 hover:text-white">Blog</a>
                <a href="#jobs" className="text-gray-600 hover:text-white">Jobs</a>
                <a href="#press" className="text-gray-600 hover:text-white">Press</a>
                <a href="#accessibility" className="text-gray-600 hover:text-white">Accessibility</a>
                <a href="#partners" className="text-gray-600 hover:text-white">Partners</a>
              </div>
              <div className="flex space-x-6 mb-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="text-gray-600 hover:text-white" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="text-gray-600 hover:text-white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <LinkedIn className="text-gray-600 hover:text-white" />
                </a>
                <a href="https://github.com/sibu02" target="_blank" rel="noopener noreferrer">
                  <GitHub className="text-gray-600 hover:text-white" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <YouTube className="text-gray-600 hover:text-white" />
                </a>
              </div>
              <p className="text-gray-600 text-sm">
                &copy; 2024 OfferZone, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      );
}

export default Footer