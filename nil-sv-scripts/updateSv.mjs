import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { orgConfig } from './nillionOrgConfig.js';

// update schema id and record id to update with your own values
const SCHEMA_ID = '8a7f9f12-0f56-432d-93b8-b62d20b1d07e';
const RECORD_ID = '024d879e-0fc1-4168-9823-200d20b80447';

const recordUpdate = {
  years_in_web3: { $allot: 5 },
  responses: [
    { rating: 3, question_number: 1 },
    { rating: 3, question_number: 2 },
    { rating: 3, question_number: 3 },
  ],
};

async function main() {
  try {
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      SCHEMA_ID
    );
    await collection.init();

    const filterById = {
      _id: RECORD_ID,
    };

    const readOriginalRecord = await collection.readFromNodes(filterById);
    console.log('📚 Read original record:', readOriginalRecord);

    const updatedData = await collection.updateDataToNodes(
      recordUpdate,
      filterById
    );

    console.log(
      '📚 Find record(s) with filter and update nodes with recordUpdate:',
      updatedData.map((n) => n.result.data)
    );

    const readUpdatedRecord = await collection.readFromNodes(filterById);
    console.log('📚 Read updated record:', readUpdatedRecord);

    // await collection.flushData();
  } catch (error) {
    console.error('❌ Failed to use SecretVaultWrapper:', error.message);
    process.exit(1);
  }
}

main();
