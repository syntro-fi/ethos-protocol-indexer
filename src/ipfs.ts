import { AdditionalData } from "./types/ipfs";

const pinataGateway = process.env.PINATA_GATEWAY;
if (!pinataGateway) {
    throw new Error('PINATA_GATEWAY environment variable is not set');
}

export async function fetchAdditionalData(cid: string): Promise<AdditionalData> {
    if (!cid) {
      return { title: 'n/a', description: 'n/a' };
    }
  
    try {
      const ipfsData = await fetch(`${pinataGateway}/files/${cid}`);
      const data = await ipfsData.json();
      return data as AdditionalData;
    } catch (error) {
      console.error('Failed to fetch IPFS data:', error);
      return { title: 'n/a', description: 'n/a' };
    }
  }