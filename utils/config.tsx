import contractABI from '@/public/abi/createNft.json';
import marketContractABI from '@/public/abi/assetMarket.json';
import AssetABI from '@/public/abi/Asset.json'
// import { ethers } from 'ethers';

export const contracts = {
    makeNFT: '0x23Ef0e4f4031c2d0DeeB4C1f7b8fe097a8276342',
    // AssetMarket: '0xd86E615190bE769ee53C7Eca8D4968720DeA69EE'
    // AssetMarket: '0x93Ea4d5B118961f000C20673F4c4ED69700500a7'
    // AssetMarket: '0x2986302AC843926441FAbA8C36f85FC4533F9382'
    // AssetMarket: '0x99D8EbF5500069dc2c194f9005fD7bE320eD8c1e'
    // AssetMarket: '0x0fe5F3f03354d43187B8A4F6f2d5F95b0b76070f'
    AssetMarket: '0x62232EF913d62Ad18107aF9Bcf3C76179EC7Ef64'  //Edu 
}

export const abi = {
    makeNFT: contractABI,
    AssetMarket: marketContractABI,
    Asset: AssetABI
}

export const lighthouseAPI = '9b7a2c41.6bda5c574a8149148a7a184d6a635d7f'