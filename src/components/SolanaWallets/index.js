import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    CoinbaseWalletAdapter,
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';


export const SolanaWallets: FC = ({
    children
}) => {
    const solanaNetwork = process.env.REACT_APP_NETWORK
    const env = process.env.NODE_ENV

    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = (
        solanaNetwork === WalletAdapterNetwork.Devnet
        ? WalletAdapterNetwork.Devnet
        : solanaNetwork === WalletAdapterNetwork.Testnet
        ? WalletAdapterNetwork.Testnet
        : solanaNetwork === WalletAdapterNetwork.Mainnet
        ? WalletAdapterNetwork.Mainnet
        : WalletAdapterNetwork.Mainnet
    )

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => ((env === 'test' || env === 'production') ? solanaNetwork : clusterApiUrl(network)), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new SolanaMobileWalletAdapter({
                appIdentity: { name: 'Solana Wallet Adapter App' },
                authorizationResultCache: createDefaultAuthorizationResultCache(),
            }),
            new CoinbaseWalletAdapter(),
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    { 
                        children
                    }
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};