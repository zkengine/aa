'use client';

import React from 'react';
import { Address, Avatar, EthBalance, Identity, Name } from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  Logo,
} from '@/components/ui';

const NotLoggedInAlert: React.FC = () => {
  const { address, isConnected } = useAccount();
  console.log(address, isConnected);

  return (
    <AlertDialog open={!isConnected && !address}>
      <AlertDialogHeader className="hidden">
        <AlertDialogTitle>You are not logged in</AlertDialogTitle>
        <AlertDialogDescription>Please login to continue</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogContent className="flex flex-col items-center justify-center">
        <Logo className="h-16 w-16" />
        <h1 className="text-2xl font-bold">You are not logged in</h1>
        <p className="text-sm text-gray-500">Please login to continue</p>

        <Wallet>
          <ConnectWallet className="w-full">
            <Avatar className="h-6 w-6" />
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pb-2 pt-3" hasCopyAddressOnClick={true}>
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownBasename />
            <WalletDropdownLink icon="wallet" href="https://wallet.coinbase.com">
              Go to Wallet Dashboard
            </WalletDropdownLink>
            <WalletDropdownFundLink />
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotLoggedInAlert;
