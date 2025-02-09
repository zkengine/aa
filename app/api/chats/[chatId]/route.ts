import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { orgConfig } from '@/configs/nillion';

interface Message {
  content: string;
  role: string;
  createdAt: string;
  id: string;
  revisionId: string | undefined;
}

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) => {
  const { chatId } = await params;

  const { NEXT_PUBLIC_NIL_SCHEMA_ID } = process.env;
  if (!NEXT_PUBLIC_NIL_SCHEMA_ID) {
    return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
  }

  try {
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      NEXT_PUBLIC_NIL_SCHEMA_ID,
    );
    await collection.init();
    const filterById = {
      _id: chatId,
    };
    const readRecord = await collection.readFromNodes(filterById);

    return NextResponse.json({ data: readRecord?.[0] });
  } catch (error) {
    console.error('Error in /api/chats/[chatId]:', error);
    return NextResponse.json(null, { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) => {
  const { chatId } = await params;
  const { messages } = await req.json();

  const { NEXT_PUBLIC_NIL_SCHEMA_ID } = process.env;
  if (!NEXT_PUBLIC_NIL_SCHEMA_ID) {
    return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
  }

  try {
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      NEXT_PUBLIC_NIL_SCHEMA_ID,
    );
    await collection.init();

    const filterById = {
      _id: chatId,
    };

    let record = {
      chat_id: { $allot: chatId },
      messages: messages.map((msg: Message) => ({
        content: { $allot: msg.content },
        role: { $allot: msg.role },
        createdAt: { $allot: msg.createdAt },
        id: { $allot: msg.id },
        revisionId: { $allot: msg.revisionId },
      })),
    };

    const readRecord = await collection.readFromNodes(filterById);
    // console.log('📚 Read new records:', JSON.stringify(readRecord));
    if (readRecord?.length === 0) {
      await collection.writeToNodes([{ ...record, _id: chatId }]);
    } else {
      record = await collection.updateDataToNodes(record, filterById);
    }

    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
};
