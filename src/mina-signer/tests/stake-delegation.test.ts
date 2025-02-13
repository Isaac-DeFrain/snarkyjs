import Client from '../dist/node/mina-signer/MinaSigner.js';
import type { Keypair } from '../dist/node/mina-signer/src/TSTypes.js';

describe('Stake Delegation', () => {
  describe('Mainnet network', () => {
    let client: Client;
    let keypair: Keypair;

    beforeAll(async () => {
      client = new Client({ network: 'mainnet' });
      keypair = client.genKeys();
    });

    it('generates a signed staked delegation', () => {
      const delegation = client.signStakeDelegation(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      expect(delegation.data).toBeDefined();
      expect(delegation.signature).toBeDefined();
    });

    it('generates a signed staked delegation using signTransaction', () => {
      const delegation = client.signTransaction(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      expect(delegation.data).toBeDefined();
      expect(delegation.signature).toBeDefined();
    });

    it('verifies a signed delegation', () => {
      const delegation = client.signStakeDelegation(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      const verifiedDelegation = client.verifyStakeDelegation(delegation);
      expect(verifiedDelegation).toBeTruthy();
      expect(client.verifyTransaction(delegation)).toEqual(true);
    });

    it('verifies a signed delegation generated by signTransaction', () => {
      const delegation = client.signTransaction(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      const verifiedDelegation = client.verifyStakeDelegation(delegation);
      expect(verifiedDelegation).toBeTruthy();
      expect(client.verifyTransaction(delegation)).toEqual(true);
    });

    it('hashes a signed stake delegation', () => {
      const delegation = client.signStakeDelegation(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      const hashedDelegation = client.hashStakeDelegation(delegation);
      expect(hashedDelegation).toBeDefined();
    });

    it('hashes a signed stake delegation generated by signTransaction', () => {
      const delegation = client.signTransaction(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      const hashedDelegation = client.hashStakeDelegation(delegation);
      expect(hashedDelegation).toBeDefined();
    });

    it('does not verify a signed message from `testnet`', () => {
      const delegation = client.signStakeDelegation(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      const testnetClient = new Client({ network: 'testnet' });
      const invalidMessage = testnetClient.verifyStakeDelegation(delegation);
      expect(invalidMessage).toBeFalsy();
      expect(testnetClient.verifyTransaction(delegation)).toEqual(false);
    });
  });

  describe('Testnet network', () => {
    let client: Client;
    let keypair: Keypair;

    beforeAll(async () => {
      client = new Client({ network: 'testnet' });
      keypair = client.genKeys();
    });

    it('generates a signed staked delegation', () => {
      const delegation = client.signStakeDelegation(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      expect(delegation.data).toBeDefined();
      expect(delegation.signature).toBeDefined();
    });

    it('generates a signed staked delegation using signTransaction', () => {
      const delegation = client.signTransaction(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      expect(delegation.data).toBeDefined();
      expect(delegation.signature).toBeDefined();
    });

    it('verifies a signed delegation', () => {
      const delegation = client.signStakeDelegation(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      const verifiedDelegation = client.verifyStakeDelegation(delegation);
      expect(verifiedDelegation).toBeTruthy();
      expect(client.verifyTransaction(delegation)).toEqual(true);
    });

    it('verifies a signed delegation generated by signTransaction', () => {
      const delegation = client.signTransaction(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      const verifiedDelegation = client.verifyStakeDelegation(delegation);
      expect(verifiedDelegation).toBeTruthy();
      expect(client.verifyTransaction(delegation)).toEqual(true);
    });

    it('hashes a signed stake delegation', () => {
      const delegation = client.signStakeDelegation(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      const hashedDelegation = client.hashStakeDelegation(delegation);
      expect(hashedDelegation).toBeDefined();
    });

    it('does not verify a signed message from `mainnet`', () => {
      const delegation = client.signStakeDelegation(
        {
          to: keypair.publicKey,
          from: keypair.publicKey,
          fee: '1',
          nonce: '0',
        },
        keypair.privateKey
      );
      const mainnetClient = new Client({ network: 'mainnet' });
      const invalidMessage = mainnetClient.verifyStakeDelegation(delegation);
      expect(invalidMessage).toBeFalsy();
      expect(mainnetClient.verifyTransaction(delegation)).toEqual(false);
    });
  });
});
