"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';
import { Button } from "@/components/ui/button";
import logo from '@/public/images/logo.png';
import profile from '@/public/images/profile.png';
import video from '@/public/images/videoUp.png';
import coin from '@/public/images/coin.png';
import { Menu, MenuIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "@/app/globals.css";

declare let window: any;

function Nav() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');

  useEffect(() => {
    checkMetaMask();
  }, []);

  const checkMetaMask = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      try {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccountAddress(accounts[0]);
          setWalletConnected(true);

          // Check and switch network if needed
          const network = await provider.getNetwork();
          if (network.chainId !== BigInt(59141)) {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xe705' }],
            });
          }
        } else {
          setIsConnected(false);
          setWalletConnected(false);
        }
      } catch (error) {
        console.error('Error checking MetaMask connection:', error);
        setIsConnected(false);
        setWalletConnected(false);
      }
    } else {
      console.log("MetaMask is not installed.");
      setIsConnected(false);
      setWalletConnected(false);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to use this feature.");
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await checkMetaMask();
    } catch (error) {
      console.error('Error connecting MetaMask:', error);
    }
  };

  return (
    <div>
      <div className='mx-[2vw] mb-[8vw] md:mb-0 pt-[4vw] flex items-center space-x-[4vw] justify-between'>
        <div className='flex space-x-[1vw] cursor-pointer items-center'>
          <Link href='/VideoPage'>
            <Image src={logo} className='w-[15vw] md:w-[10vw]' alt='logo' />
          </Link>
        </div>

        <div className='w-full hidden xl:block lg:block md:block'>
          <div className='w-full flex h-[2.5vw] items-center bg-transparent justify-between border border-cyan-400 rounded-[0.5vw] relative'>
            <input
              className='w-full text-[1vw] text-white bg-transparent focus:outline-none rounded-[1vw] px-[1vw] py-1'
              type='text'
              placeholder='Search..'
            />
            <button className='px-[1vw]'>
              <svg
                className="w-[1.5vw] h-[1vw] text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className='flex space-x-[3vw]'>
          <div className='flex items-center space-x-2'>
            <Image src={video} className='w-[7vw] sm:w-[4vw] md:hidden' alt='video' />
            <Image src={coin} className='w-[7vw] sm:w-[4vw]' alt='coin' />
            <Link href='/SwappingPage'>
              <p className='text-white press-start-2p-text text-[4vw] md:text-[1.5vw]'>100</p>
            </Link>
          </div>

          <div className='block md:hidden'>
            <Image className='w-[6vw] h-[6vw] rounded-full' src={profile} alt='profile' />
          </div>

          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger className='text-white text-center'>
                <div className='hidden lg:block xl:block md:block p-[0.1vw] rounded-[0.5vw] bg-gradient-to-tl from-cyan-400 to-black m-2'>
                  <div className='flex bg-black rounded-[0.5vw] w-[10vw] h-[2.5vw] space-x-[1vw] items-center'>
                    <Image className='w-[2vw] rounded-full' src={profile} alt='profile' />
                    <p className='text-[0.7vw] text-white'>Sanyam Jain</p>
                    <MenuIcon className='text-white w-[1vw] h-[1vw] cursor-pointer hover:bg-[#33c2ee50] rounded-[0.2vw]' />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-black border border-cyan-400 rounded-[2vw]'>
                <Link href='/ProfilePage'>
                  <DropdownMenuItem className='text-white cursor-pointer'>Profile</DropdownMenuItem>
                </Link>
                <Link href='/StudioPage'>
                  <DropdownMenuItem className='text-white cursor-pointer'>Creator Studio</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className='bg-white rounded-full h-[7vw] sm:h-[5vw] md:h-[3vw] flex justify-center items-center'>
              <Button className='rounded-full px-[1vw] py-0 text-center md:rounded-[2vw] text-[3vw] sm:text-[2vw] md:text-[1vw]' variant="secondary" onClick={connectWallet}>Connect Wallet</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
