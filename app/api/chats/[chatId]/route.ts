import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { orgConfig } from '@/configs/nillion';

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

    const updatedData = await collection.updateDataToNodes(
      {
        chat_id: chatId,
        messages: messages,
      },
      filterById,
    );

    return NextResponse.json({ updatedData }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
};
